import { observable, action, computed, autorun } from 'mobx';


// var temp = observable.array([{ name: 1 }], { deep: false });

var temp2 = observable({
    name: "test",
    info: {
        age: 13
    },
    arr: [],
}, {
    name: observable,
    info: observable.ref,
    arr: observable.shallow
});


// autorun(function() {
//     console.log('start');
//     temp.forEach(function(value) {
//         console.log(value.name);
//     });
//     console.log('end');
// });

// temp[0].name = 999;

// autorun(function() {
//     console.log('start--1');
//     console.log('info', temp2.info);
//     console.log('end---1');
// });

// autorun(function() {
//     console.log('start---2');
//     console.log('info', temp2.info);
//     console.log('end----2');
// }, {
//     onError() {
//         console.log('===ERROR2=====');
//     }
// });

temp2.info = {uuu:999};
