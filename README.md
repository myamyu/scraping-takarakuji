# scraping-takarakuji

宝くじのデータをjsonlで出力する

## loto 7

[loto 7過去の抽せん結果](http://www.takarakujinet.co.jp/loto7/index2.html)

| フィールド | 説明 | 型 |
|:-------|:---------|:-------|
| stage | 回号 | Number |
| date | 抽選日 | Date |
| main_nums | 抽せん数字の配列 | Number[] |
| main_num1-7 | 抽せん数字 | Number |
| bonus_num1-2 | ボーナス数字 | Number |

## loto 6

[loto 6過去の抽せん結果](http://www.takarakujinet.co.jp/loto6/index2.html)

| フィールド | 説明 | 型 |
|:-------|:---------|:-------|
| stage | 回号 | Number |
| date | 抽選日 | Date |
| main_nums | 抽せん数字の配列 | Number[] |
| main_num1-6 | 抽せん数字 | Number |
| bonus_num1 | ボーナス数字 | Number |
