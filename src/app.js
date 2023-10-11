const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { default: mongoose} = require("mongoose")
const handlebars = require('express-handlebars');
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path');
const upload = require('./utils'); 


const PORT = 3000;
const bodyParser = require('body-parser');


app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, 'public')));

app.post("/upload", upload.single("archivo"), (req, res) => {
    res.json({message: "ha sido subido exitosamente"})
})

app.get('/', (req, res) => {
 
    res.render('chatAndUpload', { title: 'el chat y el upload'});
});


app.use("/api/cart", cartRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/product", productRoutes)

app.use(express.json())
mongoose.connect("mongodb+srv://davisanta4040:TeTwEiTApsENE2nM@cluster0.wsqlgqw.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("conectado a la base de datos")
})
.catch(error=>{
    console.log("error al tratar de conectarse a la DB", error)
})



http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


