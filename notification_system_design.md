# Notification System Design

## 🔷 Stage 1: API Design and JSON Schema

Design RESTful APIs for the notification system.

### APIs:
**Create Notification**
`POST /notifications`

**Request Body:**
```json
{
  "userId": "string",
  "message": "string",
  "priority": "low | medium | high"
}
```

**Response:**
```json
{
  "notificationId": "string",
  "status": "created"
}
```

**Get Notifications**
`GET /notifications/:userId`

**Response:**
```json
{
  "notifications": [
    {
      "notificationId": "string",
      "message": "string",
      "priority": "high",
      "timestamp": "ISO string"
    }
  ]
}
```

**Mark Notification as Read**
`PUT /notifications/:notificationId`

**Response:**
```json
{
  "status": "updated"
}
```

## 🔷 Stage 2: Database Design and Scaling
- **Database:** Use PostgreSQL (SQL database) for structured storage.
- **Tables:**
  - `Users`
  - `Notifications` (Each notification linked to a user via `userId`).
- **Scaling Strategy:**
  - Use horizontal scaling (sharding based on `userId`).
  - Use read replicas for handling high read traffic.
  - Use connection pooling for efficient DB access.

## 🔷 Stage 3: Query Optimization
- Add indexing on `userId` to speed up queries.
- Avoid full table scans.
- Use pagination (`LIMIT`, `OFFSET`) for large data.
- Optimize queries using `EXPLAIN ANALYZE`.

## 🔷 Stage 4: Performance Optimization
- Use Redis caching for frequently accessed notifications.
- Implement pagination to limit response size.
- Reduce redundant DB queries.
- Use lazy loading for older notifications.

## 🔷 Stage 5: Reliable Notification System
- **Architecture:** Use a message queue system like **Kafka** or **RabbitMQ**.
- **Flow:**
  1. Notification request enters system
  2. Added to queue
  3. Worker service processes it
  4. Sends notification
- **Benefits:**
  - Decouples services
  - Improves reliability
  - Handles traffic spikes

## 🔷 Stage 6: Priority Handling System
- **Design:** Implement a priority queue (heap).
- **Logic:**
  - High priority → processed first
  - Medium → next
  - Low → last
- **Data Structure:**
  - Use **Max Heap** / **Priority Queue**
- **Benefit:**
  - Ensures important notifications are delivered faster
