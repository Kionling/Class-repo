// Mixins
// We can use mixins to do multiple inheritance in JavaScript. Mixins are templates for creating classes. We need mixins to do multiple inheritance because JavaScript classes can only inherit from one super class, so multiple inheritance isn’t possible.
// For example, if we have a base class, we can define mixins to incorporate the members from multiple classes into one by composing the mixins by calling one and then pass the returned result into the next one as the argument, and so on, like the following:


//In the code below, we have the Base class which we pass into the classBMixin to get the b function into the Base class, then we call the classAMixin by passing in the result of classBMixin(Base) into the argument of the classAMixin to return the a function from classAMixin into the Base class and then return the whole class with all the functions from all the classes incorporated into one.
// If we call all the functions above like we did by creating an instance of the Bar object and then call the baseFn, a, and b functions, we get:
// baseFn called
// classAMixin called
// classBMixin called


class Base {
  baseFn() {
    console.log('baseFn called');
  }
}
let classAMixin = Base => class extends Base {
  a() {
    console.log('classAMixin called');
  }
};

let classBMixin = Base => class extends Base {
  b() {
    console.log('classBMixin called');
  }
};

class Bar extends classAMixin(classBMixin(Base)) {}
const bar = new Bar();
bar.baseFn()
bar.a()
bar.b()