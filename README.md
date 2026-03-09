1️⃣ What is the difference between var, let, and const?
Answer: 
Feature-->      var,              let,        const
Scope-->    Function scope,  Block scope,  Block scope
Reassignable-->  Yes,              Yes,         No
Hoisting--> Hoisted (initialized as undefined),  Hoisted (uninitialized/TDZ),  Hoisted (uninitialized/TDZ)


2️⃣ What is the spread operator (...)?
Answer: The spread operator "expands" an iterable (like an array or object) into individual elements.
Copying Arrays: const arr2 = [...arr1];
Merging: const combined = [...arr1, ...arr2];
Function Arguments: Passing an array as individual arguments to a function.

3️⃣ What is the difference between map(), filter(), and forEach()?
Answer: These are array methods that iterate over data, but they have different goals:
map(): Creates a new array by transforming every element of the original array.
filter(): Creates a new array containing only elements that pass a specific test (condition).
forEach(): Executes a function for each element. It returns undefined and is used for side effects (like logging or updating the DOM), not for creating new data.

4️⃣ What is an arrow function?
Answer: A shorter syntax for writing function expressions. They are not just about looks—they handle the this keyword differently.
Syntax: const add = (a, b) => a + b;
Key behavior: They do not have their own this binding; they inherit this from the surrounding (lexical) scope. This makes them perfect for callbacks where you want to keep the context of the parent object.

5️⃣ What are template literals?
Answer: Template literals are string literals that allow for embedded expressions and multi-line strings. You use backticks (`) instead of quotes.
Interpolation: You can put variables directly in the string using ${variable}.
Multi-line: You can hit "Enter" to create strings that span multiple lines without concatenation (+).
