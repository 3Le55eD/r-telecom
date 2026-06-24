function toggleTheme() {
    document.body.classList.toggle('light');
    document.getElementById('btnTheme').innerHTML = document.body.classList.contains('light') ? '&#127769;' : '&#9728;&#65039;';
}

function setLang(lang) {
    document.getElementById('btnRU').classList.toggle('on', lang === 'ru');
    document.getElementById('btnEN').classList.toggle('on', lang === 'en');
    document.querySelectorAll('[data-ru]').forEach(function(el) {
        var val = el.getAttribute('data-' + lang);
        if (!val) return;
        if (el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4') {
            el.innerHTML = val;
        } else {
            el.textContent = val;
        }
    });
    document.documentElement.lang = lang;
}

function showTab(id, btn) {
    document.querySelectorAll('.tabs__content').forEach(function(t) { t.classList.remove('tabs__content--active'); });
    document.querySelectorAll('.tabs__btn').forEach(function(b) { b.classList.remove('tabs__btn--active'); });
    document.getElementById(id).classList.add('tabs__content--active');
    btn.classList.add('tabs__btn--active');
}

function checkQuiz(btn, correct, quizId) {
    var box = document.getElementById(quizId);
    if (box.dataset.answered) return;
    box.dataset.answered = '1';
    var lang = document.documentElement.lang;
    var resultEl = document.getElementById(quizId + '-result');
    if (correct) {
        btn.classList.add('correct');
        resultEl.textContent = lang === 'ru' ? 'Верно!' : 'Correct!';
        resultEl.style.color = '#43e97b';
    } else {
        btn.classList.add('wrong');
        var buttons = box.querySelectorAll('.quiz__option');
        buttons.forEach(function(o) {
            var onclickStr = o.getAttribute('onclick');
            if (onclickStr && onclickStr.indexOf('true') !== -1) {
                o.classList.add('correct');
            }
        });
        resultEl.textContent = lang === 'ru' ? 'Неверно. Правильный ответ выделен зелёным.' : 'Wrong. The correct answer is highlighted in green.';
        resultEl.style.color = '#f5576c';
    }
}
