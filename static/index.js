const username = document.querySelector('#username')
const Play = document.querySelector('#SaveBtn')


username.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !username.value
    })
username.addEventListener('keyup', () => {
        Play.disabled = !username.value
    })


saveName = e => {
        Play_name: username.value;
}