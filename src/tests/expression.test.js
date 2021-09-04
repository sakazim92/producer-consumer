const { generate, compute, parser, OPERATORS } = require('../utils/expression.utility')

describe('Expression Utility', () => {

  it('should generate a random expression of format a+b=', async () => {
    const expression = generate()
    const parsed = parser(expression) 
    expect(parsed).toHaveLength(4);
    expect(parsed[0]).toEqual(expression);
  });

  it('should always generate a unique expression of format a+b=', async () => {
    const expression1 = generate()
    const expression2 = generate()
    expect(expression1).not.toEqual(expression2);
  });

  it('should compute a mathematical expression of format a+b=', async () => {
    const solution = compute('10+9=')
    expect(solution).toEqual(19);
  });

  it('should parse a mathematical expression of format a+b=', async () => {
    const expression = generate()
    const parsed = parser(expression)
    expect(Number.isInteger(parseInt(parsed[1]))).toEqual(true)
    expect(OPERATORS.includes(parsed[2])).toEqual(true)
    expect(Number.isInteger(parseInt(parsed[3]))).toEqual(true)
  });
});
