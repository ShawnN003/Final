import express from 'express'; 
import mariadb from 'mariadb';

// First: have a sql running on both ends
// Second: Decide on how many tables and how to split them up (Rock paper scissors first)
// Third: Have players be able to insert their data into the sql page (Rock paper scissors first)
//
//


const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '0831',
    database: 'gameapp',
    port: '3306'
})


async function connect() {
    try{
        const conn = await pool.getConnection();
        console.log('Connected to DB');
        return conn;
    } catch(err){
        console.log(`Error connecting to the database ${err}`)
    }
}

//app.get('/admin', async (req, res) => {

    //Connect to the database
    //const conn = await connect();

    //Query the database
    //const scores = await conn.query('SELECT scores FROM dbNameHere')//needs a Data base name

//     console.log(scores);

//     res.render('score-page', { scores }); //need to add a score page.
// });

const app = express();

//for form submissions into a req.body
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

//use public to load static files (css)
app.use (express.static('public'));


const PORT = 3000;

app.get('/', (req, res) =>{
    res.render('home');
});

app.get('/ttt', (req, res) =>{
    res.render('ttt');
})
app.get('/rpsPlayerOne', async(req, res) => {
    const conn = await connect();

    const userData = {
        userid: req.body.userid,
        score: req.body.score
        }

    const database = await conn.query(`CREATE TABLE IF NOT EXISTS scores (
        userid varchar(255) NOT NULL,
        score int
        )`);

     const insertQuery = await conn.query(`insert into scores 
         (userid, score)
         values ("FINALTESTING", 0000)`);
    
    console.log(insertQuery);
    res.render('rpsPlayerOne');
});
app.get('/rpsPlayerTwo', async(req, res) =>{
    res.render('rpsPlayerTwo');
});

app.post('/games', async(req, res) =>{

    const conn = await connect();
    const userData = {
        userOne: req.body.userOne,
        userTwo: req.body.userTwo
        }
    const database = await conn.query(`CREATE TABLE IF NOT EXISTS scores (
        userid varchar(255),
        score int,
        PRIMARY KEY (userid)
        )`);

    try{
       const insertQuery = await conn.query(`insert into scores 
        (userid)
        values (?)`,
    [userData.userOne]);
    const insertQueryTwo = await conn.query(`insert into scores 
        (userid)
        values (?)`,
    [userData.userTwo]); 
    }catch (err){
        console.log(err);
    }
    console.log("sent")
    res.render('games');

});

app.get('/scores', async(req, res) =>{
    //Connect to the database
    const conn = await connect();

    //Query the database
    const scores = await conn.query('SELECT * FROM scores');

    console.log(scores);

    res.render('scores', { scores }); 

} );

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});