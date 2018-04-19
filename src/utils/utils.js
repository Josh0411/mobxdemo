 function add() {
    let arr = Array.prototype.slice.call(arguments);
    console.log(arr);
    return arr.reduce((previousValue, currentValue) => {
        return currentValue += previousValue;
    }, 90);
}

function linfeng () {
	console.log('linfeng');
}

export  {
	add,
	linfeng
};


