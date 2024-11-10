// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const reportRoutes = require('./routers/report.router'); 
// const loginRoutes = require('./routers/login.router'); 
// const EmployeeRouter = require('./routers/employee.router'); 
// const settingRoutes = require('./routers/setting.router'); 
// const fileRoutes = require('./routers/file.router'); 

// const db = require('./DBconnect');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors()); 

// app.use('/api', reportRoutes);
// app.use('/api', loginRoutes);
// app.use('/api', EmployeeRouter);
// app.use('/api', settingRoutes);
// app.use('/api/files', fileRoutes);

// app.get('/', (req, res) => {
//   res.send('Welcome to Employee Reports System!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const cors = require('cors');
const path = require('path'); // ייבוא path כדי לעבוד עם נתיב הקבצים
require('dotenv').config();

const reportRoutes = require('./routers/report.router'); 
const loginRoutes = require('./routers/login.router'); 
const EmployeeRouter = require('./routers/employee.router'); 
const settingRoutes = require('./routers/setting.router'); 
const fileRoutes = require('./routers/file.router'); 

const db = require('./DBconnect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

// מגדיר את התיקייה שבה הקבצים הסטטיים של React מאוחסנים לאחר build
app.use(express.static(path.join(__dirname, 'client/build')));

// ראוטים של API
app.use('/api', reportRoutes);
app.use('/api', loginRoutes);
app.use('/api', EmployeeRouter);
app.use('/api', settingRoutes);
app.use('/api/files', fileRoutes);

// ראוט שמחזיר את הקובץ index.html עבור כל בקשה שאינה ל-API
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
