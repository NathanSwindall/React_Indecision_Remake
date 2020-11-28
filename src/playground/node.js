const myArr = [1,2,3,4,5]
myArr.filter((x) => x !== 3)

//this is different from

myArr.filter((x) => {x !== 3})

// and 
myArr.filter((x) => {return x !== 3}) // This is the same as the first