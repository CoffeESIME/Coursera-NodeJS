var rect =require('./rectangle.js')


function solveRect(l,b){
    console.log(`Solving for rectangle with ${l} and b ${b}`)
    if (l<=0||b<=0){
        console.log(`Rectangle dimension should be greater than zero 0`)
    }
    else {
        console.log(`The area of the rectangle is ${rect.area(l,b)}`)
        console.log(`The perimeter of the rectangle is ${rect.perimeter(l,b)}`)
    }
}
solveRect(4,5)