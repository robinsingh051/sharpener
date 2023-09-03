"use strict";
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const btn = document.querySelector("button");
const numResults = [];
const tectResult = [];
btn.addEventListener("click", () => {
    const n1 = num1.value;
    const n2 = num2.value;
    const res = add(+n1, +n2);
    console.log(res);
    numResults.push(res);
    const stringRes = add(n1, n2);
    console.log(stringRes);
    tectResult.push(stringRes);
    //console.log(add(true,false));
    printResult({ val: res, timestamp: new Date() });
    console.log(numResults, tectResult);
});
function printResult(resultObj) {
    console.log(resultObj.val);
}
function add(num1, num2) {
    if (typeof num1 == "number" && typeof num2 == "number")
        return num1 + num2;
    if (typeof num1 == "string" && typeof num2 == "string")
        return num1 + " " + num2;
    else
        return +num1 + +num2;
}
console.log(add(1, 6));
//console.log(add("1", "6"));
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("it worked");
    }, 1000);
});
myPromise.then((res) => {
    console.log(res.split("w"));
});
