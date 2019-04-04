const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const url = 'http://www.takarakujinet.co.jp/ajax/loto7/pastResultPage.do';
const conf = {
  responseType: 'document',
};

const parse = (data) => {
  const res = [];
  const document = new JSDOM(data).window.document;
  const kekkaBody = document.querySelector('.kekka > tbody');

  // 不要なヘッダ行は消しておく
  let th;
  while(th = kekkaBody.querySelector('tr > th')) {
    kekkaBody.removeChild(th.parentNode);
  };
  const rows = kekkaBody.querySelectorAll('tr:nth-child(4n+1)');
  rows.forEach((row) => {
    const rowData = {};
    const matches1 = row.children[0].textContent.match(/第([0-9]+)回([0-9]{4})([0-9]{2})\/([0-9]{2})/);
    const matches2 = row.children[1].textContent.match(/(([0-9]{2}\s?){7})\(([0-9]{2})\)\s\(([0-9]{2})\)/);
    rowData.stage = +matches1[1];
    rowData.date = new Date(`${matches1[2]}/${matches1[3]}/${matches1[4]}`);
    rowData.main_nums = [];
    matches2[1].split(/\s/).forEach((num, i) => {
      rowData[`main_num${i + 1}`] = +num;
      rowData.main_nums.push(+num);
    });
    rowData.bonus_num1 = +matches2[3];
    rowData.bonus_num2 = +matches2[4];
    res.push(rowData);
  });

  return res;
};

const kekka = async (kaigou) => {
  let res = [];
  const params = new URLSearchParams();
  params.append('howmany', '100');
  params.append('searchway', 'kaigou');
  params.append('kaigou', kaigou);
  const kekkaPage = await axios.post(url, params, conf);
  res = res.concat(parse(kekkaPage.data));
  const lastStage = res[res.length - 1].stage;

  if (lastStage > 1) {
    res = res.concat(await kekka(lastStage - 1));
  }
  return res;
};

module.exports = async () => {
  let res = [];
  // 1ページ目はgetでとる
  const kekkaPage = await axios.get(url, conf);
  res = res.concat(parse(kekkaPage.data));
  const lastStage = res[res.length - 1].stage;
  if (lastStage > 1) {
    // 残りはpost
    res = res.concat(await kekka(lastStage - 1));
  }
  return res;
};
