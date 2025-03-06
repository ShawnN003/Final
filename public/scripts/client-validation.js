document.getElementById("playerOne-val").onsubmit = validate 
alert("Something is happening");
//Not running through the if statement
function validate() {
    let choice = document.getElementById("choice").value;
alert("Something NEW is happening")
    if(choice !=  "rock" || choice !=  "paper" ||choice !=  "scissors")
    {
        alert("Testing!");
        document.getElementById("err-playerOne").style.display = "block";
    }
    console.log("This is the first user choice"+choice);
}

validate();
