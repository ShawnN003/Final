alert("Connected");
let list = document.querySelectorAll('div');

for(let i = 0; i <list.length; i++)
{
    list[i].onmouseover = function()
    {
        list[i].className = "hover";
    }
    list[i].onmouseout = function()
    {
        list[i].className = " ";
    }
    list[i].onclick = function()
    {
        list[i].className = "x";
    }
}
/**
 * Tic Tac Toe implementation plan:
 * 
 * Bug: onmouseout function is changing the classname to nothing which makes it output nothing while hovering out
 * 
 * 
 * Plans:
 * Have the user have a button at the bottom of the function to submit their option they clicked. 
 * 
 * Have another function to take the value of the input and switch the user. 
 * 
 * Have another function constantly check which value is inserted to see who won. 
 * 
 */
