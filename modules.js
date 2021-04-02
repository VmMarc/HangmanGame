/*-------------dico/random------------------*/
const { randomInt } = require('crypto')
const fs = require('fs')

/*lire le fichier dict.txt et le découper en tableau 
+ les lettres de la meme taille*/
const dict = fs.readFileSync('./dict.txt', 'utf-8')
const dictTab = dict.toUpperCase().split('\n')
  //console.log(dictTab)

/*récupérer un mot au hazard de ce tableau 
+ découpe lettre par lettre*/
const n = randomInt(0, dictTab.length)
const secretWord = dictTab[n]
  //console.log(secretWord)

/*crée un tableau vide
+ crée une boucle qui l'incrémente 
de la bonne lettre au bon index*/

const guessTab = Array(secretWord.length).fill('_')
for (i = 0; i < secretWord.length; i++){
  guessTab.push('_')
}

console.log(guessTab)

/*-------------Player Info---------------*/
/*class Player {
  constructor(name, age, city){
    this.name = name
    this.age = age
    this.city = city
    //high score à push en fin de partie?
  }
}
*/
