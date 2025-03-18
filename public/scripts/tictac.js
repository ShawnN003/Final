const { stat } = require("fs");

alert("Connected");
let list = document.querySelectorAll('div');
let output = document.getElementById("output");
//I don't see an output id in ttt.ejs

let boardStatus = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3']
];

function checkWin(player){
    let status = 0;
    //check rows
    for(let row in boardStatus){
        for(let box in row){
            if(box === player){
                status++;
                if(status >= boardStatus.length){
                    status = 0;
                    return true;
                }
            }
        }
        status = 0;
    }

    //check cols
    for(let i=0; i < boardStatus.length; i++){
        for(let j=0; j < boardStatus[i].length; j++){
            if(boardStatus[j][i] === player){
                status++;
                if(status >= boardStatus.length){
                    status = 0;
                    return true;
                }
            }
        }
        status = 0;
    }

    //check diagonals
    for(let i=0; i<3; i++){
        if
    }
}


for(let i = 0; i <list.length; i++)
{
    list[i].onmouseover = function()
    {
        if(list[i].className == "x")
        {

        }
        else 
        {
            list[i].className = "hover";

        }
    }
    list[i].onmouseout = function()
    {
        if(list[i].className == "x")
        {

        }
        else 
        {
            list[i].className = " ";

        }
    }
    list[i].onclick = function()
    {
        list[i].className = "x";
    }

    list[i].ondblclick = function()
    {
        list[i].className = "";
    }
}

document.getElementById('user').click = function()
{
    output.innerHTML = "Player 2";

    for(let i = 0; i <list.length; i++)
        {
            list[i].onmouseover = function()
            {
                if(list[i].className == "circle")
                {
        
                }
                else 
                {
                    list[i].className = "hover";
        
                }
            }
            list[i].onmouseout = function()
            {
                if(list[i].className == "circle")
                {
        
                }
                else 
                {
                    list[i].className = " ";
        
                }
            }
            list[i].onclick = function()
            {
                list[i].className = "circle";
            }
        
            list[i].ondblclick = function()
            {
                list[i].className = "";
            }
        }
        
}
/**
 * Tic Tac Toe implementation plan:
 *  * 
 * Problems:
 * How would we switch users from player one and two? and save those values in the scoreboard? 
 * --the way I have been doing is just passing both usernames to the pages in hidden inputs. since ttt is going back and forth, we should probably make a boolean variable and just swap it when the player ends their turn.
 * --to save values, I think we should do a 2d array. This will make our winCheck a little easier. we can loop through a row or column pretty easily. just need to explicitly include diagonal wins
 * 
 * 
 * 
 * --multiple boxes can be selected
 * 
 * 
 * 
 * Plans:
 * Have each div equal a value between 0 and 8 
 * 
 * 
 * 
 * Have the user have a button at the bottom of the function to submit their option they clicked. 
 * 
 * --there is no way to unselect a choice
 * 
 * Have another function to take the value of the input and switch the user. 
 * 
 * Have another function constantly check which value is inserted to see who won. 
 * 
 */
