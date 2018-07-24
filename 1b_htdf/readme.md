# How to Design Functions
:::tip Что значит дизайн
Design is the process of going from a poorly formed problem to a well structured solution.
:::

## Module Overview
Цель модуля:

- Научиться применять метод для создания функций, оперирующих простыми данными;
- Научиться читать функции и разбирать разные элементы их дизайна;
- Научиться проверять разные элементы функции на доступность, простоту, ясность и консистентность;
- Научиться определять, на сколько метод, по которому написана функция, решает задачу.

In English:

- Be able to use the How to Design Functions (HtDF) recipe to design functions that operate on primitive data.
- Be able to read a complete function design and identify its different elements.
- Be able to evaluate the different elements for clarity, simplicity and consistency with each other.
- Be able to evaluate the entire design for how well it solves the given problem.

## Speed HtDF Recipe
Рецепт помогает составить правильное представление о функции, которую нужно записать в виде кода. Его не нужно запоминать, но нужно научиться им пользоваться как референсом при проектировании функций. И выработать привычку к написанию продуманного кода.

Рецепт состоит из следующих шагов:

1. Signature, purpose and stub.
1. Define examples, wrap each in check-expect.
1. Template and inventory.
1. Code the function body.
1. Test and debug until correct

1. Сигнатура, назначение, заглушка.

**Сигнатура** — что функция принимает, что возвращает: `Number -> Number`. Все типы аргументов и тип возвращаемого значения: `Number, Number, Bool -> Number`.

**Назначение** (цель, описание) — _одна строка_, описывающая то, что функция возвращает с учетом того, что она принимает. Например: функция возвращает `n * 2` (принимает аргумент `n`, мы это учитываем в описании того, что она возвращает). Или так: возвращает аргумент, умноженный на 2. Плохое назначение будет похоже на сигнатуру: принимает число и возвращает число. Нужно более конкретно. Важно записать цель в одну строку, хотя иногда это бывает сложно. Тем не менее, усилия на формулировку однострочного назначения позволят лучше понять, что должна выполнять функция.

Сигнатура и строка всегда остаются закоменченными, поэтому их отделяют `;; `.

**Заглушка** должна иметь правильное имя функции, принимать нужное число параметров, возвращать заглушечный результат нужного типа (например, `0` для числе, `true` для булевых значений и т. д.).
`(define (double n)  0)`

**Примеры вызова и тесты**. Записываем примеры, обернутые в `(check-expect ...)`. Примеры позволят четко увидеть, что функция должна делать. Несколько примеров дадут более цельную картину, лучше покажут поведение функции. Оборачивание вызовов функции в `check-expect` заодно послужит юнит-тестами.

Саму функцию бывает гораздо проще написать имея под рукой примеры вызова и тесты.

Нужно не забывать использовать разные аргументы. Например, если функция принимает число, то числа могут быть отрицательными, десятичными дробями, нулем и т. д.

Заглушка нужна, чтобы проверить, что тесты написаны правильно и они могут быть запущены. Если сигнатуры верные, типы ожидаемых и возвращаемых величин совпадают. Это важно, потому что в сложных функциях вероятность допустить ошибки в тестах возрастает.

:::tip Правило
Чтобы понять, что написать в текущем шаге, нужно посмотреть, что уже записано в предыдущих.

Каждый записанный шаг помогает записать текущий. Сигнатура помогает написать назначение и заглушку, потому что указывает типы принимаемых и возвращаемого значений.

В примере сигнатура говорит о типе значений, а назначение говорит, что мы должны получить из входящего значения.
:::

**Инвентарь: шаблон и константы**. Тело шаблона — набросок функции (outline):

```scheme
(define (double n)
    (... n)) ; ... значит, что функция делает что-то с `n`
```

Заглушка — возвращает значение. Она нужна, чтобы проверить тесты. Как только тесты проверены, заглушку можно закоментить.

**Код для тела функции** на основе шаблона. Копишуем шаблон и пишем в нем код. Используем все, что было записано в предыдущих шагах.

Иногда помогает разбор записанных примеров. Разбивка их на составные части, чтобы более явно было видно, каки образом получается результат из той функции, которую нам нужно создать:

```scheme
(check-expect (double 4.2) 8.4)
(check-expect (double 4.2) 4.2 * 2)
```

Ага, понятно. Значит надо в теле функции делать `(* n 2)`.

Пример:

```scheme
;; Design a function that pluralizes a given word.
;; (Pluralize means to convert the word to its plural form.)
;; For simplicity you may assume that just adding s is enough to pluralize a word.

;; String -> String
;; Adds 's' to the end of passed string.
;; Produce the given string with "s" added to the end.
(check-expect (pluralize "hat") "hats")
(check-expect (pluralize "car") "cars")
 
; (define (pluralize w) "")

; (define (pluralize w)
;  (... w))

(define (pluralize w)
  (string-append w "s"))
```

> Sometimes a program we design doesn't work properly. The program might get an error or a test might fail. One useful skill in trying to find the problem is to scan over the design elements looking for inconsistencies. Does the purpose match the signature? Do the tests match the signature and purpose? Does the stub match what comes before it? Does the function header match the signature and purpose? Does the function body match the signature, purpose and tests?
> 
> Often times looking for an inconsistency between different parts of these is enough to find the bug and make it clear what needs to be fixed. 

Пример плохого описания (назначения).

Задача — дана сторона квадрата, нужно вычислить его площадь:

```scheme
;; Number -> Number
;; Принимает число, возвращает число.
```

Назначение повторяет сигнатуру. Назначение должно говорить более конкретные вещи об аргументе и о результате. Так будет лучше:

```scheme
;; Принимает длину стороны квадрата, возвращает его площадь.
```

Если тест провалился, это значит, что есть ошибка:

- или в определении функции;
- или в самом тесте (вызов функции или ожидаемый результат могут быть некорректны);
- и определение и тест некорректны.

Проверить нужно сначала тесты, а потом уже определение функции.

Рецепт HTDF — не waterfall process. То есть мы можем возвращаться назад на шаг или несколько шагов и исправлять те ошибки, которые допустили ранее. Сигнатуру неправильно написали, дошли до шаблона, заметили ошибку, вернулись и поправили — это норма.

Иногда может быть не ясна сигнатура и в этом случае можно начать с примеров, а к сигнатуре вернуться позже. **Только не надо сразу врываться в определение функции**, это похерит весь дизайн-процесс.

Когда пишем сигнатуру, нужно указывать самый специфичный, самый четкий тип, который возможен. Например, нужно посчитать площадь прямоугольника. Длина и ширина в Ракете задаются в пикселях, а они не могут быть десятичные или еще какие-то. Пиксели дискретны и могут быть только целочисленные (натуральные). Поэтому сигнатура будет не `Image -> Number`, а `Image -> Natural`:

```scheme
(require 2htdp/image)
;; Image -> Natural
;; Produces image's area (width * height).
(check-expect (image-area (rectangle 10 20 "solid" "red")) (* 10 20))
(check-expect (image-area (rectangle 22.2 33 "solid" "red")) (* 22 33)) ; pixels are always integers
; (define (image-area img) 0)
;(define (image-area img)
;  (... img))
(define (image-area img)
  (* (image-height img) (image-width img)))
```

## Проектирование предикатов
Когда нужно создать функцию, которая отвечает "да" или "нет", то описание (назначение, purpose) должно показывать, как нужно интерпретировать возвращаемое значение:

```scheme
;; Напишите функцию, которая определяет, является ли картинка высокой (tall).
(require 2htdp/image)
;; Image -> Boolean
;; Produces true if image is tall
```

:::tip
DrRacket автоматически проверяет покрытие кода тестами. Если в ифе подсвечивается какая-то ветка, значит для этого кейса не написан тест.

Тестов должно быть столько, сколько нужно для покрытия всего кода (всех вариантов его выполнения).
:::

## Проверка заданий
Оценка Poog, Fair, Great.

Commit ready:

- все хорошо отформатировано
- нет лишних ненужных комментариев
- нет лишнего вспомогательного кода (экспериментов в процессе решения)

Design Completeness: представлены все шаги HTDF-рецепта и все они валидны (тесты запускаются, нормально сформулированы сигнатура и назначение, есть заглушка и шаблон).

Internal Quality:

- HTDF составляющие должны быть корректны и понятны и соответствовать рецепту;
- Хорошо подобрано имя функции;
- Тесты должны проходить и покрытие кода должно быть полное.

Problem Satisfied:

- функция должна решать поставленную задачу;
- неопределенности в постановке задачи должны быть преодолены в процессе выполнения HTDF.

## Чтение кода
Аннотации по HTDF-рецепту позволяют быстрее понять код. Он становится более доступным:

```scheme
(require 2htdp/image)

;; cond-starter.rkt

(define I1 (rectangle 10 20 "solid" "red"))
(define I2 (rectangle 20 20 "solid" "red"))
(define I3 (rectangle 20 10 "solid" "red"))

;; Image -> String
;; produce shape of image, one of "tall", "square" or "wide"
(check-expect (aspect-ratio I1) "tall")
(check-expect (aspect-ratio I2) "square")
(check-expect (aspect-ratio I3) "wide")

;(define (aspect-ratio img) "")  ;stub

;(define (aspect-ratio img)      ;template
;  (... img))

(define (aspect-ratio img)  
  (cond [(> (image-height img) (image-width img)) "tall"]
        [(< (image-height img) (image-width img)) "wide"]
        [else "square"]))
```

