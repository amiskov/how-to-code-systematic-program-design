# How to Design Data
## Module Overview
Learning Goals:

- Be able to use the How to Design Data Definitions (HtDD) recipe to design data definitions for atomic data.
- Be able to identify problem domain information that should be represented as simple atomic data, intervals, enumerations, itemizations and mixed data itemizations.
- Be able to use the Data Driven Templates recipe to generate templates for functions operating on atomic data.
- Be able to use the How to Design Functions (HtDF) recipe to design functions operating on atomic data.

В процессе проектирования данных мы влияем и на функции, которые будут этими данными пользоваться.

## `cond` Expressions
`cond` упрощает написание условий, когда исходов больше, чем 2 (`if` обрабатывает только два). `cond` — multi-armed conditional.

Синтаксис:

```scheme
(cond [QUESTION ANSWER]
      [QUESTION ANSWER]
      [QUESTION ANSWER]
      ; ...
      [else ANSWER])
```

:::tip Стиль кода
В Лиспе скобочки `()` и `[]` эквивалентны, но по соглашению в `cond` используют квадратные.
:::

`QUESTION` и `ANSWER` — выражения. `QUESTION` должен возвращает Boolean. Последний вопрос можно заменить на `else` (будет `ANSWER` для всех прочих случаев).




