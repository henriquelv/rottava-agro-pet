# API Documentation

## Authentication

### Login

```http
POST /api/auth/login
```

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

### Register

```http
POST /api/auth/register
```

#### Request Body

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

## Products

### List Products

```http
GET /api/products
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| search | string | Search term |
| category | string | Category filter |
| sort | string | Sort field |
| order | string | Sort order (asc/desc) |

#### Response

```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "promotionalPrice": "number",
      "stock": "number",
      "category": "string",
      "images": ["string"],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

### Get Product

```http
GET /api/products/:id
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "promotionalPrice": "number",
  "stock": "number",
  "category": "string",
  "images": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Create Product

```http
POST /api/products
```

#### Request Body

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "promotionalPrice": "number",
  "stock": "number",
  "category": "string",
  "images": ["string"]
}
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "promotionalPrice": "number",
  "stock": "number",
  "category": "string",
  "images": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Update Product

```http
PUT /api/products/:id
```

#### Request Body

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "promotionalPrice": "number",
  "stock": "number",
  "category": "string",
  "images": ["string"]
}
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "promotionalPrice": "number",
  "stock": "number",
  "category": "string",
  "images": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Delete Product

```http
DELETE /api/products/:id
```

#### Response

```json
{
  "success": "boolean"
}
```

## Orders

### Create Order

```http
POST /api/orders
```

#### Request Body

```json
{
  "items": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ],
  "shippingAddress": {
    "street": "string",
    "number": "string",
    "complement": "string",
    "neighborhood": "string",
    "city": "string",
    "state": "string",
    "cep": "string"
  },
  "paymentMethod": "string",
  "cardInfo": {
    "number": "string",
    "name": "string",
    "expiry": "string",
    "cvv": "string"
  }
}
```

#### Response

```json
{
  "id": "string",
  "status": "string",
  "items": [
    {
      "product": {
        "id": "string",
        "name": "string",
        "price": "number",
        "promotionalPrice": "number",
        "image": "string"
      },
      "quantity": "number",
      "price": "number"
    }
  ],
  "total": "number",
  "shippingAddress": {
    "street": "string",
    "number": "string",
    "complement": "string",
    "neighborhood": "string",
    "city": "string",
    "state": "string",
    "cep": "string"
  },
  "paymentMethod": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### List Orders

```http
GET /api/orders
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| status | string | Order status filter |
| sort | string | Sort field |
| order | string | Sort order (asc/desc) |

#### Response

```json
{
  "orders": [
    {
      "id": "string",
      "status": "string",
      "items": [
        {
          "product": {
            "id": "string",
            "name": "string",
            "price": "number",
            "promotionalPrice": "number",
            "image": "string"
          },
          "quantity": "number",
          "price": "number"
        }
      ],
      "total": "number",
      "shippingAddress": {
        "street": "string",
        "number": "string",
        "complement": "string",
        "neighborhood": "string",
        "city": "string",
        "state": "string",
        "cep": "string"
      },
      "paymentMethod": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

### Get Order

```http
GET /api/orders/:id
```

#### Response

```json
{
  "id": "string",
  "status": "string",
  "items": [
    {
      "product": {
        "id": "string",
        "name": "string",
        "price": "number",
        "promotionalPrice": "number",
        "image": "string"
      },
      "quantity": "number",
      "price": "number"
    }
  ],
  "total": "number",
  "shippingAddress": {
    "street": "string",
    "number": "string",
    "complement": "string",
    "neighborhood": "string",
    "city": "string",
    "state": "string",
    "cep": "string"
  },
  "paymentMethod": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Update Order Status

```http
PUT /api/orders/:id/status
```

#### Request Body

```json
{
  "status": "string"
}
```

#### Response

```json
{
  "id": "string",
  "status": "string",
  "updatedAt": "string"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "string",
  "message": "string"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Access denied"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 429 Too Many Requests

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
``` 