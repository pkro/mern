const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/api/auth');

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('server running');
});

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
