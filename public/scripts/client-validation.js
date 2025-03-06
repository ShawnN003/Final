document.getElementById("game-form").onsubmit = validate 

function validate() {
    clearErrors();
    let isValid = true;
    let playerOne = document.getElementById("userOne").value.trim();
    let playerTwo = document.getElementById("userTwo").value.trim();

    

    if(playerOne === "")
    {
        document.getElementById("playerOneName").style.display = "block";
        isValid = false;
    }
    if(playerTwo === "")
    {
        document.getElementById("playerTwoName").style.display = "block";
        isValid = false;
    }
    // let choice = document.getElementById("choice").value;
    // if(choice !=  "rock" || choice !=  "paper" ||choice !=  "scissors")
    // {
    //     alert("Testing!");
    //     document.getElementById("err-playerOne").style.display = "block";
    //     isValid = false;
    // }
    return isValid;
}
function clearErrors() 
    {
        let errors = document.getElementsByClassName("err");
        for (let i=0; i<errors.length; i++) {
            errors[i].style.display = "none";
        }
    }
