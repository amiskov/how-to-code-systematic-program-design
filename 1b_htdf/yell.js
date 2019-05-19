// String -> String
// Produce given word with exclamation mark at the end.
console.assert(yell("hello") === "hello!", "Hello test");
console.assert(yell("fuck") === "fuck!", "Fuck test");

// function yell(word) {
//     return "!";
// }

// function yell(word) {
//     // ... word
// }

function yell(word) {
    return word + '!';
}