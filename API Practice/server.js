require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path');
const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/watches/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.DataBase_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const watchesRouter = require('./routes/watches')
app.use('/watches', watchesRouter)

app.listen(PORT, () => {
    console.log("Server started for API practice")
})