import express from 'express'; 
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '0831', //I think this will be unique for each of us...
    database: '',//We need to decide on a name
})

const app = express();

//for form submissions into a req.body
app.use(express.urlencoded({extended:true}));

//use public to load static files (css)
app.use (express.static('public'));

app.set('view engine', 'ejs');
const PORT = 3000;
app.get('/', (req, res) =>{
    res.render('home');
});

app.get('/ttt', (req, res) =>{
    res.render('ttt');
})
app.get('/rpsPlayerOne', (req, res) => {
    res.render('rpsPlayerOne');
});
app.get('/rpsPlayerTwo', (req, res) =>{
    res.render('rpsPlayerTwo')
}) 
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});