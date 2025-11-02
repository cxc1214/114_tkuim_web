// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者

const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

function showValidity(input) {
  if (input.validity.valueMissing) {

    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確，請輸入學校email(@o365.tku.edu.tw)');
  } else {
    input.setCustomValidity('');
  }
  return input.reportValidity();
}

form.addEventListener('submit', (event) => {

  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);
  event.preventDefault();

  if (emailOk && phoneOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});

//   email.addEventListener('blur', () => {
//   showValidity(email);
// });

// phone.addEventListener('blur', () => {
//   showValidity(phone);
// });