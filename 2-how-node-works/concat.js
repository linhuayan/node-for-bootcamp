const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let inArr = [];
rl.on('line', (line) => {
  if (!line) return;
  inArr.push(line);
  if (inArr.length === 2) {
    let list1 = inArr[0].split(' ').map(num => +num);
    let list2 = inArr[1].split(' ').map(num => +num);
    let res = [...list1, ...list2];
    res.sort((a, b) => a - b);
    console.log(res.join(' '));
  }
})