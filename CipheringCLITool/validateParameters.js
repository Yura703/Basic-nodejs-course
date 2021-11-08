const { stderr, exit } = process;
const ParameterError = require('./errors/ParameterError');
const { flags } = require('./resourses');
const fs = require('fs');

const parameters = process.argv.slice(2);

 try {  
    if (parameters.slice(-1)[0] === '-') {                               
         throw new ParameterError("the line is not correct, ends with '-'.");
    }

    const index = parameters.indexOf("-c" || "--config");
    if (index === -1) {
        throw new ParameterError("Missing option \"config\".");
    }

    let config = parameters[index + 1].split("-");
    for (let i = 0; i < config.length; i++) {
        if (!(/^\s*[CR][10]\s*$|^\s*[A]+\s*$/.test(config[i]))) {
             throw new ParameterError("Option \"config\" does not meet the required parameters.");
        }        
    }
   
   if ((parameters.join("").match(/-i\s|--input/g) || []).length > 1 ||  (parameters.join("").match(/-o\s|--output/g) || []).length > 1 ||
    (parameters.join("").match(/-c\s|--config/g) || []).length > 1) {
        throw new ParameterError("Options are duplicated.");
   }  
} catch (error) {
    stderr.write(error.message);
    exit(1);
}

function getParameters() {  
    try {
        for (let i = 0; i < parameters.length; i++) {
            if (parameters[i] === "-c" || parameters[i] === "--config") {
                flags.config = parameters[i + 1].split('-');
            };
    
            if (parameters[i] === "-i" || parameters[i] === "--input") {
                checkAvailabilityFile(parameters[i + 1]);               
                flags.input = parameters[i + 1];  
            };
            
            if (parameters[i] === "-o" || parameters[i] === "--otput") {
                checkAvailabilityFile(parameters[i + 1]);               
                flags.output = parameters[i + 1];   
            };       
        }  

        return flags;
    } catch (error) {
        stderr.write(error.message);
        exit(1);
    }    
}

function checkAvailabilityFile(pathFile) {
    if (!fs.existsSync(pathFile)) {
        throw new ParameterError(`Not exist file ${pathFile}`);                    
    }
}

 module.exports = getParameters();