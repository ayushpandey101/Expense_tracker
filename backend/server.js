require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require('./routes/authRoutes');


const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'https://expense-tracker-gilt-six-89.vercel.app',
  credentials: true
}));
app.options('*', cors());

app.use(express.json());

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
