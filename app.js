const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routers/report.router'); // ייבוא הראוטר

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const db = require('./DBconnect');


// Middleware
app.use(express.json()); // תומך ב-JSON כפורמט נתונים
app.use(cors()); // אם יש צורך לאפשר גישה ממקורות אחרים
app.use('/api', reportRoutes);

// מסלול בסיסי לבדיקה
app.get('/', (req, res) => {
  res.send('Welcome to Employee Reports System!');
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
