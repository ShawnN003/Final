import express from 'express'; 
const app = express();

//for form submisions into a req.body
app.use(express.urlencoded({extended:true}));

//use public to load static files (css)
app.use (express.static('public'));

app.set('view engine', 'ejs');
const PORT = 3000;
app.get('/', (req, res) =>{
    res.render('home');
});

app.get('/rpsPlayerOne', (req, res) => {
    res.render('rpsPlayerOne');
});
app.get('/rpsPlayerTwo', (req, res) =>{
    res.render('rpsPlayerTwo')
}) 
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});