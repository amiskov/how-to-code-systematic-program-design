

const assert = require('assert');

// Number -> Number
// Возвращает число, умноженное на 2
// const double = n => 0 // заглушка
// const double = n => ... n; // шаблон
const double = n => n * 2; // решение

// Примеры вызова и тесты
assert.equal(double(2), 4)
assert.equal(double(4.2), 8.4)


