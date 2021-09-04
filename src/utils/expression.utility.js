const OPERATORS = ['+', '-', '*', '/']

/**
 * Parse a random expression with format a+b=
 *
 * @param {string} Expression formatted as a+b=
 * @return {array} array container expression and its parts
 */
const parser = (expression) => {
    //Regex to parse the expression formatted as a+b=
    const regex = /^([\-]{0,1}\d*)([\+\-\*\/])([\-]{0,1}\d*)\=$/
    return regex.exec(expression)
}

/**
 * Compute a random expression with format a+b= and return the result
 *
 * @param {string} Expression formatted as a+b=
 * @return {number} Solution to the parsed expression
 */
const compute = (expression) => {
    const parsed = parser(expression)
    const op = parsed[2]
    const a = parseInt(parsed[1])
    const b = parseInt(parsed[3])

    switch(op) {
        case '+':
            return a + b
            break;
        case '-':
            return a - b
            break;
        case '*':
            return a * b
            break;
        case '/':
            return a / b
            break;
        default:
            // Handle invalid operator
            throw new Error('Invalid operator: Must be +, -, *, /');
    }
}

/**
 * Generate a random expression with format a+b=
 * between 1 and 100
 * @return {string} Expression with format a+b=
 */
const generate = () => {
    const a = between(1, 100)
    const b = between(1, 100)
    const op = OPERATORS[between(0, 3)]
    return a + op + b + '='
} 

/**
 * Generate a random integer between two values
 * @param  {int} minimum value
 * @param  {int} maximum value
 * @return {int} random integer
 */
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}
  
module.exports = { generate, parser, compute, OPERATORS }