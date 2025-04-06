const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const axios = require('axios');

const userRoutes = require('./routes/users');
const userManagementRoutes = require('./routes/userManagement');
const expenseRoutes = require('./routes/expenses');
const dashboardRoutes = require('./routes/dashboard');
const resourceRoutes = require('./routes/resources');
const budgetRoutes = require('./routes/budgets');
const categoryRoutes = require('./routes/categoryRoutes');
const suggestionRoutes = require('./routes/suggestions');
const notificationRoutes = require('./routes/notifications');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/userManagement', userManagementRoutes);

// Financial News Route (External API - Marketaux)
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get("https://api.marketaux.com/v1/news/all", {
      params: {
        api_token: process.env.MARKETAUX_API_KEY, // .env içinden alıyoruz
        language: "en",
        topic: "finance",
        limit: 10,
      },
    });

    res.json(response.data.data); // sadece haber listesini gönder
  } catch (err) {
    console.error("❌ News API error:", err.message);
    res.status(500).json({ error: "Failed to fetch financial news" });
  }
});


// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB bağlantı hatası:', err.message);
  });