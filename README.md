# E-STORE (A MODERN E-COMMERCE WEBSITE)


This is a full-stack e-commerce website built using the MERN stack (MongoDB, Express.js, React, and Node.js) and MUI and many more libraries allowing users to browse, search, add items to a shopping cart, and purchase products online with many more features. 

**Features:**

* **User Authentication:** Secure login and registration system with JWT (JSON Web Token) for user session management. 
* **Product Management:**
    - View product listings with detailed information (name, description, price, images and ratings).
    - Search functionality to filter products by keywords.
    - Filtration using categories , keywords and rating on Home page .
    - Add and removing products to the shopping cart .
    - Update cart quantities.
    - Checkout process with payment gateway integration with Stripe.
* **Order Tracking:**
    * View order history with details of purchased items and delivery status.
    * Take action against each order for checking details of each order .
* **Checkout handling:**
    * Shipping Details for delivery management.
    * Confirm Order Page for reviewing order with total Price
    * Payment Integration for purchasing the product


**Project Structure:**

* **Client (React frontend):**
    * Components for product listings, product details, cart, checkout, user profile.
    * API calls to the backend to fetch and update data. 
* **Server (Node.js backend):**
    * Express.js routes to handle API requests for product data, user authentication, and order management. 
    * MongoDB database interactions using Mongoose. 
* **State management (Redux):**
    *Enabling managing states for organizing in structured way

**Getting Started:**

 ## 1. Clone the Repository:
   ```
   git clone https://github.com/your-username/mern-ecommerce.git
   ```
## 2. Install Dependencies:

```bash
   cd mern-ecommerce
   npm install 
```
## 3. Set up Environment Variables:
 -Create a .env file in the root directory and add:
```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key 
```
## 4. Start Development Servers:
- Backend:
```bash

     cd backend
     npm start
```
- frontend.
```bash

     cd client
     npm start
```

## Key Technologies:

- Frontend: React, Axios , Redux , Material UI
- Backend: Node.js, Express.js

- Database: MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)
- Important Considerations:
- Security: Implement robust security measures like input sanitization, password hashing, and secure data handling.
- Scalability: Consider database optimization and load balancing for high traffic scenarios.
- Payment Gateway Integration: Integrate a third-party payment gateway for secure online transactions.
- Testing: Write unit and integration tests to ensure code quality and stability.
    Contributing:
    
### Feel free to fork the repository and submit pull requests with improvements and new features!

