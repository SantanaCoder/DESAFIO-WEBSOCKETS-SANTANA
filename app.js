const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const path = require('path');
const PORT = 3000;



app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


const products = [
    {title:"guitarraas",description:"loren ipsum", price:150},
    {title:"bajos ",description:"loren ipsum", price:230},
    {title:"flautas",description:"loren ipsum", price:1660},
    {title:"baterias",description:"loren ipsum", price:6220}
];

app.get('/', (req, res) => {
  
    res.render('home', { title: 'Lista de Productos', products });
});


app.get('/realtimeproducts', (req, res) => {
 
    res.render('realTimeProducts', { title: 'Lista de Productos en Tiempo Real', products });
});





io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('addProduct', (productName) => {
        products.push(productName);
        io.emit('updateProducts', products);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');

});
