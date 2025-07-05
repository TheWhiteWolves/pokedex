import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "this is a really long message with words of different lengths",
    expected: ["this","is","a","really","long","message","with","words","of","different","lengths"]
  },
  {
    input: "this is L33T speak m1x 0f numb3r5 and l3773rs",
    expected: ["this","is","l33t","speak","m1x","0f","numb3r5","and","l3773rs"]
  },
  {
    input: "This Is A Mix Of Upper And Lower Casing",
    expected: ["this","is","a","mix","of","upper","and","lower","casing"]
  },
  {
    input: "(That'll be a $tring with Symbols) & other £things",
    expected: ["that'll","be","a","tring","with","symbols","other","things"],
  },
  {
    input: "",
    expected: []
  },
  {
    input: "          ",
    expected: []
  }
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the `toBe` function will fail the test if the values are not equal
      expect(actual[i]).toBe(expected[i]);
    }
  });
});