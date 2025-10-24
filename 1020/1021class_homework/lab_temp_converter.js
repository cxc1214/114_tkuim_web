// lab_temp_converter.js
// 攝氏 ↔ 華氏 溫度轉換

var valueStr = prompt('請輸入溫度數值：');
var unit = prompt('請輸入單位（C 或 F）：');
var value = parseFloat(valueStr);
var text = '';

if (isNaN(value) || !unit) {
  text = '輸入錯誤，請重新整理重試。';
} else {
  unit = unit.toUpperCase();
  if (unit === 'C') {
    var f = value * 9 / 5 + 32;
    text = value + '°C = ' + f.toFixed(2) + '°F';
  } else if (unit === 'F') {
    var c = (value - 32) * 5 / 9;
    text = value + '°F = ' + c.toFixed(2) + '°C';
  } else {
    text = '單位輸入錯誤，請輸入 C 或 F。';
  }
}

alert(text);
document.getElementById('result').textContent = text;
