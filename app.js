const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reportRoutes = require('./routers/report.router'); 
const loginRoutes = require('./routers/login.router'); 
const EmployeeRouter = require('./routers/employee.router'); 
const settingRoutes = require('./routers/setting.router'); 

const db = require('./DBconnect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.use('/api', reportRoutes);
app.use('/api', loginRoutes);
app.use('/api', EmployeeRouter);
app.use('/api', settingRoutes);




app.get('/', (req, res) => {
  res.send('Welcome to Employee Reports System!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
