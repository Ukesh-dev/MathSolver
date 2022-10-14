import { EXPONENT_REGEX, ADD_SUBTRACT_REGEX, INCORRECT_EXPO, MULTIPLY_DIVIDE_REGEX, PARENTHESIS_REGEX, } from "./constants.js";
var inputElement = document.getElementById("equation");
var outputElement = document.querySelector(".results");
var form = document.getElementById("equation-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var result = parseEquation(inputElement.value);
    if (result === undefined) {
        outputElement.textContent = "please enter valid expression";
    }
    else {
        outputElement.textContent = "".concat(result);
    }
});
function parseEquation(equation) {
    var _a, _b;
    if (equation.match(PARENTHESIS_REGEX)) {
        var subEquation = equation.match(PARENTHESIS_REGEX);
        if ((_a = subEquation === null || subEquation === void 0 ? void 0 : subEquation.groups) === null || _a === void 0 ? void 0 : _a.equation) {
            var result = parseEquation((_b = subEquation === null || subEquation === void 0 ? void 0 : subEquation.groups) === null || _b === void 0 ? void 0 : _b.equation);
            var newEquation = equation.replace(PARENTHESIS_REGEX, "".concat(result));
            if (newEquation.match(INCORRECT_EXPO)) {
                return parseFloat("undefined");
            }
            return parseEquation(newEquation);
        }
        return undefined;
    }
    else if (equation.match(EXPONENT_REGEX)) {
        var result = handleMath(equation.match(EXPONENT_REGEX));
        var newEquation = equation.replace(EXPONENT_REGEX, "".concat(result));
        return parseEquation(newEquation);
    }
    else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
        var result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX));
        var newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, "".concat(result));
        return parseEquation(newEquation);
    }
    else if (equation.match(ADD_SUBTRACT_REGEX)) {
        var result = handleMath(equation.match(ADD_SUBTRACT_REGEX));
        var newEquation = equation.replace(ADD_SUBTRACT_REGEX, "".concat(result));
        return parseEquation(newEquation);
    }
    else {
        if (equation.match(INCORRECT_EXPO)) {
            return parseFloat("undefined");
        }
        return parseFloat(equation);
    }
}
function handleMath(value) {
    if (value && value.groups) {
        var _a = value.groups, operand1 = _a.operand1, operand2 = _a.operand2, operation = _a.operation;
        var number1 = parseFloat(operand1);
        var number2 = parseFloat(operand2);
        switch (operation) {
            case "^":
                return Math.pow(number1, number2);
            case "*":
                return number1 * number2;
            case "/":
                return number1 / number2;
            case "+":
                return number1 + number2;
            case "-":
                return number1 - number2;
        }
    }
    return undefined;
}
