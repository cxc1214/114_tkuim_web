// lab_guess_number.js
// 猜數字遊戲：1~100

var answer = Math.floor(Math.random() * 100) + 1;
var count = 0;
var guess;
var text = '';

// 使用 while 反覆猜
while (true) {
  var input = prompt('請猜一個 1~100 的數字：');
  if (input === null) {
    text = '遊戲取消。';
    break;
  }

  guess = parseInt(input);
  count++;

  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert('請輸入 1~100 之間的整數！');
    continue;
  }

  if (guess === answer) {
    text = '恭喜猜中！答案是 ' + answer + '\n'
         + '共猜了 ' + count + ' 次。';
    alert(text);
    break;
  } else if (guess < answer) {
    alert('再大一點！');
  } else {
    alert('再小一點！');
  }
}

document.getElementById('result').textContent = text;
