# Chapter2: Variable Scope

## Item 8: Minimize Use of the Global Object

### Things to Remember
- ✦ Avoid declaring global variables.
- ✦ Declare variables as locally as possible.
- ✦ Avoid adding properties to the global object.
- ✦ Use the global object for platform feature detection.

## Item 9: Always Declare Local Variables

### Things to Remember
- ✦ Always declare new local variables with var.
- ✦ Consider using lint tools to help check for unbound variables.

## Item 10: Avoid with

### Things to Remember
- ✦ Avoid using with statements.
- ✦ Use short variable names for repeated access to an object.
- ✦ Explicitly bind local variables to object properties instead of implic- itly binding them with a with statement.

## Item 11: Get Comfortable with Closures

1. JavaScript allows you to refer to variables that were defined outside of the current function
```js
function makeSandwich() {
  var magicIngredient = "peanut butter"; 
  function make(filling) {
    return magicIngredient + " and " + filling; 
  }
  return make("jelly"); 
}
makeSandwich(); // "peanut butter and jelly"
```
2. functions can refer to variables defined in outer functions even after those outer functions have returned
JavaScript functions are first- class objects, That means that you can return an inner function to be called sometime later on

```js
function sandwichMaker() {
  var magicIngredient = "peanut butter"; 
  function make(filling) {
    return magicIngredient + " and " + filling; 
  }
  return make; 
}
var f = sandwichMaker();
f("jelly"); // "peanut butter and jelly"
f("bananas"); // "peanut butter and bananas" 
f("marshmallows"); // "peanut butter and marshmallows"
```

3. Closures actually store refer- ences to their outer variables, rather than copying their values. So updates are visible to any closures that have access to them
```js
function box() {
  var val = undefined; 
  return {
    set: function(newVal) { val = newVal; }, 
    get: function() { return val; },
    type: function() { return typeof val; }
  }; 
}
var b = box();
b.type(); // "undefined" 
b.set(98.6);
b.get(); // 98.6 
b.type(); // "number"
```

### Things to Remember
- ✦ Functions can refer to variables defined in outer scopes.
- ✦ Closures can outlive the function that creates them.
- ✦ Closures internally store references to their outer variables, and can both read and update their stored variables.

## Item 12: Understand Variable Hoisting

### Things to Remember
- ✦ Variable declarations within a block are implicitly hoisted to the top of their enclosing function.
- ✦ Redeclarations of a variable are treated as a single variable.
- ✦ Consider manually hoisting local variable declarations to avoid confusion.

## Item 13: Use Immediately Invoked Function Expressions to Create Local Scopes

### Things to Remember
- ✦ Understand the difference between binding and assignment.
- ✦ Closures capture their outer variables by reference, not by value.
- ✦ Use immediately invoked function expressions (IIFEs) to create local scopes.
- ✦ Be aware of the cases where wrapping a block in an IIFE can change its behavior.

## Item 14: Beware of Unportable Scoping of Named Function Expressions

### Things to Remember
- ✦ Use named function expressions to improve stack traces in Error objects and debuggers.
- ✦ Beware of pollution of function expression scope with Object .prototype in ES3 and buggy JavaScript environments.
- ✦ Beware of hoisting and duplicate allocation of named function expressions in buggy JavaScript environments.
- ✦ Consider avoiding named function expressions or removing them before shipping.
- ✦ If you are shipping in properly implemented ES5 environments, you’ve got nothing to worry about.

## Item 15: Beware of Unportable Scoping of Block-Local Function Declarations

### Things to Remember
- ✦ Always keep function declarations at the outermost level of a program or a containing function to avoid unportable behavior.
- ✦ Use var declarations with conditional assignment instead of conditional function declarations.

## Item 16: Avoid Creating Local Variables with eval

### Things to Remember
- ✦ Avoid creating variables with eval that pollute the caller’s scope.
- ✦ If eval code might create global variables, wrap the call in a nested function to prevent scope pollution.

## Item 17: Prefer Indirect eval to Direct eval

### Things to Remember
- ✦ Wrap eval in a sequence expression with a useless literal to force the use of indirect eval.
- ✦ Prefer indirect eval to direct eval whenever possible.