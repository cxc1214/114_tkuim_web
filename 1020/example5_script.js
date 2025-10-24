// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表，並可自訂範圍


var start = parseInt(prompt('請輸入乘法起始數（1~9）：'), 10);
var end = parseInt(prompt('請輸入乘法結束數（1~9）：'), 10);


if (isNaN(start) || isNaN(end) || start < 1 || end > 9 || start > end) {
  document.getElementById('result').textContent = '輸入範圍無效，請輸入 1 到 9 之間的整數，且起始值需小於等於結束值。';
} else {
  var output = '';

  for (var i = start; i <= end; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + 'x' + j + '=' + (i * j) + '\t';
    }
    output += '\n';
  }

  document.getElementById('result').textContent = output;
}
