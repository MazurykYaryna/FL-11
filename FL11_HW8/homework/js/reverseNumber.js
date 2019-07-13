const reverseNumbers = (number) => {
    const currentNumber = +Math.abs(number).toString()
        .split('')
        .reverse()
        .join('');
    return number > 0 ? currentNumber : -currentNumber;
};

reverseNumbers(-457);


