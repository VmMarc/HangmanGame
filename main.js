/*-------------dico/random------------------*/
const fs = require('fs')
const { HANGMAN } = require('./hangman')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { randomInt } = require('crypto')


/*lire le fichier dict.txt et le découper en tableau 
+ les lettres de la meme taille*/
let dict = fs.readFileSync('./dict.txt', 'utf-8')
let dictTab = dict.toUpperCase().split('\n')
  //console.log(dictTab)

/*récupérer un mot au hazard de ce tableau 
+ découpe lettre par lettre*/
let n = randomInt(0, dictTab.length)
let secretWord = dictTab[n].split('')
  //console.log(secretWord)

/*crée un tableau vide
+ crée une boucle qui l'incrémente 
avec Underscore*/

let guessTab = Array(secretWord.length).fill('_')
  //console.log(guessTab)

  const MAX_CHANCES = 8

//conteur pour affiché le pendu 
let chances = 1
let hCount = 0
while (chances !== MAX_CHANCES && guessTab.includes('_')){
  console.log(`${HANGMAN[hCount]}  /!\\ ${guessTab.join(' ')} /!\\  -->${chances}/8<-- `)

  let guessLetter = ''
  guessLetter = readlineSync.question('What\'s your guess? ').toUpperCase()

  for (let i = 0; i < secretWord.length; i++){
    secretWord[i] === guessLetter ? guessTab[i] = guessLetter : ''
  }

  if (secretWord.includes(guessLetter)){
    console.log('\n\tGood Guess!')
  } else {
    console.log('\n\tBad guess...')
    chances++
    hCount++
  }

  if (chances === MAX_CHANCES){
    console.log(`\t-->${chances}/8<--\n\tGAME OVER !`)
    process.exit
  } else if (secretWord.join('') === guessTab.join('')) {
    console.log(`\n\tYOU WIN!\n-->${secretWord.join('')} is the Bad Guy you\'r looking for ;)`)
  }
}