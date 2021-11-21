const { alphabet } = require("./resourses");

const ENCODING_CAESAR = 1;
const DECODING_CAESAR = -1;
const ENCODING_ROT8 = 8;
const DECODING_ROT8 = -8;
const VALUE_NOT_FOUND = -1;
const ALPHABET_COUNT = alphabet.length;

module.exports = function (text, cipherName, encodingOrDecoding) {
  if (cipherName === "Caesar" && encodingOrDecoding) {
    return codingCaesar(text, ENCODING_CAESAR);
  }
  if (cipherName === "Caesar" && !encodingOrDecoding) {
    return codingCaesar(text, DECODING_CAESAR);
  }

  if (cipherName === "ROT-8" && encodingOrDecoding) {
    return codingCaesar(text, ENCODING_ROT8);
  }
  if (cipherName === "ROT-8" && !encodingOrDecoding) {
    return codingCaesar(text, DECODING_ROT8);
  }

  if (cipherName === "Atbash") {
    return codingAtbash(text);
  }
};

function codingCaesar(text, shift) {
  let encodeArray = text.split("").map((value) => {
    let index = alphabet.indexOf(value);

    if (index !== VALUE_NOT_FOUND) {
      let newIndex = index + shift * 2;

      if (newIndex < 0) {
        newIndex += ALPHABET_COUNT;

        return alphabet[newIndex];
      }

      if (newIndex > ALPHABET_COUNT - 1) {
        newIndex -= ALPHABET_COUNT;

        return alphabet[newIndex];
      }

      return alphabet[newIndex];
    }

    return value;
  });

  return encodeArray.join("");
}

function codingAtbash(text) {
  let encodeArray = text.split("").map((value) => {
    let index = alphabet.indexOf(value);

    if (index !== VALUE_NOT_FOUND) {
      let newIndex =
        index % 2 === 0 ? ALPHABET_COUNT - 2 - index : ALPHABET_COUNT - index;

      return alphabet[newIndex];
    }

    return value;
  });

  return encodeArray.join("");
}
