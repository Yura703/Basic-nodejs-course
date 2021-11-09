# Basic-nodejs-course
### [Yuri Lapitski](lyurik@tut.by)
## Ciphering CLI Tool
### CLI tool that encodes and decodes text using 3 wildcard ciphers:
* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
* [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)
  
  CLI tool accepts 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"


### Usage example:  

> Go to the directory `CipheringCLITool`
```bash
$ cd CipheringCLITool
```
---------------------------------------------------------------
```bash
$ node index -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node index -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node index -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node index -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`
--------------------------------------------------------------------------------------



### Help for cross-check

1. В README.md должно быть описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению плюс 10 баллов.
   
    [ + ] done, see above

2. Если переданы все аргументы и они корректны, приложение читает из файла и записывает в файл преобразованный текст, при этом предыдущие записи не удаляются плюс 20 баллов

    [ + ] done, see above
   
3. Приложение работает в соответствии с описанными в задании примерами плюс 30 баллов
   
    [ + ] done, see above

4. Если аргументы input и/или output ведут к несуществующему файлу либо директории,приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0 плюс 10 баллов   
    [ + ]  
   
```bash
$ node index -c "C1" -i "./inputX.txt" -o "./output.txt"
```
```bash
$ node index -c "C1" -i "./input.txt" -o "./outputX.txt"
```
```bash
$ node index -c "C1" -i "./input.txt" -o "./test-folder"
```
```bash
$ node index -c "C1" -i "./test-folder" -o "./output.txt"
```

 `Error: Not exist file ./inputX.txt` or `Error: Not exist file ./outputX.txt` or `Error: Path ./test-folder is folder`

File validateParameters.js str.61-63 
``` 
  catch (error) {
        stderr.write('Error: ' + error.message);
        exit(1);
  } 
```   

5. Если любой из аргументов дублируется, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0 плюс 10 баллов

    [ + ]  
   
```bash
$ node index -c "C1" -c "C0"
```
```bash
$ node index -c "C1" -i "./input.txt" -o "./output.txt" -i "./input.txt"
```
```bash
$ node index -c "C1" -o "./output.txt" -i "./input.txt" -o "./output.txt"
```  

 `Error: Options are duplicated.` 

6. Если config невалиден или отсутствует, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0 плюс 20 баллов. 

    [ + ]  
   
```bash
$ node index -o "./output.txt" -i "./input.txt"
```
```bash
$ node index -c
```

`Error: Missing option "config".`

Объем валидации config:

* file validateParameters.js str.19-22
* проверяется, что config имеет формат {XY(-)}n
  
```bash
$ node index -c "C1-R1-A-"
```

* проверяется, что X соответствует одному из шифров
  
```bash
$ node index -c "C1-S1-H0"
```

* проверяется, что для ROT-8 и Цезаря присутствует элемент Y
  
```bash
$ node index -c "C1-C-R-R1"
```

* проверяется, что для Атбаш отсутствует элемент Y
  
```bash
$ node index -c "A1"
```
* проверяется, что Y — это 1 или 0

```bash
$ node index -c "C3"
```

`Error: Option "config" does not meet the required parameters.`

7. Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin плюс 10 баллов

    [ + ]  
   
```bash
$ node index -c "C1" -o "./output.txt"
```

8. Если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout плюс 10 баллов

    [ + ]  

```bash
$ node index -c "C1" -i "./input.txt"
```

9. Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются плюс 20 баллов

    [ + ]  

`node index -c "C1"` `Aa123+/$&gfdCVЯЪЬ` => `Bb123+/$&hgeDWЯЪЬ`

10. Если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст плюс 10 баллов

    [ + ]  
   
    * Getting the changed string - ENTER. Exiting the mode - CTRL + C
  
11. Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.) плюс 10 баллов

    [ + ]  
   
   * division into 12 files 
    
2-1. Чтение реализовано при помощи кастомного стрима (класс, отнаследованный от Readable) плюс 10 баллов

    [ + ]  
  
   * folder 'streams' - ReadStream.js
  
2-2.  Запись реализована при помощи кастомного стрима (класс, отнаследованный от Writable) плюс 10 баллов

    [ + ]  
    
   * folder 'streams' - WriteStream.js

2-3.  Для передачи сообщения в process.stderr используются пользовательские ошибки и их обработка плюс 10 баллов

    [ + ]  
    
   * folder 'errors' - FileError.js and ParameterError.js and realization in validateParameters.js

* При изменении порядка аргументов ошибка либо изменение результата выполнения кода не происходит.
  
  ```bash
$ node index -o "./output.txt" -i "./input.txt" -c "C1-C1-R0-A"
```

`Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`