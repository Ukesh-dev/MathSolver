import {
  EXPONENT_REGEX,
  ADD_SUBTRACT_REGEX,
  INCORRECT_EXPO,
  MULTIPLY_DIVIDE_REGEX,
  PARENTHESIS_REGEX,
} from "./constants.js";
import { RegExpGroups } from "./types.js";

const inputElement = document.getElementById("equation") as HTMLInputElement;
const outputElement = document.querySelector(".results") as HTMLDivElement;
const form = document.getElementById("equation-form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = parseEquation(inputElement.value);
  if (result === undefined) {
    outputElement.textContent = "please enter valid expression";
  } else {
    outputElement.textContent = `${result}`;
  }
});

function parseEquation(equation: string): number | undefined {
  if (equation.match(PARENTHESIS_REGEX)) {
    const subEquation: RegExpGroups<["equation"]> | undefined =
      equation.match(PARENTHESIS_REGEX);
    if (subEquation?.groups?.equation) {
      const result: number | undefined = parseEquation(
        subEquation?.groups?.equation
      );
      const newEquation = equation.replace(PARENTHESIS_REGEX, `${result}`);
      if (newEquation.match(INCORRECT_EXPO)) {
        return parseFloat("undefined");
      }
      return parseEquation(newEquation);
    }
    return undefined;
  } else if (equation.match(EXPONENT_REGEX)) {
    const result = handleMath(equation.match(EXPONENT_REGEX));
    const newEquation = equation.replace(EXPONENT_REGEX, `${result}`);
    return parseEquation(newEquation);
  } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX));
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, `${result}`);
    return parseEquation(newEquation);
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX));
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, `${result}`);
    return parseEquation(newEquation);
  } else {
    if (equation.match(INCORRECT_EXPO)) {
      return parseFloat("undefined");
    }
    return parseFloat(equation);
  }
}
function handleMath(
  value: RegExpGroups<["operand1", "operand2", "operation"]>
) {
  if (value && value.groups) {
    const { operand1, operand2, operation } = value.groups;
    const number1: number = parseFloat(operand1);
    const number2 = parseFloat(operand2);
    switch (operation) {
      case "^":
        return number1 ** number2;
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
