//DOM manipulation
let screen = document.querySelector("#screen");
let result = screen.textContent;


let keyboard = document.querySelector("#keyboard");
keyboard.addEventListener("click", (event) => {
    switch (event.target.id) {
        case "1":
            result += "1";
            break;
        case "2":
            result += "2";
            break;
        case "3":
            result += "3";
            break;
        case "4":
            result += "4";
            break;
        case "5":
            result += "5";
            break;
        case "6":
            result += "6";
            break;
        case "7":
            result += "7";
            break;
        case "8":
            result += "8";
            break;
        case "9":
            result += "9";
            break;
        case "0":
            result += "0";
            break;
        case "plus":
            if (endsWithOperator(result)) {
                result = result.slice(0, -3) + " + ";
            }
            else if (calculate(result, "equal") != undefined) {
                result = calculate(result, "equal") + " + ";
            }
            else {
                result += " + ";
            }
            break;
        case "minus":
            if (endsWithOperator(result)) {
                result = result.slice(0, -3) + " - ";
            }
            else if (calculate(result, "equal") != undefined) {
                result = calculate(result, "equal") + " - ";
            }
            else {
                result += " - ";
            }
            break;
        case "multiplication":
            if (endsWithOperator(result)) {
                result = result.slice(0, -3) + " * ";
            }
            else if (calculate(result, "equal") != undefined) {
                result = calculate(result, "equal") + " * ";
            }
            else {
                result += " * ";
            }
            break;
        case "division":
            if (endsWithOperator(result)) {
                result = result.slice(0, -3) + " / ";
            }
            else if (calculate(result, "equal") != undefined) {
                result = calculate(result, "equal") + " / ";
            }
            else {
                result += " / ";
            }
            break;
        case "percent":
            result = calculate(result, event.target.id);
            break;
        case "clearE":
        case "clear":
            result = "";
            break;
        case "backspace":
            result = result.slice(0, -1);
            break;
        case "pow":
            if (endsWithOperator(result)) {
                result = result.slice(0, -3) + " ^ ";
            }
            else if (calculate(result) != undefined) {
                result = calculate(result) + " ^ ";
            }
            else {
                result += " ^ ";
            }
            break;
        case "sqrt":
            result =  `√(${result}) = ${sqrt(result)}`;
            break;
        case "sign":
        case "decimal":
            result += ".";
            break;
        case "equal":
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

function calculate(string, id) {
    let parsed = string.split(" ");

    let operand1 = +parsed[0];
    let operator = parsed[1];
    let operand2 = +parsed[2];

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