const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:N2QN7rDMau8gLJNL@cluster0.zyb5e6h.mongodb.net/hackathon'
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));