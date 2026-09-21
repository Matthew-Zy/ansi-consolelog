# ansi-consolelog
Output colored terminal text with ansi-escape colors to the browser console. It only supports 24-bit ANSI color. Chrome natively supports ansi-escape sequences but firefox does not. If you use `ansiConsolelog` on a chromium based browser it will simply pass it to `console.log` instead of converting to css formatters. 

The format for setting 24-bit ANSI is: `\x1b[38;2;${r};${g};${b}m${text}` where `${r}`, `${g}` and `${b}` are the RGB values of the text, and `${text}` is the text you want to have those RGB colors. 

## Install
```
npm install ansi-consolelog
```

## Usage:
Example with a build tool like vite importing raw files
```javascript
// import a raw file containing ansi escape color codes
import ItsukiAnsi from './Itsuki.txt?raw'
import ansiConsoleLog from 'ansi-consolelog'
ansiConsoleLog(ItsukiAnsi)
```
Example with inline ascii 
```javascript
import ansiConsoleLog from 'ansi-consolelog'
const rainbowThis = "\x1b[38;2;255;0;0mT\x1b[38;2;255;127;0mH\x1b[38;2;255;255;0mI\x1b[38;2;0;255;0mS\x1b[0m"
ansiConsoleLog(rainbowThis)
```

You may also get the raw string with format specifier and css attached to it if you want to use that information yourself
```javascript
import { ansiToCssFormat } from 'ansi-consolelog'

const rainbowThis = "\x1b[38;2;255;0;0mT\x1b[38;2;255;127;0mH\x1b[38;2;255;255;0mI\x1b[38;2;0;255;0mS\x1b[0m"
// formattedText is the text with format specifiers
// css is an array of css values
const [formattedText, css] = ansiToCssFormat(rainbowThis)

// You may also just print them out yourself after obtaining the variables
console.log(formattedText, ...css)
```


## Examples
Example showing the css generated to print out `THIS` with some colors

![Format specifiers behind the scenes](https://raw.githubusercontent.com/Matthew-Zy/ansi-consolelog/refs/heads/main/.github/example.png)

Itsuki Nakano in the Firefox console

![Itsuki](https://raw.githubusercontent.com/Matthew-Zy/ansi-consolelog/refs/heads/main/.github/Itsuki.png)
