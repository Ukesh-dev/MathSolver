/* eslint-disable no-var */
// ? For only digits with negative numbers
//   /(?<operand1>[-\d]+)\s*(?<operation>[+-])\s*(?<operand2>[-\d]+)/;
// ? For the scientific numbers
// (?<!) Negative LookBack for edge cases (only for Addition for subraction);
//(2 + 3 * (2+ 3) * (2+ 3))
//(2 + 3 * (2+ (3^)) * (2+ 3))
export const ADD_SUBTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<!e)(?<operation>[+-])\s*(?<operand2>\S+)/;
export const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[/*])\s*(?<operand2>\S+)/;
export const EXPONENT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[\^])\s*(?<operand2>\S+)/;

export const PARENTHESIS_REGEX = /\((?<equation>[^()]*)\)/;
export const INCORRECT_EXPO = /d*\^/;
