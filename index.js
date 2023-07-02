const express = require("express")
const routes = require("./src/routes")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1/rest-api-express', {
    useNewUrlParser: true
})

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/", routes())

app.listen(3000);


