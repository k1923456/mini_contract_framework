const fs = require('fs');
const path = require('path');

const joinPath = (dir) => path.join(__dirname, dir);
const answer = fs.readFileSync(joinPath('../answer'));

const answerHex = Buffer.from(answer, 'utf-8').toString('hex');

fs.writeFileSync('./answerHex', answerHex);
console.log(answerHex);