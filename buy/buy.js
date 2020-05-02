'use strict';

//オッズデータ
let oddz = {
  list: [
    {
      value:9.5,
    },
    {
      value:1.6,
    },
    {
      value:3.4,
    },
  ],
};

let rate = document.winner.rate;

//印クリアボタン
document.getElementById('markClear').onclick = function () {
  for(let i = 0; i < rate.length; i++) {
    rate[i].checked = false;
  }
}

let money = 10000;
document.getElementById('money').textContent = '￥' + money;

//購入処理
document.getElementById('buy').onclick = function () {
  //勝ち馬番号をランダムに生成
  let number = Math.round(Math.random() * (rate.length) + 0.5);
  let bet = document.winner.bet.value;

  if (bet % 100 == 0 && bet != 0) {
    let buy = confirm('購入しますか?');
    // 購入確認
    if(buy == true) {
      let j = 0;
      for(let k = 0; k < rate.length; k++) {
        if(rate[k].checked == true) {
          money = money - bet;
          if(rate[k].value == number) {
            //当たり処理
            alert('的中！');
            money = money + (bet * oddz.list[k].value);
          } else {
            //ハズレ処理
            alert('不的中・・・');
            money = money + (bet * 0);
          }
        } else {
          //チェック確認
          j ++;
        }
      }
    }
  } else {
    if(bet < 100) {
      alert('最低100円から購入できます');
    } else {
      alert('100円単位で購入してください');
    }
  }
  document.getElementById('money').textContent = '￥' + money;
}

//金額クリアボタン
document.getElementById('betClear').onclick = function () {
  document.winner.bet.value = null;
}

//タイトルボタン
document.getElementById('title').onclick = function () {
  location.href = 'file:///E:/js/keiba-game/title/index.html'
}