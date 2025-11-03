document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const submitButton = document.getElementById('submitButton');
    const resetButton = document.getElementById('resetButton');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    const interestsContainer = document.getElementById('interestsContainer');

    const fields = ['name', 'email', 'phone', 'password', 'confirmPassword', 'terms'];
    const inputs = {};
    fields.forEach(id => inputs[id] = document.getElementById(id));
    inputs.interests = form.querySelectorAll('input[name="interests"]');

    const STORAGE_KEY = 'signupFormData';

 
    loadFromLocalStorage();
    setupEventListeners();


    function setupEventListeners() {

        form.addEventListener('focusout', handleValidationEvent);
        form.addEventListener('input', handleValidationEvent);

        form.addEventListener('submit', handleSubmit);
        resetButton.addEventListener('click', handleReset);


        passwordInput.addEventListener('input', () => updatePasswordStrength(passwordInput.value));
        form.addEventListener('input', () => saveToLocalStorage());
        
     
        interestsContainer.addEventListener('change', () => {
            validateField(interestsContainer.closest('fieldset'));
        });
    }

    function handleValidationEvent(event) {
        const target = event.target;
        if (target.id && fields.includes(target.id) || target.name === 'interests') {
            validateField(target);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!validateAllFields()) {
  
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
 
                if (firstInvalid.tagName === 'FIELDSET') {
                    firstInvalid.querySelector('input[type="checkbox"]').focus();
                } else {
                    firstInvalid.focus();
                }
            }
            return;
        }


        submitButton.classList.add('is-loading');
        submitButton.disabled = true;

        setTimeout(() => {
            alert('註冊成功！');
            localStorage.removeItem(STORAGE_KEY);
            handleReset(); 
        }, 1000);
    }

    function handleReset() {
        form.reset();

        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
 
        updatePasswordStrength('');
        localStorage.removeItem(STORAGE_KEY);
        submitButton.classList.remove('is-loading');
        submitButton.disabled = false;
    }


    function validateAllFields() {
        let isAllValid = true;
  
        [...Object.values(inputs), interestsContainer.closest('fieldset')].forEach(fieldOrNodeList => {
            const field = NodeList.prototype.isPrototypeOf(fieldOrNodeList) ? fieldOrNodeList[0] : fieldOrNodeList;
            if (!validateField(field)) {
                isAllValid = false;
            }
        });
        return isAllValid;
    }

    function validateField(field) {
        let message = '';
        const validity = field.validity;


        if (field.tagName === 'FIELDSET') {
            const checked = interestsContainer.querySelectorAll('input:checked').length;
            if (checked === 0) {
                message = '請至少選擇一項興趣';
            } 
        } else {

            if (validity.valueMissing) {
                message = '此欄位為必填';
            } else if (validity.patternMismatch && field.type === 'tel') {
                message = '請輸入有效的 10 碼手機號碼';
            } else if (validity.typeMismatch && field.type === 'email') {
                message = '請輸入有效的電子郵件地址';
            } else if (validity.tooShort) {
                message = `長度至少需要 ${field.minLength} 個字元`;
            }
        }

        if (field.id === 'password' && !message) {
            if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(field.value)) {
                message = '密碼需包含英文及數字';
            }
        }
        if (field.id === 'confirmPassword' && !message) {
            if (field.value !== passwordInput.value) {
                message = '兩次輸入的密碼不一致';
            }
        }

        field.setCustomValidity(message);
        const errorContainer = document.getElementById(`${field.id}-error`) || document.getElementById(`${field.closest('fieldset').id}-error`);
        
        if (message) {
            errorContainer.textContent = message;
            (field.tagName === 'FIELDSET' ? field : field).classList.add('is-invalid');
            return false;
        } else {
            errorContainer.textContent = '';
            (field.tagName === 'FIELDSET' ? field : field).classList.remove('is-invalid');
            return true;
        }
    }


    function updatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        if (/[\W_]/.test(password)) score++;
        strengthBar.className = 'password-strength-bar'; 
    switch (score) {
        case 1:
            strengthBar.style.width = '20%';
            strengthBar.style.backgroundColor = '#ff4b4b';
            strengthText.textContent = 'very weak';
            break;
        case 2:
            strengthBar.style.width = '40%';
            strengthBar.style.backgroundColor = '#ff884b';
            strengthText.textContent = 'weak';
            break;
        case 3:
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = '#ffc94b';
            strengthText.textContent = 'Moderate';
            break;
        case 4:
            strengthBar.style.width = '80%';
            strengthBar.style.backgroundColor = '#9bff4b';
            strengthText.textContent = 'Strong';
            break;
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = '#4bff4b';
            strengthText.textContent = 'Very Strong';
            break;  
        default:
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
    }
    }

 
    function saveToLocalStorage() {
        const data = {};
        fields.forEach(id => {
            const input = inputs[id];
            if (input.type === 'checkbox') {
                data[id] = input.checked;
            } else {
                data[id] = input.value;
            }
        });
  
        data.interests = [];
        inputs.interests.forEach(cb => {
            if (cb.checked) data.interests.push(cb.value);
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data) return;

        fields.forEach(id => {
            const input = inputs[id];
            if (input.type === 'checkbox') {
                input.checked = data[id] || false;
            } else {
                input.value = data[id] || '';
            }
        });

        if (data.interests) {
            inputs.interests.forEach(cb => {
                cb.checked = data.interests.includes(cb.value);
            });
        }

        updatePasswordStrength(passwordInput.value);
    }
});