API Endpoints POST /menu - Add or Update Menu Item URL: 
http://localhost:9876/add-menu

Request Body (Raw JSON):

{
   "name":"Idli",
   "price":30,
   "category":"breakfast"
}

Response :

{
    "message": "Menu item added",
    "menu": [
        {
            "id": 1,
            "name": "Idli",
            "price": 30,
            "category": "breakfast"
        }
    ]
}

GET /menu - Retrieve All Menu Items- http://localhost:9876/menu

Expected Response:

   "menu": [
        {
            "id": 1,
            "name": "Idli",
            "price": 30,
            "category": "breakfast"
        }]

POST /orders - Place an Order URL:http://localhost:9876/order

Request Body (Raw JSON):

{
   "items":["Idli"]
}

 Expected Response:

{
    "orderId": 1,
    "items": [
        {
            "id": 1,
            "name": "Idli",
            "price": 30,
            "category": "breakfast"
        }
    ],
    "status": "Preparing",
    "timestamp": "2024-12-04T10:28:46.024Z"
}

GET - Fetch Order Details URL:http://localhost:9876/orders/1

{
    "orderId": 1,
    "items": [
        {
            "id": 1,
            "name": "Idli",
            "price": 30,
            "category": "breakfast"
        }
    ],
    "status": "Delivered",
    "timestamp": "2024-12-04T10:28:46.024Z"
}