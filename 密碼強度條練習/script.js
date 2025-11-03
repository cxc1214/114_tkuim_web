function checkStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    switch (strength) {
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
