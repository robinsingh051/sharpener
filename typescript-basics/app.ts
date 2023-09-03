const num1 = document.getElementById("num1") as HTMLInputElement;
const num2 = document.getElementById("num2") as HTMLInputElement;
const btn = document.querySelector("button")!;

const numResults: Array<number> = [];
const tectResult: string[] = [];

type numOrString = number | string;
type Result = { val: number; timestamp: Date };

interface resultObj {
  val: number;
  timestamp: Date;
}

btn.addEventListener("click", () => {
  const n1 = num1.value;
  const n2 = num2.value;
  const res = add(+n1, +n2);
  console.log(res);
  numResults.push(res as number);
  const stringRes = add(n1, n2);
  console.log(stringRes);
  tectResult.push(stringRes as string);
  //console.log(add(true,false));
  printResult({ val: res as number, timestamp: new Date() });
  console.log(numResults, tectResult);
});

function printResult(resultObj: resultObj) {
  console.log(resultObj.val);
}

function add(num1: numOrString, num2: numOrString) {
  if (typeof num1 == "number" && typeof num2 == "number") return num1 + num2;
  if (typeof num1 == "string" && typeof num2 == "string")
    return num1 + " " + num2;
  else return +num1 + +num2;
}

console.log(add(1, 6));
//console.log(add("1", "6"));

const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("it worked");
  }, 1000);
});
myPromise.then((res) => {
  console.log(res.split("w"));
});
