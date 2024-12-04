const express = require("express");
const cron = require('node-cron')

const app = express();
app.use(express.json());

let menu = []
let order = []
let orderCount = 1

app.post('/add-menu',(req,res)=>{
    const {name,price,category} = req.body;

    if(!name || typeof price !== 'number' || !category){
        return res.status(400).send('Missing value');
    }
    const existingItem = menu.find(item => item.name === name)
    if(existingItem){
        existingItem.price = price;
        existingItem.category = category;
    }else{
        menu.push({id:menu.length+1,name,price,category})
    }
    res.status(201).json({ message: 'Menu item added', menu });
});

app.get('/menu',(req,res)=>{
    if(menu.lenght == 0){
        res.status(200).json({message:'No menu items'})
    }else{
        res.status(200).json({menu})
    }
});

app.post('/order',(req,res)=>{
    const {items} = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid order: items must be a non-empty array' });
    }

    const orderedItems = [];
    for (let name of items) {
        const menuItem = menu.find((item) => item.name.toLowerCase() === name.toLowerCase());
        if (!menuItem) {
            return res.status(400).json({ message: `Invalid order: item with name "${name}" does not exist` });
        }
        orderedItems.push(menuItem);
    }

    const neworder = {
        orderId: orderCount++,
        items: orderedItems,
        status: 'Preparing',
        timestamp: new Date(),
      };

      order.push(neworder);
      res.status(201).json(neworder);
});

app.get('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const forder = order.find((o) => o.orderId === orderId);
  
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
  
    res.json(forder);
  });

  cron.schedule('*/1 * * * *', () => {
    order.forEach((order) => {
      if (order.status === 'Preparing') {
        order.status = 'Out for Delivery';
        console.log("Out for delivery");
      } else if (order.status === 'Out for Delivery') {
        order.status = 'Delivered';
        console.log("Delivered");
        
      }
    });
  
    console.log('Order statuses updated');
  });


const PORT = 9876;
app.listen(PORT, () => {
    console.log(`server started`);
});

