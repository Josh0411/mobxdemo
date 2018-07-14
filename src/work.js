// console.log(self);

importScripts('subwork.js'); 

setTimeout(() => {

	self.postMessage(add(1,3));

	// throw new Error('test error');
  
}, 3000);

