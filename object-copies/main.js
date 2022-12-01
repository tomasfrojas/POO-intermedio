// const obj1 = {
//   a: "a",
//   b: "b",
//   c: {
//     d: "d",
//     e: "e",
//   },
//   editA() {
//     this.a = "AAAAAAAAAAAAA";
//   },
// };

// const obj2 = {};
// for (prop in obj1) {
//   obj2[prop] = obj1[prop];
// }

// const obj3 = Object.assign({}, obj1);
// const obj4 = Object.create(obj1); //las copias originales o los cambios que se le hagan a obj1 si afectan a obj4, pero los cambios que se le hagan a obj4 no afectan a obj1 a excepcion de los cambios que hagamos en obj4 en los objetos dentro de los objetos (nested objects), es decir si hacemos un cambio de obj4.c.d = 'aaaaaa', en obj1 la propiedad obj1.c.d = 'aaaaaa' tambien.

// const stringifiedComplexObj = JSON.stringify(obj1); // se crea un string apartir de un objeto.

// const obj2 = JSON.parse(stringifiedComplexObj); // creamos un objeto apartir de un string.

//estos dos metodos de stringify y parse no saben trabajar con metodos ni funciones dentro de los objetos es por eso que no realizan las copias de los metodos.

//RECURSIVIDAD

// const numeritos = [
//   0, 1, 2, 3, 4, 5, 6, 7, 8, 98, 4, 2, 345, 2455, 2456232, 455, 4, 6, 7, 6, 4,
//   4, 76, 7,
// ];
// let numerito = 0;
// for (let index = 0; index < numeritos.length; index++) {
//   numerito = numeritos[index];
//   console.log({ index, numerito });
// }

// function recursiva(numbersArray) {
//   if (numbersArray.length !== 0) {
//llamados recursivos
//     const firstNum = numbersArray[0];
//     console.log(firstNum);

//     numbersArray.shift();
//     recursiva(numbersArray);
//   }
// }

function isObject(subject) {
  return typeof subject == "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function deepCopy(subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject;
}

// const obj2 = deepCopy(obj1);

// const studentBase = {
//   name: undefined,
//   email: undefined,
//   age: undefined,
//   approvedCourses: undefined,
//   learningPaths: undefined,
//   socialMedia: {
//     twiter: undefined,
//     instagram: undefined,
//     facebook: undefined,
//   },
// };

// const tomas = deepCopy(studentBase);
// Object.seal(tomas);
// Object.isSealed(tomas);// verificar si todas las propiedades tienen el configurable:false (no se puede eliminar).

// Object.isFrozen(tomas)//  verifica si todas las propiedades tienen el configurable y writable: false.

// Object.defineProperty(tomas, "name", {
//   value: "Tomas Felipe",
//   configurable: false,
// });

//FACTORY PATTERN Y RORO (recieve object, return object)

function SuperObject() {}

SuperObject.isObject = function (subject) {
  return typeof subject == "object";
};

SuperObject.deepCopy = function (subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject;
};

function requiredParam(param) {
  throw new Error(`${param} es obligatorio `);
}

function LearningPath({ name = requiredParam("name"), courses = [] }) {
  this.name = name;
  this.courses = courses;
}

// function createLearningPath({ name = requiredParam("name"), courses = [] }) {
//   const private = {
//     _name: name,
//     _courses: courses,
//   };
//   const public = {
//     get name() {
//       return private["_name"];
//     },
//     set name(newName) {
//       if (newName.length != 0) {
//         private["_name"] = newName;
//       } else {
//         console.warn("Tu nombre debe tener al menos 1 caracter");
//       }
//     },

//     get courses() {
//       return private["_courses"];
//     },
//   };

//   return public;
// }

function Student({
  name = requiredParam("name"),
  email = requiredParam("email"),
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) {
  this.name = name;
  this.email = email;
  this.age = age;
  this.approvedCourses = approvedCourses;
  this.socialMedia = {
    twitter,
    instagram,
    facebook,
  };

  const private = {
    _learningPaths: [],
  };

  Object.defineProperty(this, "learningPaths", {
    get() {
      return private["_learningPaths"];
    },

    set(newLP) {
      if (newLP instanceof LearningPath) {
        private["_learningPaths"].push(newLP);
      } else {
        console.warn(
          "Alguno de los learningPaths no es una instancia del prototipo LearningPath "
        );
      }
    },
  });

  for (learningPathIndex in learningPaths) {
    this.learningPaths = learningPaths[learningPathIndex];
  }
}
// function createStudent({
//   name = requiredParam("name"),
//   email = requiredParam("email"),
//   age,
//   twitter,
//   instagram,
//   facebook,
//   approvedCourses = [],
//   learningPaths = [],
// } = {}) {
//   const private = {
//     _name: name,
//     _learningPaths: learningPaths,
//   };

//   const public = {
//     email,
//     age,
//     approvedCourses,

//     socialMedia: {
//       twitter,
//       instagram,
//       facebook,
//     },

//     get name() {
//       return private["_name"];
//     },
//     set name(newName) {
//       if (newName.length != 0) {
//         private["_name"] = newName;
//       } else {
//         console.warn("Tu nombre debe tener al menos 1 caracter");
//       }
//     },

//     get learningPaths() {
//       return private["_learningPaths"];
//     },
//     set learningPaths(newLP) {
//       if (!newLP.name) {
//         console.warn("Tu Learning Path no tiene la propiedad name ");
//         return;
//       }

//       if (!newLP.courses) {
//         console.warn("Tu Learning Path no tiene courses ");
//         return;
//       }
//       if (!isArray(newLP.courses)) {
//         console.warn("Tu Learning Path no es una lista (de cursos) ");
//         return;
//       }

//       private["_learningPaths"].push(newLP);
//     },
//   };

//   return public;
// }

// const tomas = createStudent({
//   name: "Tomas Felipe",
//   age: 30,
//   email: "tomas@gmail.com",
//   twitter: "tompirojas",
// });

const escuelaWeb = new LearningPath({
  name: "Escuela de Desarrollo Web",
});
const escuelaData = new LearningPath({
  name: "Escuela de Data Science",
});
const tomas = new Student({
  name: "Tomas Felipe",
  email: "tomas@gmail.com",
  learningPaths: [escuelaWeb, escuelaData],
});
