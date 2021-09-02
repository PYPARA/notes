# Working with Functions

## Item 18: Understand the Difference between Function, Method, and Constructor Calls

### Things to Remember
- ✦ Method calls provide the object in which the method property is looked up as their receiver.
- ✦ Function calls provide the global object (or undefined for strict func- tions) as their receiver. Calling methods with function call syntax is rarely useful.
- ✦ Constructors are called with new and receive a fresh object as their receiver.

## Item 19: Get Comfortable Using Higher-Order Functions

### Things to Remember
- ✦ Higher-order functions are functions that take other functions as arguments or return functions as their result.
- ✦ Familiarize yourself with higher-order functions in existing libraries.
- ✦ Learn to detect common coding patterns that can be replaced by higher-order functions.

## Item 20: Use call to Call Methods with a Custom Receiver

### Things to Remember
- ✦ Use the call method to call a function with a custom receiver.
- ✦ Use the call method for calling methods that may not exist on a given object.
- ✦ Use the call method for defining higher-order functions that allow clients to provide a receiver for the callback.


## Item 21: Use apply to Call Functions with Different Numbers of Arguments

### Things to Remember
- ✦ Use the apply method to call variadic functions with a computed array of arguments.
- ✦ Use the first argument of apply to provide a receiver for variadic methods.

## Item 22: Use arguments to Create Variadic Functions

### Things to Remember
- ✦ Use the implicit arguments object to implement variable-arity functions.
- ✦ Consider providing additional fixed-arity versions of the variadic functions you provide so that your consumers don’t need to use the apply method.

## Item 23: Never Modify the arguments Object

### Things to Remember
- ✦ Never modify the arguments object.
- ✦ Copy the arguments object to a real array using [].slice.call(arguments) before modifying it.

## Item 24: Use a Variable to Save a Reference to arguments

### Things to Remember
- ✦ Be aware of the function nesting level when referring to arguments. 
- ✦ Bind an explicitly scoped reference to arguments in order to refer to it from nested functions.

## Item 25: Use bind to Extract Methods with a Fixed Receiver

### Things to Remember
- ✦ Beware that extracting a method does not bind the method’s receiver to its object.
- ✦ When passing an object’s method to a higher-order function, use an anonymous function to call the method on the appropriate receiver.
- ✦ Use bind as a shorthand for creating a function bound to the appropriate receiver.

## Item 26: Use bind to Curry Functions

### Things to Remember
- ✦ Use bind to curry a function, that is, to create a delegating function with a fixed subset of the required arguments.
- ✦ Pass null or undefined as the receiver argument to curry a function that ignores its receiver.

## Item 27: Prefer Closures to Strings for Encapsulating Code

### Things to Remember
- ✦ Never include local references in strings when sending them to APIs that execute them with eval.
- ✦ Prefer APIs that accept functions to call rather than strings to eval.

## Item 28: Avoid Relying on the toString Method of Functions
