import interpret from "../interpret";
import dummyIOHandler from "../io/dummyIOHandler";
import replEnv from "../replEnv";
import toString from "./toString";

interface ITestCase {
  input: string;
  expectedOutput: string;
  printable?: boolean;
}

// tslint:disable:object-literal-sort-keys
const testCases: ITestCase[] = [
  { input: "true", expectedOutput: "true" },
  { input: "false", expectedOutput: "false" },
  {
    input: `(lambda () (list true (lambda (x) (* x x)) + 3.14 'pi "pi"))`,
    expectedOutput: `(lambda () (list true (lambda (x) (* x x)) + 3.14 (quote pi) "pi"))`,
  },
  { input: "+", expectedOutput: "+" },
  {
    input: `(list true (lambda (x) (* x x)) + 3.14 'pi "pi")`,
    expectedOutput: `(true (lambda (x) (* x x)) + 3.14 pi "pi")`,
  },
  { input: "nil", expectedOutput: "nil" },
  { input: "3.14", expectedOutput: "3.14" },
  { input: "'pi", expectedOutput: "pi" },
  // ChipmunkString test cases (printable = false)
  { input: `"test"`, expectedOutput: `"test"`, printable: false },
  { input: `"test\\ntest"`, expectedOutput: `"test\\ntest"`, printable: false },
  { input: `"\\"test\\""`, expectedOutput: `"\\"test\\""`, printable: false },
  { input: `"\\\\test\\\\"`, expectedOutput: `"\\\\test\\\\"`, printable: false },
  // ChipmunkString test cases (printable = true)
  { input: `"test"`, expectedOutput: `test`, printable: true },
  { input: `"test\\ntest"`, expectedOutput: `test\ntest`, printable: true },
  { input: `"\\"test\\""`, expectedOutput: `"test"`, printable: true },
  { input: `"\\\\test\\\\"`, expectedOutput: `\\test\\`, printable: true },
];
// tslint:enable:object-literal-sort-keys

testCases.forEach((testCase: ITestCase) => {
  test(`\`${testCase.input}\` => \`${testCase.expectedOutput}\` (printable = ${testCase.printable})`, () => {
    const actualOutput: string = toString(interpret(testCase.input, replEnv, dummyIOHandler), testCase.printable);
    expect(actualOutput).toEqual(testCase.expectedOutput);
  });
});
