const loadLoto7 = require('./loto7');
const fs = require('fs');
const path = require('path');
const distDir = path.resolve('dist');

// distディレクトリがなかったらつくっとこ
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

(async () => {
  const loto7Data = await loadLoto7();
  const loto7Stream = fs.createWriteStream(path.resolve(distDir, 'loto7.jsonl'), 'utf8');
  loto7Data.forEach((row) => {
    loto7Stream.write(`${JSON.stringify(row)}\n`);
  });
  loto7Stream.end();
})();
