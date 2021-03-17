// function func(a, b) {
//   return !(a === 1 || b === 1);
// }
// console.log(func(NaN, NaN));
// // true
// console.log(func(1, NaN));
// // false
// console.log(func(1, 1));
// // false
// console.log(func(NaN, 1));
// // false


// function func(a) {
//   const lettersTable = Object.values(a);
//   let word = '';
//   for (let i = 0; i < lettersTable.length; i++) {
//     word += lettersTable[i];
//   }
//   return word;
// }
//
// console.log(func(a));
const a = {a: 'a', b: 'b', c: 'c'};
const b = {ala: 'ma', 'kota': ''};

function funcS(x) {
  return Object.keys(x).reduce((acc, key) => acc + key);
}

console.log(funcS(a));
console.log(funcS(b));

const ą = ę => ż;
ż = 4;
ą(3);
console.log(ą, ż, ą(3));

const f1 = function(){};
const f2 = function(){};
console.log(f1 === f2);
console.log(f1() === f1());
console.log(f1() === f2());

console.log(func(1)(1)(1));
// 1
console.log(func(2)(3)(4));
// 24
console.log(func(3)(3)(3));
// 81



function func(a) {
  return function(b) {
    return function(c) {
      if (a === b && b === c) {
        return Math.pow(a, 4);
      }
      return a * b * c;
    }
  }
}

let aa = 'aaBccDDDeeFFFggGh';
function funcA (a) {
  let lowerLetters = '';
  let upperLetters = '';
  for (let i =0; i < a.length-1; i++){
    if (a[i] === a[i].toLowerCase()) {
      lowerLetters += a[i];
    } else {
      upperLetters += a[i];
    }
  }
  return [lowerLetters, upperLetters];
}
console.log(funcA(aa));