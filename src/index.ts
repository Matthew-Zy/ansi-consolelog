export { ansiConsoleLog, ansiToCssFormat }
export default ansiConsoleLog

function ansiConsoleLog(ansiString: string) {
    const currentEngine = getBrowserEngine()
    switch (currentEngine) {
        case "Chromium":
            console.log(ansiString)
            break
        default:
            const [formatString, styles] = ansiToCssFormat(ansiString)
            console.log(formatString, ...styles)
    }

}

function ansiToCssFormat(ansiString: string): [string, string[]] {
    // Regex to match ANSI 24-bit foreground/background colors and resets
    const regex = /\u001b\[(?:38|48);2;(\d+);(\d+);(\d+)m|\u001b\[0m/g
    
    let match
    let cssParts = ['']
    let styles = []
    let currentIndex = 0
    
    // Default current styles
    let fgColor = ''
    let bgColor = ''

    while ((match = regex.exec(ansiString)) !== null) {
        // Text segment before the match
        const textSegment = ansiString.substring(currentIndex, match.index);
        if (textSegment) {
            cssParts[cssParts.length - 1] += textSegment
        }

        if (match[0] === '\u001b[0m') {
            // Reset code
            fgColor = ''
            bgColor = ''
        } else if (match[1] !== undefined) {
            // 24-bit Truecolor match (Foreground: 38, Background: 48)
            const r = match[1], g = match[2], b = match[3]
            if (match[0].startsWith('\u001b[38')) {
                fgColor = `color: rgb(${r},${g},${b});`
            } else {
                bgColor = `background-color: rgb(${r},${g},${b});`
            }
        }

        // Whenever an ANSI code changes, start a new %c section
        cssParts.push('');
        styles.push(`${fgColor} ${bgColor} font-family: monospace; line-height: 1;`)
        
        currentIndex = regex.lastIndex
    }

    // Add remaining text
    const remainder = ansiString.substring(currentIndex)
    if (remainder) {
        cssParts[cssParts.length - 1] += remainder
    }

    const formatString = cssParts.join('%c')
    
    return [formatString, styles]
}

const BROWSER_ENGINES = ["Safari", "Firefox", "Chromium", "Unknown"]
type BrowserEngine = typeof BROWSER_ENGINES[number]

function getBrowserEngine(): BrowserEngine {
    const userAgent = navigator.userAgent

    if (userAgent.includes("Firefox")) {
        return "Firefox"
    } 
    else if (userAgent.includes("Chrome")) {
        return "Chromium"
    } 
    else if (userAgent.includes("Safari")) {
        return "Safari"
    } 
    
    return "Unknown"
}
