const tomas = {
  name: "Tomas Felipe",
  age: 30,
  approvedCourses: ["Curso 1"],
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  },
};

// console.log(Object.keys(tomas));
// console.log(Object.getOwnPropertyNames(tomas));
// console.log(Object.entries(tomas));

// Object.defineProperty(tomas, "navigator", {
//   value: "Chrome",
//   writable: true,
//   enumerable: false,// no me lo enlista en las propiedades.
//   configurable: true,
// });
// Object.defineProperty(tomas, "editor", {
//   value: "VSCode",
//   writable: false,// impide que podamos cambiarle las propiedades, pero si podemos borrarselas.
//   enumerable: true,
//   configurable: true,
// });
// Object.defineProperty(tomas, "terminal", {
//   value: "WSL",
//   writable: true,
//   enumerable: true,
//   configurable: false,// impide que podamos borrar propiedades.
// });
// Object.defineProperty(tomas, "pruebaNasa", {
//   value: "extraterrestres",
//   writable: false,
//   enumerable: false,
//   configurable: false,
// });

// Object.seal(tomas);// nos ayuda a evitar que nuestras propiedades se puedan borrar. ponen todas las propiedades configurable:false.
Object.freeze(tomas); // pone las propiedades de configurable:false y writable:false. nos impide borrar o sobreescribir o editar las propiedades.

console.log(Object.getOwnPropertyDescriptors(tomas));
