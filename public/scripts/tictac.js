alert("Connected");
let list = document.querySelectorAll('div');
let output = document.getElementById("output");

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
 * 
 * Plans:
 * Have each div equal a value between 0 and 8 
 * 
 * 
 * 
 * Have the user have a button at the bottom of the function to submit their option they clicked. 
 * 
 * Have another function to take the value of the input and switch the user. 
 * 
 * Have another function constantly check which value is inserted to see who won. 
 * 
 */
