# Basic-nodejs-course
### [Yuri Lapitski](lyurik@tut.by)
## Ciphering CLI Tool
# Testing
### Usage example:  

> Go to the directory `CipheringCLITool`
```bash
$ cd CipheringCLITool
```
---------------------------------------------------------------
## Баллы за реализацию

1. По **плюс 2 балла** за каждый юнит-тест (не более **20 баллов** в сумме, баллы начисляются не более чем за 3 теста на каждую отдельную функцию/компонент).

         Выполнено.

2. Покрытие не менее 70% **плюс 20 баллов** (покрытие по **строкам**, вычисляется при помощи `jest --coverage`)

         Выполнено.

3. В тестах задействованы все сценарии из описания **плюс 20 баллов**

         Выполнено.         
        ### Error scenarios
        1) Input: User passes the same cli argument twice; Result: Error message is shown;
        e.g. input: `node my_caesar_cli -c C1-C1-A-R0 -c C0` result: `Error: You provided -c argument more than once`;

            Выполнено - смотреть validateArguments.test.js - 5 тестов

        2) Input: User doesn't pass -c or --config argument; Result: Error message is shown;

            Выполнено - смотреть validateConfig.test.js строки 8, 11

        3) Input: User passes -i argument with path that doesn't exist or with no read access; Result: Error message is shown;

            Выполнено - смотреть validateFile.test.js

        4) Input: User passes -o argument with path to directory that doesn't exist or with no read access; Result: Error message is shown;
   
            Выполнено - смотреть validateFile.test.js

        5) Input: User passes incorrent symbols in argument for --config; Result: Error message is shown;

            Выполнено - смотреть validateConfig.test.js строка 15-26

        ### Success scenarios
        1) Input: User passes correct sequence of symbols as argument for --config that matches regular expression; Result: test passed
        2) Take cipher usage scenarios from [first task description](https://github.com/AlreadyBored/basic-nodejs-course/blob/review-2021Q4/descriptions/caesar-cipher-cli-tool.md) usage examples.

            Выполнено - Смотреть validateConfig.test.js строка 35-74
        

4. Для тестирования используются mock-объекты **плюс 20 баллов**

         Выполнено - См. файл toArrayStreams.test.js строки 6, 32 и др.

## Продвинутая реализация

1. Покрытие не менее 85% **плюс 20 баллов** (покрытие по **бранчам** вычисляется при помощи `jest --coverage`)

        Выполнено. % Branch = 88,57%