const fs = require('fs')
const { HANGMAN } = require('./hangman')
const readlineSync = require('readline-sync')
const chalk = require('chalk')//(a faire)
const { randomInt } = require('crypto')
const { alphabet } = require('./alphabet')

/*-------------------------------------------Preset-----------------------------------------*/ 
//check si le fichier dict exist + si c'est bien un fichier

if (process.argv.length !== 3) {
  console.log(chalk.red.bold('Usage: node main.js "file.txt"'))
  process.exit(1)
} else if (!fs.existsSync(process.argv[2])) {
  console.log(chalk.red.bold(`Error: "${process.argv[2]}" not found.`))
  process.exit(1)
}

let stats = fs.statSync(process.argv[2])
if (!stats.isFile()) {
  console.log(chalk.red.bold(`Error: "${process.argv[2]}" is not a file.`))
  process.exit(1)
}

let dict = fs.readFileSync(`./${process.argv[2]}`, 'utf-8')
let dictTab = dict.toUpperCase().split('\n')

let n = randomInt(0, dictTab.length)
let secretWord = dictTab[n].split('')
let guessTab = Array(secretWord.length).fill('_')
const MAX_CHANCES = 8

/*-------------------------------------------GAME-----------------------------------------*/ 
// utiliser chalk
let chances = 1
let count = 0

while (chances !== MAX_CHANCES){
  console.log(`${HANGMAN[count]}${chalk.red.bold('  /!\\ ')}${guessTab.join(' ')}${chalk.red(' /!\\  ')}${chalk.red.bold('-->')}${chances}/8${chalk.red.bold('<--')} `)

  let guessLetter = ''
  guessLetter = readlineSync.question(chalk.blue('What\'s your guess? ')).toUpperCase()
  while ((!(alphabet().includes(guessLetter))) || (guessLetter.length !== 1)){
    guessLetter = readlineSync.question(`${chalk.red.bold('Error: Only one letter from the alphabet.')}\n${chalk.blue('What\'s your guess? ').toUpperCase()}`)
  }

  for (let i = 0; i < secretWord.length; i++){
    secretWord[i] === guessLetter ? guessTab[i] = guessLetter : ''
  }

  if (secretWord.includes(guessLetter)){
    console.log(chalk.blue.bold('\n\tGood Guess!'))
  } else {
    console.log(chalk.red.bold('\n\tBad guess...'))
    chances++
    count++
  }

  if (chances === MAX_CHANCES){
    console.log(chalk.red.underline(`\t-->${chances}/8<--\n\tGAME OVER !`))
    process.exit(1)
  } else if (secretWord.join('') === guessTab.join('')) {
    console.log(`\n\t${chalk.green.underline('YOU WIN!')}\n-->${secretWord.join('')} is the Bad Guy you where looking for !`)
    process.exit(1)
  }
}