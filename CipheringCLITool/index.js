const { stdout, stdin } = process;
let coding = require('./encryption');

let a1 = coding.coding("11aaaAAAzzzZZZ11", "Caesar", true);
console.log(a1);

let a2 = coding.coding("22aaaAAAzzzZZZ22", "ROT-8", true);
console.log(a2);

let a3 = coding.coding("33aaaAAAzzzZZZ33", "Atbash");
console.log(a3);




