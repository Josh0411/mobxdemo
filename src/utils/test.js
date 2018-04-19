export function add() {
    let arr = Array.prototype.slice.call(arguments);
    console.log(arr);
    return arr.reduce((previousValue, currentValue) => {
        return currentValue += previousValue;
    }, 0);
}
