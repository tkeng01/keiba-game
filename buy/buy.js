'use strict';

let rate = document.winner.rate;

let money = 10000;
document.getElementById('money').textContent = '￥' + money;

let oddz = {
  list: [
    {
      value:null,
    },
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

document.getElementById('buy').onclick = function () {
  //勝ち馬番号をランダムに生成
  let number = Math.round(Math.random() * (rate.length) + 1);
  let buy = confirm('購入しますか?');
  // 購入確認
  if(buy == true) {
    //購入金額を指定
    let i = 0;
    for(let j = 0; j < rate.length; j++) {
      if(rate[j].checked == true) {
        if(rate[j].value == number) {
          //当たり処理
          money = money + (money * oddz.list[j].value);
          // location.href = 'file:///E:/js/keiba-game/result/result.html'
        } else {
          //ハズレ処理
          money = money + (money * 0);
          // location.href = 'file:///E:/js/keiba-game/result/result.html'
        }
      } else {
        //チェック確認
        i ++;
      }
    }
    if(i == rate.length) {
      alert('買う馬を決めてください');
    }
  }
  document.getElementById('money').textContent = '￥' + money;
}

document.getElementById('clear').onclick = function () {
  for(let i = 0; i < rate.length; i++) {
      rate[i].checked = false;
  }
}

document.getElementById('title').onclick = function () {
  location.href = 'file:///E:/js/keiba-game/title/index.html'
}