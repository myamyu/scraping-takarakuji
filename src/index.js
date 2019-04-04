const loto7 = require('./loto7');
const loto6 = require('./loto6');
const fs = require('fs');
const path = require('path');
const distDir = path.resolve('dist');

// distディレクトリがなかったらつくっとこ
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

(async () => {
  const loto7Data = await loto7();
  const loto7Stream = fs.createWriteStream(path.resolve(distDir, 'loto7.jsonl'), 'utf8');
  loto7Data.forEach((row) => {
    loto7Stream.write(`${JSON.stringify(row)}\n`);
  });
  loto7Stream.end();

  const loto6Data = await loto6();
  const loto6Stream = fs.createWriteStream(path.resolve(distDir, 'loto6.jsonl'), 'utf8');
  loto6Data.forEach((row) => {
    loto6Stream.write(`${JSON.stringify(row)}\n`);
  });
  loto6Stream.end();
})();
