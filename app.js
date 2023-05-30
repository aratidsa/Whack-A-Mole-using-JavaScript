/* ---------------------- pick id and class from html ------------------- */

const scoreDisplay = document.getElementById('score')
const levelDisplay = document.getElementById('level')
const timeDisplay = document.getElementById('time')
const whackedAMole = document.getElementById('whackMole')
const whackedAPlant = document.getElementById('whackPlant')
const modalScore = document.getElementById('modal-score')

const board = document.querySelector('.game')

const walls = document.querySelectorAll('.wall')
const moles = document.querySelectorAll('.mole')
const plant = document.querySelectorAll('.plant')
const rule = document.querySelector('.rule')

const modal = document.querySelector('.modal-container')

/* ---------------------- declaration ------------------- */

let score = 0
let plantScore = 0
let whackScore = 0
let lastwall
let countdownTimerId
let timeUp = false
let currentTime = 20

/* ---------------------- function to make a random time for the mole and plant to pop from the wall ------------------- */
function getRandomTime(min,max)
{
    return Math.round(Math.random() * (max - min) + min)    
}

/* ----------------------function to get random number for the walls ------------------- */
function getRandomwalls(walls)
{
    let index = Math.floor(Math.random() * walls.length)
    let wall = walls[index]
    
    /* ------if current number of the wall is equal to last wall number then return to prevent same wall from getting same number --- */
    if(wall === lastwall)
    {
        return getRandomwalls(walls)
    }
    
    lastwall = wall
    return wall    
}

function peep()
{    /* ---- Get a random time to determine how long the mole or plant should peep ----*/
    const time = getRandomTime(500,1000)
    
    /* ----- Get random number for the walls ---- */
    const wall = getRandomwalls(walls)
    
   /* ----- add the CSS class so selected mole or plant can "pop up" */
    wall.classList.add('up') 

    /* ----make the selected mole or plant "pop down" after a random time ----- */
    setTimeout(() =>
        {
            wall.classList.remove('up')
            if(!timeUp)
            {
                peep()
            }
        },time)        
}


/* --- function to store number of times the mole is whacked ---- */
function whack(e)
{   /* ---- check for valid clicks ------ */
    if(!e.isTrusted)
    {
        return
    }
    score++
    whackScore++      
    /* ---- this refers to mole clicked ------- */
    this.parentNode.classList.remove('up') 
     /* ------ Display score on modal and score board ------ */
    scoreDisplay.innerHTML = score
    whackedAMole.innerHTML = whackScore
    modalScore.innerHTML = score   
}

/* --- function to store number of times the plant is whacked ---- */
function whack1(e)
{    /* ---- check for valid clicks ------ */
    if(!e.isTrusted)
    {
        return
    }
    score--
    plantScore++
    /* ---- this refers to plant clicked ------- */
    this.parentNode.classList.remove('up')
     /* ------ Display score on modal and score board ------ */
    scoreDisplay.innerHTML = score
    whackedAPlant.innerHTML = plantScore
    modalScore.innerHTML = score    
}

  /* ---------------------- to start a game  ------------------- */
function startGame()
{   modal.style.display = "none"
    board.style.display="flex"
    scoreDisplay.innerHTML = 0
    score = 0
    currentTime = 20
    plantScore = 0
    whackScore = 0
    timeDisplay.textContent = currentTime
    timeUp = false
    peep()
    /* ----- timer will be invoked every 1000 miliseconds */
    countdownTimerId = setInterval(countDown,1000)
    /* ---- show random mole and plant for 20 seconds */
    setTimeout(() => timeUp = true, 20000)  
    rule.style.display="block"
    whackedAPlant.innerHTML = 0
    modalScore.innerHTML = 0
    whackedAMole.innerHTML = 0
}

     /* ---------------------- to exit a game  ------------------- */

function exitGame()
{
    modal.style.display = "none"
    scoreDisplay.innerHTML = 0
    score = 0
    currentTime = 20
    plantScore = 0
    whackScore = 0
    timeDisplay.textContent = currentTime
    whackedAPlant.innerHTML = 0
    modalScore.innerHTML = 0
    whackedAMole.innerHTML = 0
}

      /* ---------------------- countdown timer   ------------------- */

function countDown()
{
    currentTime--
    timeDisplay.textContent = currentTime
    if (currentTime == 0)
   {
    clearInterval(countdownTimerId)

    /* ---------------------- as soon as time is up display modal  ------------------- */
    modal.style.display = "block"
    board.style.display="none"
    rule.style.display="none"
   }
}

  /* ---------------------- add event listeners to mole and plant ------------------- */
moles.forEach(mole => mole.addEventListener('click', whack))
plant.forEach(plant => plant.addEventListener('click', whack1))



