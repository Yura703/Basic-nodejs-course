const resourses = require("./resourses")

const ENCODING_ROT8 = 8;
const DECODING_ROT8 = -8;
const ALPHABET_COUNT = 52;
//const ENCODING_ROT8 = 8;


module.exports = function(text, cipherName, encodingOrDecoding) {
    if (cipherName === "Caesar" && encodingOrDecoding) {
        return codingCaesar(text, -1);
    }
    if (cipherName === "Caesar" && !encodingOrDecoding) {
        return codingCaesar(text, 1);
    }

    if (cipherName === "ROT-8" && encodingOrDecoding) {
        return codingCaesar(text, 8);
    }
    if (cipherName === "ROT-8" && !encodingOrDecoding) {
        return codingCaesar(text, -8);
    }

    if (cipherName === "Atbash") {
        return codingAtbash(text);
    }

}

function codingCaesar(text, shift) {
    //console.log(text);
    let encodeArray = text.split("").map(value => {
        let index = resourses.alphabet.indexOf(value);
        if (index !== -1) { 
            let newIndex = index + shift * 2;
            if (newIndex < 0) {
                newIndex += 52;

                return resourses.alphabet[newIndex]
            }

            if (newIndex > 51) {
                newIndex -= 52;

                return resourses.alphabet[newIndex]
            }  
            
            return resourses.alphabet[newIndex]
        }  

        return value;
    })

    return encodeArray.join("");
}

function codingAtbash(text) {
    let encodeArray = text.split("").map(value => {
        let index = resourses.alphabet.indexOf(value);
        if (index !== -1) {  
            let newIndex = index % 2 === 0 ? 50 - index : 52 - index;
            return resourses.alphabet[newIndex]
        }  

        return value;
    })

    return encodeArray.join("");
}


