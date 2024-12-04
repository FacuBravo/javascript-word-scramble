const words = ['flower']

const playingWord = getRandomWord()
const unorderedWord = messUpLetters()
let response = ''

window.addEventListener('keyup', checkGame)
printGame()

function printGame() {
    document.querySelector("#word_to_guess").innerHTML = ''
    document.querySelector("#word_input").innerHTML = ''

    for (let i = 0; i < unorderedWord.length; i++) {
        const letter = unorderedWord[i]
        document.querySelector("#word_to_guess").innerHTML += letter
        document.querySelector("#word_input").innerHTML += `
            <div id="letter_input_${i}" class="letter ${i == 0 ? 'letter_selected' : ''}"></div>
        `
    }
}

function checkGame(e) {
    const key = e.key.toLowerCase()
    const letters = document.querySelectorAll('.letter')

    if (key.length == 1) {
        if (isLetter(key)) {
            if (response.length < playingWord.length) {
                letters[response.length].innerHTML = key
                letters[response.length].classList.remove('letter_selected')
                response += key

                if (response.length < playingWord.length) {
                    letters[response.length].classList.add('letter_selected')
                }
            }
        }
    } else if (key == 'backspace') {
        if (response.length != 0) {
            if (response.length < playingWord.length) {
                letters[response.length].classList.remove('letter_selected')
            }

            response = response.substring(0, response.length - 1)

            letters[response.length].classList.add('letter_selected')
            letters[response.length].innerHTML = ''
        }
    }
}

function checkWin() {
    if (response == playingWord) {
        console.log("GANASTE")
    }
}

function getRandomWord() {
    const r = Math.round(Math.random() * (words.length - 1))
    return words[r]
}

function messUpLetters() {
    let wordArr = playingWord.split('')
    let res = []

    for (let i = 0; i < playingWord.length; i++) {
        const r = Math.round(Math.random() * (wordArr.length - 1))
        res.push(wordArr[r])
        wordArr.splice(r, 1)
    }

    return res
}

function isLetter(letter) {
    const ascii = letter.toUpperCase().charCodeAt(0)
	return ascii > 64 && ascii < 91
}