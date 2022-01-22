
//mouseover butoons
var buttonColor = document.querySelectorAll("button");
for(var i=0;i<buttonColor.length;i++)
{
    buttonColor[i].addEventListener("mouseover",function(){
        this.classList.add("navColor");
        this.classList.toggle("buttonTextColor");
    });
    buttonColor[i].addEventListener("mouseout",function(){
        this.classList.remove("navColor");
        this.classList.toggle("buttonTextColor");
    });
}


//when clicked the easy button
let easyClicked = document.querySelector("#easy");
easyClicked.addEventListener("click",function(){
    hardClicked.classList.remove("backColor")
    easyClicked.classList.add("backColor")
    //icon display
    for(let i=0;i<lifeIcons.length;i++)
    {
        lifeIcons[i].style.visibility ="visible";
    }
     //hide end game
     gameEnd.style.visibility="hidden";
     //reset player limit
     playerLimit=3;
     //score reset
     score=0;
     playerScore.textContent=score;
     //generate new color
     size =3;
     colors = generateRandomcolors(size);
     //pick color
     pickedColor = pickColor();
     //picke color percentage
     pickedColorPercentages = getColorPercentages(pickedColor);
     //display progress bar
     progressBar();
     //change block color
     for(var i=0;i<squares.length;i++)
     {
         if(colors[i])
         {
            squares[i].style.background=colors[i];
         }
         else
         {
            squares[i].style.display = "none";
         }
     }
});


//when clicked the hard button
let hardClicked = document.querySelector("#hard");
hardClicked.addEventListener("click",function(){
    easyClicked.classList.remove("backColor")
    hardClicked.classList.add("backColor")
    //icon display
    for(let i=0;i<lifeIcons.length;i++)
    {
        lifeIcons[i].style.visibility ="visible";
    }
    //hide end game
    gameEnd.style.visibility="hidden";
    //reset player limit
    playerLimit=3;
    //score reset
    score=0;
    playerScore.textContent=score;
    //generate new color
    size = 6;
    colors = generateRandomcolors(size);
    //pick color
    pickedColor = pickColor();
    //picked progress percentage
    pickedColorPercentages = getColorPercentages(pickedColor);
    //display progress bar
    progressBar();
    //chage block colors
    for(var i=0;i<squares.length;i++)
    {
           squares[i].style.background=colors[i];
           squares[i].style.display = "block";
    }  
});


//when clicked the newGame button
let newGameClicked = document.querySelector("#newGame");
newGameClicked.addEventListener("click",function(){
    //icon display
    for(let i=0;i<lifeIcons.length;i++)
    {
        lifeIcons[i].style.visibility ="visible";
    }
    //hide end game
    gameEnd.style.visibility="hidden";
    //reset player limit
    playerLimit=3;
    //score reset
    score=0;
    playerScore.textContent=score;
    //generate new color
    colors = generateRandomcolors(size);
    //pick color
    pickedColor = pickColor();
    //picked color percentage
    pickedColorPercentages = getColorPercentages(pickedColor);
    //display progress bar
    progressBar();
    //chage block colors
    for(var i=0;i<colors.length;i++)
    {
        squares[i].style.background=colors[i];
    }
});

//when clicked hint button click
let hintButton = document.querySelector("#hint");
hintButton.addEventListener("click",function(){
    document.querySelector(".imageClass").classList.toggle("click")
    hintButton.classList.toggle("backColor")
});
//intl play high score
let playerHighScoreIntl =0;
//intl player life limit
let playerLimit = 3;
//intl score
let score =0;
// staring the generate random colors
let size = 6;
let playerScore = document.querySelector("#score");
let playerHighScore = document.querySelector("#highScore");
let gameEnd = document.querySelector("#gameEnd");
let lifeIcons = document.querySelectorAll(".icon")
let endProgress = document.querySelector(".progress");
var redProgress = document.querySelector("#color1")
var greenProgress = document.querySelector("#color2")
var blueProgress = document.querySelector("#color3")
let colors = generateRandomcolors(size);
var pickedColor = pickColor();
var pickedColorPercentages = getColorPercentages(pickedColor);
var squares = document.querySelectorAll(".square");
for(var i=0;i<colors.length;i++)
{
    squares[i].style.background=colors[i];

    squares[i].addEventListener("click",function(){
        var clickedColor =this.style.background;
        if(pickedColor===clickedColor)
        {
            score+=5;
            playerScore.textContent=score;
            changeColor(clickedColor);
            setTimeout(() => {
                //generate new color
                colors = generateRandomcolors(size);
                //pick color
                pickedColor = pickColor();
                //picked color percentage
                pickedColorPercentages = getColorPercentages(pickedColor);
                //display progress bar
                progressBar();
                //chage block colors
                for(var i=0;i<colors.length;i++)
                  {
                     squares[i].style.background=colors[i];
                  }
                
            }, 750);
        }
        else
        {
            playerLimit--;
            lifeIcons[playerLimit].style.visibility="hidden";
            this.style.background="white";
            if(playerLimit==0)
            {
                if(score>=playerHighScoreIntl)
                {
                    playerHighScoreIntl=score;
                    playerHighScore.textContent=score;
                }
                playerScore.textContent=score;
                //score reset
                score=0;
                // playerScore.textContent=score;
                for(var i=0;i<colors.length;i++)
                {
                   squares[i].style.background="white"
                }
                gameEnd.style.visibility="visible";
                progressBarColor();
            }
        }
    });
}

//chanr color function
function changeColor(color)
{
    for(var i =0;i<colors.length;i++)
    {
        squares[i].style.background=color;
    }
}


//function to pick a random
function pickColor()
{
 var random = Math.floor(Math.random() * colors.length);
 return colors[random];
}


//generate ran colors function
function generateRandomcolors(num)
{
   //make an array
   var arr =[];
   //repeat num times
   for(var i=0;i<num;i++)
    {
   //get random colors push to arr
        arr.push(randomColor());
    }
    //return array
    return arr;
}


//function ranomcolor
function randomColor()
{
    //pick red from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick green from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick ble from 0-255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
}



//to get rgb values
 function getColorPercentages(color)
 {
     let rgbObj = {};
     color = color.replace("rgb(","");
     color = color.replace(")","");
     let rgb = color.split(", ");
     rgbObj.r = getSingleColorPercentage(Number(rgb[0]));
     rgbObj.g = getSingleColorPercentage(Number(rgb[1]));
     rgbObj.b = getSingleColorPercentage(Number(rgb[2]));
     
     return rgbObj;
 }
 //width function
 function getSingleColorPercentage(w)
 {
   return w*100/756;
 }
 


//progress bar colors
progressBar();


//progess bar function
function progressBar()
{
    var pRed = document.querySelector("#color1")
    pRed.style.width = pickedColorPercentages.r + "%";
    pRed.style.background = "red";
    var pGreen = document.querySelector("#color2")
    pGreen.style.width = pickedColorPercentages.g + "%";
    pGreen.style.background = "green"
    var pBlue = document.querySelector("#color3")
    pBlue.style.width = pickedColorPercentages.b + "%";
    pBlue.style.background = "blue"
    endProgress.style.background = "white"
}

//function after game progress bar
function progressBarColor()
{
  endProgress.style.background = pickedColor;
  redProgress.style.background = pickedColor;
  greenProgress.style.background = pickedColor;
  blueProgress.style.background = pickedColor;
}
