var rect = require("./rectangle.js");

function solveRect(l, b) {
  console.log(`Solving for rectangle with ${l} and b ${b}`);
  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log(`Error: ${err.message}`);
    } else {
      console.log(`The area of the rectangle with dimension l=
            ${l} and b = ${b} is ${rectangle.area()}`);
      console.log(`The perimeter of the rectangle with dimension l=
            ${l} and b = ${b} is ${rectangle.perimeter()}`);
    }
  });
  console.log("This statement is after the call of rectangle")
}
solveRect(4, 5);

solveRect(4, -3);
solveRect(3, 5);
solveRect(4, 2);
solveRect(0, 5);
