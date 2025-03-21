import express from 'express'; 
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();
// First: have a sql running on both ends
// Second: Decide on how many tables and how to split them up (Rock paper scissors first)
// Third: Have players be able to insert their data into the sql page (Rock paper scissors first)
//
//


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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



const app = express();

//for form submissions into a req.body
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

//use public to load static files (css)
app.use (express.static('public'));


const PORT = 3000;

function  getRpsWinner(oneChoice, twoChoice){
    if (oneChoice === twoChoice){
        return "tie";
    } else if(oneChoice === "rock"){
        if(twoChoice === "scissors"){
            return "userOne";
        }else{
            return "userTwo";
        }
    }else if(oneChoice === "paper"){
        if(twoChoice === "rock"){
            return "userOne";
        }else{
            return "userTwo";
        }
    }else{
        if(twoChoice === "paper"){
            return "userOne";
        }else{
            return "userTwo";
        }
    }
}

app.get('/', (req, res) =>{
    res.render('home');
});

app.post('/games', async(req, res) =>{
    const conn = await connect();
    const userData = {
        userOne: req.body.userOne,
        userTwo:  req.body.userTwo
        };
    const database = await conn.query(`CREATE TABLE IF NOT EXISTS scores (
        userid varchar(255),
        score INT,
        PRIMARY KEY (userid)
        )`);
    try{
        const userOneCheck = await conn.query(`select * from scores
            WHERE userid = ?`,
        [userData.userOne]);
        console.log(userOneCheck);
        const userTwoCheck = await conn.query(`select * from scores
            WHERE userid = ?`,
        [userData.userTwo]);
        

        if(userOneCheck.length < 1){
            const insertQuery = await conn.query(`insert into scores 
                (userid, score)
                values (?, ?)`,
                [userData.userOne, 0]);
        }
       
        if(userTwoCheck.length < 1){
            const insertQueryTwo = await conn.query(`insert into scores 
                (userid, score)
                values (?, ?)`,
                [userData.userTwo, 0]);
        }
         
    }catch (err){
        console.log(err);
    }
    conn.release();
    res.render('games', { userData });
});

app.post('/ttt', (req, res) =>{
    const userData = {
        userOne: req.body.userOne,
        userTwo: req.body.userTwo
    }
    res.render('ttt', { userData });
})


app.post('/rpsPlayerOne', async(req, res) => {
    const userData = {
        userOne: req.body.userOne,
        userTwo: req.body.userTwo
    }
    
    res.render('rpsPlayerOne', {userData});
});


app.post('/rpsPlayerTwo', async(req, res) =>{
    const userData ={
        userOne: {
            name: req.body.userOne,
            choice: req.body.choice
        },
        userTwo:{ 
            name: req.body.userTwo,
            choice: ""
        }
    }
    console.log(userData.userOne.name);
    console.log(userData.userOne.choice);
    res.render('rpsPlayerTwo', {userData});
});

app.post('/winner', async(req, res) =>{
    const conn = await connect();

    const userData ={
        userOne: {
            name: req.body.userOne,
            choice: req.body.userOneChoice
        },
        userTwo:{ 
            name: req.body.userTwo,
            choice: req.body.choice
        }
    }
    console.log(userData.userOne.name + " " +userData.userOne.choice);
    console.log(userData.userTwo.name + " " +userData.userTwo.choice);
    let victor = getRpsWinner(userData.userOne.choice, userData.userTwo.choice);
    console.log(victor)
    if(victor === "userOne"){
        victor = userData.userOne.name;
    }else if(victor === "userTwo"){
        victor = userData.userTwo.name;
    }else{
        victor = "No one";
        conn.release();
        res.render('winner', {victor, userData})
    }

    try{
        const currentScore = await conn.query('SELECT score FROM scores WHERE userid = ?', [victor]);
        let newScore = 0;
        
        console.log("+1")
        newScore = currentScore[0].score +1;
        
        console.log("updated score: " + newScore)
        console.log("victor: " + victor);

        const database = await conn.query(`UPDATE scores 
            SET score = ?
            WHERE userid = ?`,
        [newScore, victor]);
        res.render('winner', {victor, userData});
    }catch(err){
        console.log(err);
    }
});

app.post('/tttWinner', async(req, res) =>{
    let result = req.body.winner;
    console.log(req.body.tie);
    const conn = await connect();
    
    const userData = {
        userOne: req.body.winner,
        userTwo: req.body.loser
    }

    if(req.body.tie === 'tie'){
        result = 'tie';
        res.render('tttWinner',{result, userData});
        return;
    }
    try{
        const currentScore = await conn.query('SELECT score FROM scores WHERE userid = ?', [req.body.winner]);
        let newScore = 0;
        
        console.log("+1")
        newScore = currentScore[0].score +1;
        

        const database = await conn.query(`UPDATE scores 
            SET score = ?
            WHERE userid = ?`,
        [newScore, result]);
        
        conn.release();
        res.render('tttWinner', {result, userData})    
    }catch(err){
        console.log(err);
    }

    conn.release();
});

app.get('/scores', async(req, res) =>{
    //Connect to the database
    const conn = await connect();

    //Query the database
    const scores = await conn.query(`SELECT * FROM scores
        ORDER BY score DESC`);

    //send scores to scores page: we should update the sql to order by highest wins
    res.render('scores', { scores }); 
});



app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});