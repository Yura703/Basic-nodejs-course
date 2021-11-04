const { stdout, stdin, stderr, exit } = process;

class ParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParameterError";
  }
}

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
        console.log(config[i]);
        if (!(/^\s*[CR][10]\s*$|^\s*[A]+\s*$/.test(config[i]))) {
             throw new ParameterError("Опция \"config\" не соответствует требуемым параметрам.");
        }        
    }
   
   if ((parameters.join("").match(/-i|--input/g) || []).length > 1 ||  (parameters.join("").match(/-o|--output/g) || []).length > 1) {
        throw new ParameterError("Опции input/output дублируются. ");
   }  
 } catch (error) {
     stderr.write(error.message + "Работа программы завершена.");
     exit();
     //exit();//сделать выход с ненулевым кодом состояния
 }


 function getParameters() {
    
 
     for (let i = 0; i < argument.length; i++) {
         if (argument[i] === "-c" || argument[i] === "--config") {
             flags.config = argument[i + 1];
         };
         if (argument[i] === "-i" || argument[i] === "--input") {
             flags.input = argument[i + 1];
         };
         if (argument[i] === "-o" || argument[i] === "--otput") {
             flags.output = argument[i + 1];
         };       
     }
 }

 //getParameters();