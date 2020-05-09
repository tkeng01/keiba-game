'use strict';

//オッズデータ
const ODDZ = {
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

//メッセージ
const TIMEOUT_MESSAGE = '時間切れ!';
const RESULT_MESSAGE = 'あなたの結果は・・・';
const INPUT_DISABLED = 'disabled';

//購入表示
const INITIAL_MONEY = 10000;
let money = INITIAL_MONEY;
const DISPLAY_MONEY = '￥' + money;
const TOTAL_MESSAGE = DISPLAY_MONEY + '\nGet!!';
document.getElementById('money').textContent = DISPLAY_MONEY;

//ゲーム終了処理
function finish() {
  clearInterval(INTERVAL);

  document.getElementById('result').classList.add('result');
  document.getElementById('no1').disabled = INPUT_DISABLED;
  document.getElementById('no2').disabled = INPUT_DISABLED;
  document.getElementById('no3').disabled = INPUT_DISABLED;
  document.getElementById('markClear').disabled = INPUT_DISABLED;
  document.getElementById('bet').disabled = INPUT_DISABLED;
  document.getElementById('buy').disabled = INPUT_DISABLED;
  document.getElementById('betClear').disabled = INPUT_DISABLED;
  document.getElementById('finish').disabled = INPUT_DISABLED;
  document.getElementById('exp').textContent = RESULT_MESSAGE;
  document.getElementById('total').textContent = TOTAL_MESSAGE;

  const diff = money - INITIAL_MONEY;
  let sign = '';
  if (diff > 0) {
    sign = '+';
  } 
  document.getElementById('diff').textContent = '収支は' + sign + '￥' + diff;
}

//制限時間
let minutes = 0;
let secounds = 0;
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
    finish();
    alert(TIMEOUT_MESSAGE);
    document.getElementById('timeOut').textContent = TIMEOUT_MESSAGE;
    }
  document.getElementById('timer').textContent = ('0' + minutes).slice(-2) + ':' + ('0' + secounds).slice(-2); 
}
const INTERVAL = setInterval(timer, 1000);

//印クリアボタン
document.getElementById('markClear').onclick = function() {
  let rate = document.winner.rate;
  for(let i = 0; i < rate.length; i++) {
    rate[i].checked = false;
  }
}

//購入ボタン
document.getElementById('buy').onclick = function() {
  let rate = document.winner.rate;
  let bet = document.winner.bet.value;
  let betMin = 100;

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
    if(bet < betMin) {
      alert('最低100円から購入できます');
    } else if(bet > money) {
      alert('賭金が足りません');
    } else {
      alert('100円単位で購入してください');
    }
  }
  if(money < betMin) {
    alert('残金がありません。GameOver・・・');
    location.href = 'file:///E:/js/keiba-game/gameover/gameover.html';
  }
  document.getElementById('money').textContent = DISPLAY_MONEY;
}

//金額クリアボタン
document.getElementById('betClear').onclick = function() {
  document.winner.bet.value = null;
}

//ゲーム終了ボタン
document.getElementById('finish').onclick = function() {
  finish();
}

//タイトルボタン
document.getElementById('title').onclick = function() {
  location.href = 'file:///E:/js/keiba-game/title/index.html';
}