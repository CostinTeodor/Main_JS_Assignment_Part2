const addition = (x, y) => { return x + y };
const substraction = (x, y) => { return x - y };
const division = (x, y) => { return x / y };
const multiplication = (x, y) => { return x * y };


// Declaring the result variable which will keep changing
let resultTextElement = document.querySelector("#result");
// Prevent submitting the forms
const allButtons = document.querySelectorAll("button");
allButtons.forEach(element => {
    element.addEventListener("click", event => {
        event.preventDefault();
    })
});
// Declaring the operations buttons (+ - * / .)
const operationsButtons = document.querySelectorAll(".operations-buttons");
// Checking if any operation button are pressed with no number
// ahead and correct it
operationsButtons.forEach(element => {
    element.addEventListener("click", event => {
        if (resultTextElement.textContent == "")
            resultTextElement.textContent = "0";
    })
});
// Declaring the elements that Change the screen number
// (not that delete)
const screenElements = document.querySelectorAll(".screening-text");
// Check if the screen elements are clicked
screenElements.forEach(element => {
    element.addEventListener("click", event => {
        // Check if the input number does not start with 0
        // Also Check if the second to last input is a '.'
        // so we can enter multiple 0's
        let secondToLast = resultTextElement.textContent[resultTextElement.textContent.length - 2];
        if (resultTextElement.textContent.endsWith("0") &&
            element.classList.contains("number-button") &&
            isNaN(secondToLast) && secondToLast != ".")
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
        // Check if the length of the operation is not larger
        // than the screen width
        if (resultTextElement.textContent.length >= 16) {
            alert("Largest operation is 16 characters long!");
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -2);
        }
        // Check if the input does not end in + - / * and 
        // that the last input is one of the operation symbol
        // so they don't stack
        if (checkEnding() &&
            element.classList.contains("operations-buttons"))
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
        resultTextElement.textContent += element.textContent;

    })
});
// Function to calculate the string using the built-in
// eval function
function calculate(string) {
    let result = resultTextElement.textContent;
    let symbolsString = resultTextElement.textContent.replace(/[0-9,.]/g, '');
    let symbolsArray = symbolsString.split("");

    let resultArray = result.split(/[+,\-,/,*]/);
    let resultAsNumber = resultArray[0];
    for (let i = 1; i < resultArray.length; i++) {
        let firstNumber = resultArray[i];
        console.log(resultAsNumber);
        console.log(firstNumber);
        switch (symbolsArray[i - 1]) {
            case '+':
                resultAsNumber = addition(resultAsNumber, firstNumber);
                break;
            case '-':
                resultAsNumber = substraction(resultAsNumber, firstNumber);
                break;
            case '/':
                resultAsNumber = division(resultAsNumber, firstNumber);
                break;
            case '*':
                resultAsNumber = multiplication(resultAsNumber, firstNumber);
                break;
        }
    }
    result = +resultAsNumber;
    // Make the result have only 2 decimals and convert it to 
    // string
    result = "" + ((Math.round(result * 100) / 100).toFixed(2));
    // Check if the result ends in '.00' and slice it so
    // the result will not show it
    if (result.endsWith(".00"))
        result = result.slice(0, -3);
    // Check if the result ends in 2 decimals, the last being
    // a '0', so the result will not show it (e.g 4.10 -> 4.1)
    else if (result.endsWith("0") && result[result.length - 3] == ".")
        result = result.slice(0, -1);
    return result;
}
// Declare the equal button and call the appropriate function
const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", equalButtonFunction);
// Declare the clear button and call the appropriate function
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearButtonFunction);
// Declare the backspace button and call the appropriate function
const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", backspaceButtonFunction);
// Declare the float point button and call the appropriate function
const floatPoint = document.querySelector("#float-point");
floatPoint.addEventListener("click", floatPointFunction);
// Check if an item is included in an array
function inArray(array, item) {
    return array.includes(item);
}
// Declare a list of the NaN inputs allowed
let separators = ['+', '-', '/', '*', '.', 'Enter', 'Backspace', 'Escape', ' '];
// Check if a key is pressed
document.body.addEventListener("keyup", event => {
    // Check if the length of the operation is not larger
    // than the screen width
    if (resultTextElement.textContent.length >= 16) {
        alert("Largest operation is 16 characters long!");
        resultTextElement.textContent = resultTextElement.textContent.slice(0, -2);
    }
    // Check if the input is a number or if it is included
    // in the allowed inputs
    if (!isNaN(event.key) || separators.indexOf(event.key) != -1) {
        // Check for each input case
        switch (event.key) {
            case ".":
                floatPointFunction();
                break;
            case "+":
            case "/":
            case "*":
            case "-":
                if (resultTextElement.textContent == "")
                    resultTextElement.textContent = "0";
                if (checkEnding() && isNaN(resultTextElement.textContent[resultTextElement.textContent.length - 1]) ||
                    resultTextElement.textContent.endsWith("."))
                    resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
                resultTextElement.textContent += event.key;
                break;
            case 'Enter':
                equalButtonFunction();
                break;
            case 'Backspace':
                backspaceButtonFunction();
                break;
            case 'Escape':
                clearButtonFunction();
                break;
            case ' ':
                event.preventDefault();
                break;
            default:
                let secondToLast = resultTextElement.textContent[resultTextElement.textContent.length - 2];
                let last = resultTextElement.textContent[resultTextElement.textContent.length - 1];
                if (resultTextElement.textContent.endsWith("0") &&
                    !isNaN(last) && last == '0' &&
                    isNaN(secondToLast) && secondToLast != ".")
                    resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
                if (!isNaN(event.key))
                    resultTextElement.textContent += event.key;
                break;
        }
    }
});

function floatPointFunction() {
    if (resultTextElement.textContent == "" || checkEnding()) {
        let inputArray = resultTextElement.textContent.split("");
        inputArray.splice(inputArray.length, 0, "0");
        resultTextElement.textContent = inputArray.join("");
    }
    let numberArray = resultTextElement.textContent.split(/[+,\-,*,/]/);
    let lastNumberString = numberArray[numberArray.length - 1];
    if (lastNumberString.includes("."))
        alert("There is no such number! Please correct it!");
    else
        resultTextElement.textContent += ".";
}

function checkEnding() {
    if (resultTextElement.textContent.endsWith("/") ||
        resultTextElement.textContent.endsWith("-") ||
        resultTextElement.textContent.endsWith("+") ||
        resultTextElement.textContent.endsWith("*"))
        return true;
    return false;
}

function equalButtonFunction() {
    let checkZeroPosition;
    let ok = 1;
    checkZeroPosition = resultTextElement.textContent.split("/0");
    for (let i = 1; i < checkZeroPosition.length; i++) {
        if (!checkZeroPosition[i].startsWith(".")) {
            ok = 0;
            break;
        }
    }
    if (ok == 0)
        alert("You cannot divide by 0. Please retry!");
    else if (checkEnding())
        alert("You still have one operation left");
    else {
        resultTextElement.textContent = calculate(resultTextElement.textContent);
    }
}

function backspaceButtonFunction() {
    resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
}

function clearButtonFunction() {
    resultTextElement.textContent = '';
    console.clear();
}