let resultTextElement = document.querySelector("#result");

const addButton = document.querySelector("#addition");
const substractButton = document.querySelector("#substraction");
const multiplyButton = document.querySelector("#multiplication");
const divideButton = document.querySelector("#division");

const allButtons = document.querySelectorAll("button");

allButtons.forEach(element => {
    element.addEventListener("click", event => {
        event.preventDefault();
    })
});

const operationsButtons = document.querySelectorAll(".operations-buttons");

const screenElements = document.querySelectorAll(".screening-text");

operationsButtons.forEach(element => {
    element.addEventListener("click", event => {
        if (resultTextElement.textContent == "")
            resultTextElement.textContent = "0";
    })
});

screenElements.forEach(element => {
    element.addEventListener("click", event => {
        let secondToLast = resultTextElement.textContent[resultTextElement.textContent.length - 2];
        if (resultTextElement.textContent.endsWith("0") &&
            element.classList.contains("number-button") &&
<<<<<<< HEAD
            isNaN(secondToLast) && secondToLast != ".")
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
        if (resultTextElement.textContent.length >= 24) {
            alert("Largest operation is 24 characters long!");
=======
            isNaN(secondToLast))
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);

        if (resultTextElement.textContent.length >= 24) {
            alert("Largest operation is 30 characters long!");
>>>>>>> e5c60a8c4f7868cd1accbeed9a0b1d02ed556c34
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
        }
        if (checkEnding() &&
            element.classList.contains("operations-buttons"))
            resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
        // if()
            resultTextElement.textContent += element.textContent;
    })
});

function calculate(string) {
    let result = eval(string);
    result = "" + ((Math.round(result * 100) / 100).toFixed(2));
    if (result.endsWith(".00"))
        result = result.slice(0, -3);
    else if (result.endsWith("0") && result[result.length - 3] == ".")
        result = result.slice(0, -1);
    return result;
}

const equalButton = document.querySelector("#equal");

equalButton.addEventListener("click", event => {
    equalButtonFunction();
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", event => {
    clearButtonFunction();
});

const backspaceButton = document.querySelector("#backspace");

backspaceButton.addEventListener("click", event => {
    backspaceButtonFunction();
});

const floatPoint = document.querySelector("#float-point");

floatPoint.addEventListener("click", event => {
    floatPointFunction();
});

function inArray(array, item) {
    if (array.includes(item))
        return true;
    return false;
}

let separators = ['+', '-', '/', '*', '.', 'Enter', 'Backspace', 'Escape'];

document.body.addEventListener("keyup", event => {
<<<<<<< HEAD
    if (resultTextElement.textContent.length >= 30) {
        alert("Largest operation is 30 characters long!");
=======
    if (resultTextElement.textContent.length >= 24) {
        alert("Largest operation is 24 characters long!");
>>>>>>> e5c60a8c4f7868cd1accbeed9a0b1d02ed556c34
        resultTextElement.textContent = resultTextElement.textContent.slice(0, -1);
    }
    if (!isNaN(event.key) || separators.indexOf(event.key) != -1) {
        switch (event.key) {
            case ".":
                if (resultTextElement.textContent == "")
                    resultTextElement.textContent = "0";
                floatPointFunction();
                break;
            case "+":
            case "/":
            case "*":
            case "-":
                if (resultTextElement.textContent == "")
                    resultTextElement.textContent = "0";
                if (checkEnding() && isNaN(resultTextElement.textContent[resultTextElement.textContent.length - 1]))
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
            default:
                if (!isNaN(event.key))
                    resultTextElement.textContent += event.key;
                break;
        }
    }
});

function floatPointFunction() {
    let numberArray = resultTextElement.textContent.split(/[+,-,*,/]/);
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