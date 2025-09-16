const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const GroqRouter = require("./Routes/GroqRouter"); // renamed to Groq

require("dotenv").config();
console.log("Groq API Key Loaded:", process.env.GROQ_API_KEY ? "✅ Yes" : "❌ No");
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api', GroqRouter); // now points to Groq

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
