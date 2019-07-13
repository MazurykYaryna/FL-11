function addOne(x) {
    return x + 1;
}
function pipe(number) {
    let addNumber = number;
    for (let i = 1; i < arguments.length; i++) {
        addNumber = addOne(addNumber)
    }
    return addNumber
}

pipe(1, addOne, addOne);