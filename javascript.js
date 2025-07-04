//DOM manipulation
let screen = document.querySelector("#screen");
let isResult = false;


let keyboard = document.querySelector("#keyboard");
keyboard.addEventListener("click", (event) => {
    let result = screen.textContent;
    let currentNumber = getCurrentNumber(result);
    switch (event.target.id) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (isResult) {
                result = event.target.id;
                isResult = false;
            }
            else {
                result += event.target.id;
            }
            break;
        case "0":
            if (currentNumber.length == 0 ||
                currentNumber.length >= 1 && currentNumber != 0 ||
                currentNumber.includes(".")) {
                result += "0";
            }
            break;
        case "plus":
            result = addOperator("+", result)
            break;
        case "minus":
            result = addOperator("-", result)
            break;
        case "multiplication":
            result = addOperator("*", result)
            break;
        case "division":
            result = addOperator("/", result)
            break;
        case "percent":
            isResult = true;
            result = String(calculate(result, event.target.id));
            break;
        case "clearE":
        case "clear":
            result = "";
            break;
        case "backspace":
            if (isResult) {
                result = "";
            }
            else {
                result = result.slice(0, -1);
            }
            break;
        case "pow":
            result = addOperator("^", result)
            break;
        case "sqrt":
            result =  `√(${result}) = ${sqrt(result)}`;
            break;
        case "sign":
            if (!currentNumber.includes("-")){
                result = result.slice(0, -currentNumber.length);
                currentNumber = "-" + currentNumber;
                result += currentNumber;
            }
            else {
                result = result.slice(0, -currentNumber.length);
                currentNumber = currentNumber.slice(1, currentNumber.length);
                result += currentNumber;
            }
            break;
        case "decimal":
            if (currentNumber.includes(".")) {
                break;
            }
            else if (currentNumber == "") {
                result += "0.";
            }
            else {
                result += ".";
            }
            break;
        case "equal":
            isResult = true;
            result = String(calculate(result, event.target.id));
            break;
    }
    screen.textContent = result;
})


//Calculator functions

function addition(a, b) {
    return a + b;
}

function substraction(a, b) {
    return a - b;
}

function multiplication (a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        alert("Unable to divide by zero");
        return "";
    }
    return a / b;
}

function pow(a, b) {
    return Math.pow(a, b);
}

function sqrt(a) {
    return Math.sqrt(a);
}

function addOperator(operator, result) {
    isResult = false;
    if (endsWithOperator(result)) {
        result = result.slice(0, -3) + ` ${operator} `;
    }
    else if (calculate(result, "equal") != undefined) {
        result = calculate(result, "equal") + ` ${operator} `;
    }
    else {
        result += ` ${operator} `;
    }

    return result;
}

function calculate(string, id) {
    let parsed = string.split(" ");
    let operand1 = +parsed[0];
    let operator = parsed[1];
    if (operator == undefined) return operand1;
    let operand2 = (parsed[2] == "") ? operand1 : +parsed[2];

    if (operand2 == undefined) operand2 = operand1;

    if (id === "equal"){
        switch (operator) {
            case "+":
                return addition(operand1, operand2);
            case "-":
                return substraction(operand1, operand2);
            case "*":
                return multiplication(operand1, operand2);
            case "/":
                return division(operand1, operand2);
            case "^":
                return pow(operand1, operand2);
        }
    }

    if (id === "percent") {
        switch (operator) {
            case "+":
                return operand1 + (operand1 * operand2 / 100);
            case "-":
                return operand1 - (operand1 * operand2 / 100);
            case "*":
                return operand1 * operand2 / 100;
            case "/":
                return operand1 / operand2 / 100;
            default:
                return 0;
        }
    }
}

function endsWithOperator(string) {
    let operatorCheck = string.slice(-2, -1);
    if (operatorCheck == "+" ||
        operatorCheck == "-" ||
        operatorCheck == "*" ||
        operatorCheck == "/" ||
        operatorCheck == "^") {
            return true;
    }
    return false;
}

function getCurrentNumber(string) {
    let parts = string.split(" ");
    return parts[parts.length - 1]
}