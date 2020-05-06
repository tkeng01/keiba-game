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

//制限時間
let minutes;
let secounds;
let resetFlag = 0;

function timer() {
  resetFlag ++;
  if(resetFlag == 1) {
    //制限時間(分)を入力
    minutes = 2;
    //制限時間(秒)を入力
    secounds = 59;
  }
  secounds --;
  if(secounds == 0) {
    minutes --;
    secounds = 59;
  }

  //タイムアウト処理
  if(minutes == -1 && secounds == 59) {
    minutes =  0;
    secounds = 0;
    clearInterval(interval);
    alert('時間切れ!');

    document.getElementById('result').classList.add('result');
    document.getElementById('no1').disabled = 'disabled';
    document.getElementById('no2').disabled = 'disabled';
    document.getElementById('no3').disabled = 'disabled';
    document.getElementById('markClear').disabled = 'disabled';
    document.getElementById('bet').disabled = 'disabled';
    document.getElementById('buy').disabled = 'disabled';
    document.getElementById('betClear').disabled = 'disabled';
    document.getElementById('finish').disabled = 'disabled';
    document.getElementById('timeOut').textContent = '時間切れ!';
    document.getElementById('exp').textContent = 'あなたの結果は・・・';
    document.getElementById('total').textContent = '￥' + money + '\nGet!!';

    const initial = 10000;
    const diff = money - initial;
    let sign = '';
    if (diff > 0) {
      sign = '+';
    } 
    document.getElementById('diff').textContent = '収支は' + sign + '￥' + diff;
  }
  document.getElementById('timer').textContent = ('0' + minutes).slice(-2) + ':' + ('0' + secounds).slice(-2); 
}
const interval = setInterval(timer, 1000);

//印クリアボタン
document.getElementById('markClear').onclick = function() {
  let rate = document.winner.rate;
  for(let i = 0; i < rate.length; i++) {
    rate[i].checked = false;
  }
}
  
//購入
let money = 10000;
document.getElementById('money').textContent = '￥' + money;

document.getElementById('buy').onclick = function() {
  let rate = document.winner.rate;
  let bet = document.winner.bet.value;
  let BETMIN = 100;

  //勝ち馬番号をランダムに生成
  let number = Math.round(Math.random() * (rate.length) + 0.5);

  if (bet % 100 == 0 && bet != 0 && bet <= money) {
    let buy = confirm('購入しますか?');
    // 購入確認
    if(buy == true) {
      let j = 0;
      let hit = 0;
      for(let k = 0; k < rate.length; k++) {
        if(rate[k].checked == true) {
          money = money - bet;
          if(rate[k].value == number) {
            //当たり処理
            money = money + (bet * oddz.list[k].value);
            hit ++;
          } else {
            //ハズレ処理
            money = money + (bet * 0);
          }
        } else {
          //チェック確認
          j ++;
        }
      }
      if(hit == 1) {
        alert('的中！！');
        setTimeout(timer, 1000);
        resetFlag = 0;
      } else if(j == rate.length) {
        alert('買う馬を決めてください');
      } else {
        alert('不的中・・・');
        setTimeout(timer, 1000);
        resetFlag = 0;
      }
    }
  } else {
    if(bet < BETMIN) {
      alert('最低100円から購入できます');
    } else if(bet > money) {
      alert('賭金が足りません');
    } else {
      alert('100円単位で購入してください');
    }
  }
  if(money < BETMIN) {
    alert('残金がありません。GameOver・・・');
    location.href = 'file:///E:/js/keiba-game/gameover/gameover.html';
  }
  document.getElementById('money').textContent = '￥' + money;
}

//金額クリアボタン
document.getElementById('betClear').onclick = function() {
  document.winner.bet.value = null;
}

//ゲーム終了ボタン
document.getElementById('finish').onclick = function() {
  clearInterval(interval);

  document.getElementById('result').classList.add('result');
  document.getElementById('no1').disabled = 'disabled';
  document.getElementById('no2').disabled = 'disabled';
  document.getElementById('no3').disabled = 'disabled';
  document.getElementById('markClear').disabled = 'disabled';
  document.getElementById('bet').disabled = 'disabled';
  document.getElementById('buy').disabled = 'disabled';
  document.getElementById('betClear').disabled = 'disabled';
  document.getElementById('finish').disabled = 'disabled';
  document.getElementById('exp').textContent = 'あなたの結果は・・・';
  document.getElementById('total').textContent = '￥' + money + '\nGet!!';

  const initial = 10000;
  const diff = money - initial;
  let sign = '';
  if (diff > 0) {
    sign = '+';
  } 
  document.getElementById('diff').textContent = '収支は' + sign + '￥' + diff;
}

//タイトルボタン
document.getElementById('title').onclick = function() {
  location.href = 'file:///E:/js/keiba-game/title/index.html';
}