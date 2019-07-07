let A = +prompt('Please enter length AB', '1');
let B = +prompt('Please enter length BC', '1');
let C = +prompt('Please enter length CA', '1');

if ( A + B > C || A + C > B || C + B > A) {
    if (A===B && A===C && B===C) {
        console.log('Eequivalent triangle');
    } else if (A===B && B !==C || A===C && A!==B || C===B && C!==A) {
        console.log('Isosceles triangle');
    } else {
        console.log('Normal triangle');
    }
} else {
    console.log('Triangle doesn’t exist');
}
