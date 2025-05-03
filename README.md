# 💸 FinancialManagementSystem (SmartSpend)

SmartSpend is a full-stack personal finance management platform designed for individuals who want to take control of their spending, set monthly budgets, and receive financial insights and tips. Developed as part of the CPS7005 – Web Application Development module, the project combines a modern React frontend with a secure Express and MongoDB backend.

---

## 📌 Features

### ✅ Basic Features
- **User Authentication**: Register/Login with secure JWT authentication.
- **Expense Tracking**: Add, edit, delete and view expenses categorized by type and date.
- **Static Financial Dashboard**: Visualize static spending trends and category breakdowns.
- **Financial Resources**: Access curated static finance articles and saving tips.

### ✅ Intermediate Features
- **Budget Management**: Create and manage monthly budgets per category.
- **Financial Insights**: Receive personalized suggestions based on spending patterns.
- **External API Integration**: Get up-to-date financial news via the Marketaux API.

### ✅ Advanced Features
- **PDF & Excel Export**: Export expense reports in PDF or Excel format.
- **Reminder System**: Send email reminders for payments or savings goals using Nodemailer.
- **User Profile Management**: Update or delete user account with all associated data.
- **Secure Data Handling**: Passwords are hashed with bcrypt; routes are protected with JWT.

---

## 🛠 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Recharts](https://recharts.org/) (for data visualisation)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/) (Email reminders)
- [JWT](https://jwt.io/) (Authentication)
- [Helmet](https://helmetjs.github.io/) (Security)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) (Password hashing)

---

## 📂 Project Structure

client/
└── src/ 
    ├── pages/ 
    ├── components/ 
    ├── layouts/ 
    ├── context/ 
    └── App.jsx, main.jsx, index.css, 
server/ 
    ├── controllers/ 
    ├── routes/ 
    ├── middleware/ 
    ├── models/ 
    └── server.js

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/birsennaydin/FinancialManagementSystem.git
cd FinancialManagementSystem

2.)Install server dependencies
cd server
npm install

3.)Create .env file
PORT=5050
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
MARKETAUX_API_KEY=your_marketaux_key

4.) Run the backend

npm start

5.) Install client dependencies

cd ../client
npm install

6.) Run the frontend

npm run dev

🧪 Testing
Manual testing was performed across all main features (expense CRUD, budget validation, reminders).

Proper route protection and error handling was validated via Postman and UI.

Password validation and email uniqueness are enforced on backend.

🔐 Security & Privacy

All sensitive routes are protected using JWT tokens.
Passwords are stored using bcrypt hashing.
Helmet is used to secure HTTP headers.
CORS enabled for development.
User can fully delete account and all related data.

📈 Future Improvements
Add two-factor authentication (2FA).
Add SMS notifications via Twilio.
Introduce real-time updates using Socket.IO.

📚 Acknowledgements
External API: Marketaux
Inspiration: Budgeting tools like YNAB and Mint.

👨‍💻 Author
Birsen Aydın
GitHub Profile
Email: bsnaydin@gmail.com

