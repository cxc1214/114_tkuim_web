// lab_score_calculator.js
// 以 prompt 取得五科成績，計算平均、等第與不及格警示

function toNumber(str) {
  var n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function gradeFrom(avg) {
  if (avg >= 90) return 'A';
  else if (avg >= 80) return 'B';
  else if (avg >= 70) return 'C';
  else if (avg >= 60) return 'D';
  else return 'F';
}

var name = prompt('請輸入姓名：');
if (!name) name = '同學';

var subjects = ['國文', '英文', '數學', '自然', '社會'];
var scores = [];

for (var i = 0; i < subjects.length; i++) {
  var s = toNumber(prompt('請輸入 ' + subjects[i] + ' 成績：'));
  scores.push(s);
}

var text = '';
if (scores.includes(null)) {
  text = '輸入有誤，請重新整理後再試。';
} else {
  var sum = 0;
  var hasFail = false;

  for (var i = 0; i < scores.length; i++) {
    sum += scores[i];
    if (scores[i] < 60) hasFail = true;
  }

  var avg = sum / scores.length;
  var grade = gradeFrom(avg);

  text = '姓名：' + name + '\n';
  for (var i = 0; i < subjects.length; i++) {
    text += subjects[i] + '：' + scores[i] + '\n';
  }
  text += '平均：' + avg.toFixed(2) + '\n';
  text += '等第：' + grade + '\n';
  if (hasFail) text += ' 有不及格科目！';
}

console.log(text);
document.getElementById('result').textContent = text;
