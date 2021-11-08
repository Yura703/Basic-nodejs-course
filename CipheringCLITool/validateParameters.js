const { stdout, stdin, stderr, exit } = process;
const ParameterError = require('./errors/ParameterError');


const flags = {
    config: "c",
    input: "i",
    output: "o",
}

const parameters = process.argv.slice(2);

 try {  
    // if (parameters.slice(-1) === "-") {                                // надо делать игнорирование пробелов в конце строки
    //      throw new ParameterError("Строка не корректна, завершается на \"-\". Работа программы завершена.");
    // }

    const index = parameters.indexOf("-c" || "--config");
    if (index === -1) {
        throw new ParameterError("Отсутствует опция \"config\".");
    }

    let config = parameters[index + 1].split("-");
    for (let i = 0; i < config.length; i++) {
       // console.log(config[i]);
        if (!(/^\s*[CR][10]\s*$|^\s*[A]+\s*$/.test(config[i]))) {
             throw new ParameterError("Опция \"config\" не соответствует требуемым параметрам.");
        }        
    }
   
   if ((parameters.join("").match(/-i|--input/g) || []).length > 1 ||  (parameters.join("").match(/-o|--output/g) || []).length > 1) {
        throw new ParameterError("Опции input/output дублируются. ");
   }  
 } catch (error) {
     stderr.write(error.message + "Работа программы завершена.");
     exit(1);
 }


 function getParameters() {  
     for (let i = 0; i < parameters.length; i++) {
         if (parameters[i] === "-c" || parameters[i] === "--config") {
             flags.config = parameters[i + 1].split('-');
         };
         if (parameters[i] === "-i" || parameters[i] === "--input") {//сделать строку с полным адресом
             flags.input = parameters[i + 1];
         };
         if (parameters[i] === "-o" || parameters[i] === "--otput") {
             flags.output = parameters[i + 1];
         };       
     }

     return flags;
 }

 module.exports = getParameters();