# API Specification (API 規格說明)

## Base URL
`http://localhost:5000/api`

## Items Resource

### 1. Get All Items (取得所有物品)
- **Endpoint**: `GET /items`
- **Description**: Retrieves a list of all inventory items.
- **Response**: `200 OK`
```json
[
  {
    "_id": "64f3a...",
    "name": "Laptop",
    "quantity": 5,
    "price": 999,
    "category": "Electronics",
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
]
```

### 2. Create Item (新增物品)
- **Endpoint**: `POST /items`
- **Body**:
```json
{
  "name": "Mouse",
  "quantity": 20,
  "price": 25,
  "category": "Electronics",
  "description": "Wireless Mouse"
}
```
- **Response**: `201 Created`

### 3. Update Item (更新物品)
- **Endpoint**: `PUT /items/:id`
- **Body**: (Partial or Full Object)
```json
{
  "price": 30
}
```
- **Response**: `200 OK`

### 4. Delete Item (刪除物品)
- **Endpoint**: `DELETE /items/:id`
- **Response**: `200 OK`
```json
{ "message": "Item deleted" }
```
