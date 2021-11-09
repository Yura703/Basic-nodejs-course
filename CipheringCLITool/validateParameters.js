const { stderr, exit } = process;
const fs = require('fs');
const ParameterError = require('./errors/ParameterError');
const FileError = require('./errors/FileError');
const { flags } = require('./resourses');

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
    stderr.write('Error: ' + error.message);
    exit(1);
}

function getParameters() {      
    try {
        for (let i = 0; i < parameters.length; i++) {
            const nextParameter = parameters[i + 1];
            if (parameters[i] === "-c" || parameters[i] === "--config") {
                flags.config = nextParameter.split('-');
            };
    
            if (parameters[i] === "-i" || parameters[i] === "--input") {
                checkAvailabilityFile(nextParameter); 
                canRead(nextParameter);               
                flags.input = nextParameter;  
            };
            
            if (parameters[i] === "-o" || parameters[i] === "--otput") {
                checkAvailabilityFile(nextParameter); 
                canWrite(nextParameter);              
                flags.output = nextParameter;   
            };       
        }  

        return flags;
    } catch (error) {
        stderr.write('Error: ' + error.message);
        exit(1);
    }    
}

function checkAvailabilityFile(pathFile) {
    if (!fs.existsSync(pathFile)) {
        throw new FileError(`Not exist file ${pathFile}`);                    
    }
}
function canWrite(pathFile) {
    try {
        fs.accessSync(pathFile, fs.constants.W_OK)
    } catch (error) {
        throw new FileError(`File ${pathFile} is not wtitable`);         
    }
}

function canRead(pathFile) {
    try {
        fs.accessSync(pathFile, fs.constants.R_OK)
    } catch (error) {
        throw new FileError(`File ${pathFile} is not reading`);         
    }
}

 module.exports = getParameters();