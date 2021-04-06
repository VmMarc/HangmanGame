/*-------------dico/random------------------*/
const fs = require('fs')
const { HANGMAN } = require('./hangman')
const readlineSync = require('readline-sync')
const chalk = require('chalk')//(a faire)
const { randomInt } = require('crypto')


/*lire le fichier dict.txt et le découper en tableau 
+ les lettres de la meme taille(check si fichier existe) */
let dict = fs.readFileSync('./dict.txt', 'utf-8')
let dictTab = dict.toUpperCase().split('\n')

/*récupérer un mot au hazard de ce tableau 
+ découpe lettre par lettre*/
let n = randomInt(0, dictTab.length)
let secretWord = dictTab[n].split('')

/*crée un tableau vide
+ crée une boucle qui l'incrémente 
avec Underscore*/

let guessTab = Array(secretWord.length).fill('_')
const MAX_CHANCES = 8

//count de chances
//count pour affiché le pendu 
let chances = 1
let hCount = 0
//lancement du jeu avec condition de retour
while (chances !== MAX_CHANCES){
  console.log(`${HANGMAN[hCount]}  /!\\ ${guessTab.join(' ')} /!\\  -->${chances}/8<-- `)

  //récup de la lettre avec readline(check a faire)
  let guessLetter = ''
  guessLetter = readlineSync.question('What\'s your guess? ').toUpperCase()

  //boucle qui incrémente le tableau "vide" si la lettre correspond bien
  for (let i = 0; i < secretWord.length; i++){
    secretWord[i] === guessLetter ? guessTab[i] = guessLetter : ''
  }

  // condition bonne/mauvaise réponse et incrémentation
  if (secretWord.includes(guessLetter)){
    console.log('\n\tGood Guess!')
  } else {
    console.log('\n\tBad guess...')
    chances++
    hCount++
  }
  //condition de victoire/defaite
  if (chances === MAX_CHANCES){
    console.log(`\t-->${chances}/8<--\n\tGAME OVER !`)
    process.exit
  } else if (secretWord.join('') === guessTab.join('')) {
    console.log(`\n\tYOU WIN!\n-->${secretWord.join('')} is the Bad Guy you\'r looking for ;)`)
  }
}

//il manque encore les checks