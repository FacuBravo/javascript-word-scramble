const words = [
    "amigo", "viaje", "barco", "tierra", "laguna", "sombra", "bosque", "nieve", "fruta", "ratón",
    "camino", "fresco", "cocina", "pelota", "fuego", "campo", "bailar", "caballo", "estrella", "torre",
    "calle", "librar", "hoja", "puente", "selva", "ciudad", "música", "viento", "letras", "corazón",
    "golpe", "espejo", "huella", "fuerza", "guitarra", "jardín", "saludo", "cuchara", "juntos", "almohada",
    "pastel", "hermano", "cuento", "playa", "botella", "tormenta", "canción", "valle", "gigante", "planta"
]

let playingWord = getRandomWord()
let unorderedWord = messUpLetters()
let response = '', win = false

window.addEventListener('keyup', checkGame)
window.addEventListener('keydown', deleteLetter)
document.querySelector("#reset_btn").addEventListener('click', restartWord)
document.querySelector("#random_btn").addEventListener('click', restartGame)
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
    if (win) {
        restartGame()
        return
    }

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
    } else if (key == 'enter') {
        checkWin()
    }
}

function deleteLetter(e) {
    if (win) {
        return
    }

    const key = e.key.toLowerCase()
    const letters = document.querySelectorAll('.letter')

    if (key == 'backspace') {
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
        win = true
        confetti.start()
    } else {
        document.querySelector("#word_input").classList.add('incorrect_animation')

        setTimeout(() => {
            document.querySelector("#word_input").classList.remove('incorrect_animation')
        }, 500)
    }
}

function restartGame() {
    win = false
    confetti.stop()
    response = ''
    playingWord = getRandomWord()
    unorderedWord = messUpLetters()
    printGame()
}

function restartWord() {
    response = ''
    const letters = document.querySelectorAll('.letter')
    for (let i = 0; i < letters.length; i++) {
        letters[i].innerHTML = ''

        if (i == 0) {
            letters[i].classList.add('letter_selected')
        } else {
            letters[i].classList.remove('letter_selected')
        }
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