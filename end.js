const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const finaltime = document.querySelector('#timeelapsed')
const timeelapsed = localStorage.getItem('timeelapsed')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5



function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    
  
    return `${formattedMM}:${formattedSS}`;
  }
finalScore.innerText = mostRecentScore
finaltime.innerText = timeToString(timeelapsed)
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})


saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    const time_elapsed = {
        time : elapsedTime,
        name: username.value
    }
    highScores.push(score)
    
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

    
}
