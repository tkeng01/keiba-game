'use strict';

let rate = document.winner.rate;

document.getElementById('buy').onclick = function () {
  // 0-2をランダムに生成
  let number = Math.round(Math.random() * (rate.length -1));
  let buy = confirm('購入しますか?');
  // 購入確認
  if(buy == true) {
    for(let i = 0; i < rate.length; i++) {
      if(rate[i].checked == true) {
        if(rate[i].value == number) {
          console.log('当たり');
          console.log(number);
        } else {
          console.log('はずれ');
          console.log(number);
        }
      } 
    }
  }
  // location.href = 'file:///E:/js/keiba-game/result/result.html'
}


document.getElementById('clear').onclick = function () {
  for(let i = 0; i < rate.length; i++) {
      rate[i].checked = false;
  }
}

document.getElementById('title').onclick = function () {
  location.href = 'file:///E:/js/keiba-game/title/index.html'
}