# Chapter4: Objects and Prototypes

## Item 30: Understand the Difference between prototype, getPrototypeOf, and __proto__

### Things to Remember
- ✦ C.prototype determines the prototype of objects created by new C(). 
- ✦ Object.getPrototypeOf(obj) is the standard ES5 function for retrieving the prototype of an object.
- ✦ obj.__proto__ is a nonstandard mechanism for retrieving the prototype of an object.
- ✦ A class is a design pattern consisting of a constructor function and an associated prototype.

## Item 31: Prefer Object.getPrototypeOf to __proto__

### Things to Remember
✦ Prefer the standards-compliant Object.getPrototypeOf to the non-standard __proto__ property.
✦ Implement Object.getPrototypeOf in non-ES5 environments that support __proto__.

## Item 32: Never Modify __proto__

### Things to Remember
- ✦ Never modify an object’s __proto__ property.
- ✦ Use Object.create to provide a custom prototype for new objects.

## Item 33: Make Your Constructors new-Agnostic

### Things to Remember
- ✦ Make a constructor agnostic to its caller’s syntax by reinvoking itself with new or with Object.create.
- ✦ Document clearly when a function expects to be called with new.

## Item 34: Store Methods on Prototypes

### Things to Remember
- ✦ Storing methods on instance objects creates multiple copies of the functions, one per instance object.
- ✦ Prefer storing methods on prototypes over storing them on instance objects.

## Item 35: Use Closures to Store Private Data

### Things to Remember
- ✦ Closure variables are private, accessible only to local references.
- ✦ Use local variables as private data to enforce information hiding within methods.

## Item 36: Store Instance State Only on Instance Objects


