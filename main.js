document.addEventListener('DOMContentLoaded', function() {
    var bmiBtn = document.getElementById('bmiCalcBtn');
    var bmiHeight = document.getElementById('bmiHeight');
    var bmiWeight = document.getElementById('bmiWeight');
    var bmiResult = document.getElementById('bmiResult');

    if (bmiBtn) {
        bmiBtn.addEventListener('click', function() {
            var hVal = parseFloat(bmiHeight.value);
            var wVal = parseFloat(bmiWeight.value);

            if (!hVal || !wVal || hVal <= 0 || wVal <= 0) {
                bmiResult.style.display = 'block';
                bmiResult.style.color = '#ff2a2a';
                bmiResult.textContent = 'Boy va vaznni to\'g\'ri kiriting!';
                return;
            }

            var originalBtnText = bmiBtn.textContent;
            bmiBtn.disabled = true;
            bmiBtn.textContent = 'Loading...';

            setTimeout(function() {
                var heightInM = hVal / 100;
                var bmi = (wVal / (heightInM * heightInM)).toFixed(1);
                var category = '';
                var color = '#ffffff';

                if (bmi < 18.5) {
                    category = 'Vazn yetarli emas';
                    color = '#ffb703';
                } else if (bmi >= 18.5 && bmi < 24.9) {
                    category = 'Meyyoriy vazn';
                    color = '#2ec4b6';
                } else if (bmi >= 25 && bmi < 29.9) {
                    category = 'Ortiqcha vazn';
                    color = '#ffb703';
                } else {
                    category = 'Semizlik';
                    color = '#ff2a2a';
                }

                bmiResult.style.display = 'block';
                bmiResult.style.color = color;
                bmiResult.innerHTML = 'BMI: ' + bmi + ' (' + category + ')';

                bmiBtn.textContent = originalBtnText;
                bmiBtn.disabled = false;
            }, 400);
        });
    }

    var allButtons = document.querySelectorAll('button:not(#bmiCalcBtn), .box88, .box58, a.btn, .btn');
    allButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            if (btn.tagName === 'A') {
                e.preventDefault();
            }
            if (btn.disabled) return;

            var currentText = btn.textContent.trim();
            var targetText = 'Loading...';

            if (currentText.toLowerCase().includes('yuborish') || currentText.toLowerCase().includes('send')) {
                targetText = 'Yuborilmoqda...';
            } else if (currentText.toLowerCase().includes('sotib') || currentText.toLowerCase().includes('buy')) {
                targetText = 'Ulanmoqda...';
            }

            var oldText = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = targetText;

            setTimeout(function() {
                btn.innerHTML = oldText;
                btn.disabled = false;
            }, 600);
        });
    });
});