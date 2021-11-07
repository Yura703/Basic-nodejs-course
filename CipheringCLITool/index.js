const { stdout, stdin } = process;
const fs = require('fs');
let coding = require('./encryption');
//const readStream = require('./streams/ReadStream');
//const writeStream = require('./streams/WriteStream');
const transform = require('./streams/TransformCaesarStream');

const ENCODING = true;
const DECODING = false;

// let a1 = coding.coding("11aaaAAAzzzZZZ11", "Caesar", true);
// console.log(a1);

// let a2 = coding.coding("22aaaAAAzzzZZZ22", "ROT-8", true);
// console.log(a2);

// let a3 = coding.coding("33aaaAAAzzzZZZ33", "Atbash");
// console.log(a3);



//readStream('./output.txt');

fs.createReadStream('./input.txt', 'utf8')
.pipe(new transform(DECODING))
.pipe(fs.createWriteStream('./output.txt', {flags: 'a', encoding: 'utf8'}));