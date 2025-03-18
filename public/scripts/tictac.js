
let list = document.querySelectorAll('div');

//I don't see an output id in ttt.ejs

let boardStatus =['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
let player = "x";
let count = '0';
let choice = -1;


for(let i = 0; i <list.length; i++)
{
    list[i].onmouseover = function()
    {
        if(list[i].className == player)
        {

        }
        else 
        {
            list[i].className = "hover";

        }
    }
    list[i].onmouseout = function()
    {
        if(list[i].className == player)
        {

        }
        else 
        {
            list[i].className = " ";

        }
    }
    list[i].onclick = function()
    {
        

        
        count++
        
        if(boardStatus[i] == 'x' || boardStatus[i] == 'circle'){

        }else{
        list[i].id = player;
        boardStatus[i]= player;
        }

        if(choice > -1){
            console.log("second click");
            list[choice].id = '';
            boardStatus[choice]= 'empty';
            console.log(boardStatus);
            }
        choice = i;
    }

    list[i].ondblclick = function()
    {
        count--;
        list[i].className = "";
        boardStatus[i] = "";
    }
}

document.getElementById('user').onclick = function()
{
    count=0;
    console.log(checkWin(player));
    if(player === 'x'){
        document.getElementById('uOne').style.display = 'none';
        document.getElementById('uTwo').style.display =  'block';
        player = 'circle';
    }else if(player === 'circle'){
        document.getElementById('uOne').style.display = 'block';
        document.getElementById('uTwo').style.display =  'none';
        player = 'x';
    }
    
    
}

function checkWin(player){
    console.log("checking");
    let status = 0;
    console.log(boardStatus);
    let newArr = [
        [boardStatus[0],boardStatus[1],boardStatus[2],],
        [boardStatus[3],boardStatus[4],boardStatus[5],],
        [boardStatus[6],boardStatus[7],boardStatus[8],]
    ];
    console.log(newArr);
    //check rows
    for(let i=0; i < 3; i++){
        for(let j=0; j < 3; j++){
            
            if(newArr[i][j] == player){
                status++;
                if(status >= 3){
                    status = 0;
                    return true;
                }
            }
        }
        status = 0;
    }

    //check cols
    for(let i=0; i < 3; i++){
        for(let j=0; j < 3; j++){
            if(newArr[j][i] == player){
                status++;
                if(status >= 3){
                    status = 0;
                    return true;
                }
            }
        }
        status = 0;
    }

    //check diagonals
    if(player == newArr[0][0] && player == newArr[1][1] && player == newArr[2][2]){
        return true;
    }
    if(player == newArr[0][2] && player == newArr[1][1] && player == newArr[2][0]){
        return true;
    }
    return false;
}
/**
 * Tic Tac Toe implementation plan:
 *  * 
 * Problems:
 * How would we switch users from player one and two? and save those values in the scoreboard? 
 * 
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
