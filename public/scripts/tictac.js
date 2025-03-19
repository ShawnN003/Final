let list = document.querySelectorAll('div');

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
        if(boardStatus[i] == 'empty'){
            if(choice == i){

            }else{
            if(boardStatus[i] == 'x' || boardStatus[i] == 'circle'){
    
            }else{
            list[i].id = player;
            boardStatus[i]= player;
            }
    
            if(choice > -1){
                console.log("second click");
                if(list[i] != player){
    
                }
                list[choice].id = '';
                boardStatus[choice]= 'empty';
                console.log(boardStatus);
                }
                if(list[i].id == player){
                    choice = i;
                }
            
            }
        }
    }
}

document.getElementById('user').onclick = function()
{
    choice = -1;
    
    if(checkWin(player)){
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'tttWinner';

        const winner = document.createElement('input');
        winner.type = 'hidden';
        winner.name = 'winner';
        const loser = document.createElement('input');
        loser.type = 'hidden';
        loser.name = 'loser';

        const userOne = document.getElementById('uOne').innerHTML;
        const userTwo = document.getElementById('uTwo').innerHTML;
        
        if(player == 'x'){
            winner.value = userOne;
         
            loser.value = userTwo;
        }else if(player == 'circle'){
            winner.value = userTwo;
            loser.value = userOne;
        }
        form.appendChild(winner);
        form.appendChild(loser);
        document.body.appendChild(form)
       
        form.submit();
        return;
    }
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
