const alphabet = () => {
  let array = [];
  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
    array.push(String.fromCharCode(i));
  } 
  return array
}

exports.alphabet = alphabet