// CCHC shared JS — mobile nav, a11y toggle, back-to-top, filter chips
(function () {
  // Mobile nav
  var burger = document.querySelector('.mainbar .burger');
  var nav = document.querySelector('.mainnav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // A11y toggle (F-UX-01) — có thể có nhiều nút trên cùng trang
  var a11yBtns = document.querySelectorAll('.a11y-toggle');
  if (a11yBtns.length) {
    var isOn = localStorage.getItem('cchc-a11y') === '1';
    if (isOn) document.documentElement.setAttribute('data-a11y', '1');
    a11yBtns.forEach(function (btn) { btn.setAttribute('aria-pressed', String(isOn)); });

    a11yBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = document.documentElement.getAttribute('data-a11y') === '1';
        var next = !on;
        document.documentElement.toggleAttribute('data-a11y', next);
        if (next) document.documentElement.setAttribute('data-a11y', '1');
        localStorage.setItem('cchc-a11y', next ? '1' : '0');
        a11yBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(next)); });
      });
    });
  }

  // Back to top
  var btt = document.querySelector('.back-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Filter chips (client-side demo filtering for tri-thuc listing)
  var chipGroups = document.querySelectorAll('[data-filter-group]');
  chipGroups.forEach(function (group) {
    var key = group.getAttribute('data-filter-group');
    group.querySelectorAll('.chip-btn').forEach(function (chip) {
      chip.addEventListener('click', function () {
        group.querySelectorAll('.chip-btn').forEach(function (c) { c.classList.remove('on'); });
        chip.classList.add('on');
        applyFilters();
      });
    });
  });

  function applyFilters() {
    var mVal = getChipVal('m');
    var catVal = getChipVal('cat');
    document.querySelectorAll('[data-article]').forEach(function (card) {
      var ok = true;
      if (mVal && mVal !== 'all' && card.getAttribute('data-m') !== mVal) ok = false;
      if (catVal && catVal !== 'all' && card.getAttribute('data-cat') !== catVal) ok = false;
      card.style.display = ok ? '' : 'none';
    });
    var empty = document.querySelector('.empty-state');
    if (empty) {
      var visible = document.querySelectorAll('[data-article]:not([style*="none"])').length;
      empty.style.display = visible ? 'none' : '';
    }
  }
  function getChipVal(key) {
    var g = document.querySelector('[data-filter-group="' + key + '"] .chip-btn.on');
    return g ? g.getAttribute('data-value') : null;
  }

  // Hero search demo → redirect to tri-thuc.html
  var hs = document.querySelector('.hero-search');
  if (hs) {
    hs.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = hs.querySelector('input').value.trim();
      location.href = 'tri-thuc.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }

  // Audio player demo toggle
  document.querySelectorAll('.audio-player .play').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.textContent = btn.textContent.trim() === '▶' ? '⏸' : '▶';
    });
  });

  // SLA timer demo (countdown from 48h)
  var sla = document.querySelector('.sla-timer[data-hours]');
  if (sla) {
    var remain = parseInt(sla.getAttribute('data-hours'), 10) * 3600;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    setInterval(function () {
      remain = Math.max(0, remain - 1);
      var h = Math.floor(remain / 3600), m = Math.floor((remain % 3600) / 60), s = remain % 60;
      sla.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    }, 1000);
  }

  // ─── Form validation + confirm dialog + undo ───
  var formButtons = document.querySelectorAll('[data-form]');
  formButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var formId = btn.getAttribute('data-form');
      var container = btn.closest('.panel');
      if (!container) return;
      var fields = container.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea, select');
      var checkbox = container.querySelector('input[type="checkbox"][required]');
      var valid = true;

      fields.forEach(function (field) {
        var wrapper = field.closest('.field');
        if (wrapper) wrapper.classList.remove('field-error');
        var existingMsg = wrapper ? wrapper.querySelector('.field-error-msg') : null;
        if (existingMsg) existingMsg.remove();

        if (!field.value.trim()) {
          valid = false;
          if (wrapper) {
            wrapper.classList.add('field-error');
            var msg = document.createElement('span');
            msg.className = 'field-error-msg';
            msg.textContent = 'Vui lòng điền thông tin này';
            wrapper.appendChild(msg);
          }
        }
      });

      if (checkbox && !checkbox.checked) {
        valid = false;
        var cl = checkbox.closest('.u-consent-label');
        if (cl) {
          cl.style.color = 'var(--coral)';
          var existingClMsg = cl.querySelector('.field-error-msg');
          if (!existingClMsg) {
            var clMsg = document.createElement('span');
            clMsg.className = 'field-error-msg';
            clMsg.textContent = 'Vui lòng đồng ý để tiếp tục';
            cl.appendChild(clMsg);
          }
        }
      }

      if (!valid) return;

      showConfirmDialog(function () {
        submitForm(container, btn, fields);
      });
    });
  });

  function showConfirmDialog(onConfirm) {
    var overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML =
      '<div class="confirm-dialog">' +
      '<h4>Bạn chắc chắn muốn gửi?</h4>' +
      '<p>Hãy kiểm tra lại thông tin trước khi gửi. Bạn có thể hoàn tác trong 10 phút sau khi gửi.</p>' +
      '<div class="confirm-btns">' +
      '<button class="btn btn-outline" data-action="cancel">Xem lại</button>' +
      '<button class="btn btn-primary" data-action="confirm">Gửi</button>' +
      '</div></div>';
    document.body.appendChild(overlay);

    overlay.querySelector('[data-action="cancel"]').addEventListener('click', function () {
      overlay.remove();
    });
    overlay.querySelector('[data-action="confirm"]').addEventListener('click', function () {
      overlay.remove();
      onConfirm();
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  function submitForm(container, btn, fields) {
    var fieldData = {};
    fields.forEach(function (f) {
      var label = f.closest('.field');
      var labelText = label ? label.querySelector('label') : null;
      fieldData[labelText ? labelText.textContent : f.type] = f.value;
    });

    btn.style.display = 'none';
    fields.forEach(function (f) { f.disabled = true; });
    var checkbox = container.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.disabled = true;

    var success = document.createElement('div');
    success.className = 'form-success';
    success.innerHTML =
      '<div class="icon">✓</div>' +
      '<h4>Đã gửi thành công</h4>' +
      '<p>CCHC sẽ phản hồi trong thời gian cam kết. Bạn có thể hoàn tác trong 10 phút.</p>' +
      '<button class="undo-bar" data-action="undo">↶ Hoàn tác</button>' +
      '<div class="undo-timer">Thời gian hoàn tác: <span data-undo-countdown>10:00</span></div>';
    container.appendChild(success);

    var undoBtn = success.querySelector('[data-action="undo"]');
    var countdownEl = success.querySelector('[data-undo-countdown]');
    var undoSeconds = 600;

    var timer = setInterval(function () {
      undoSeconds--;
      if (undoSeconds <= 0) {
        clearInterval(timer);
        undoBtn.remove();
        countdownEl.textContent = 'Đã hết thời gian hoàn tác';
        return;
      }
      var m = Math.floor(undoSeconds / 60), s = undoSeconds % 60;
      countdownEl.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }, 1000);

    undoBtn.addEventListener('click', function () {
      clearInterval(timer);
      success.remove();
      btn.style.display = '';
      fields.forEach(function (f) { f.disabled = false; f.value = ''; });
      var checkbox2 = container.querySelector('input[type="checkbox"]');
      if (checkbox2) { checkbox2.disabled = false; checkbox2.checked = false; }
      var cl = container.querySelector('.u-consent-label');
      if (cl) cl.style.color = '';
    });
  }

  // ─── TTS (Text-to-Speech) ───
  var ttsBtn = document.querySelector('.tts-btn');
  if (ttsBtn) {
    var synth = window.speechSynthesis;
    var utterance = null;
    var ttsPlaying = false;
    var ttsSpeed = 1;

    if (!synth) {
      ttsBtn.disabled = true;
      ttsBtn.title = 'Trình duyệt không hỗ trợ đọc aloud';
      var fb = document.createElement('div');
      fb.className = 'tts-fallback';
      fb.textContent = 'Trình duyệt của bạn không hỗ trợ đọc aloud. Vui lòng dùng Chrome hoặc Edge.';
      ttsBtn.parentNode.appendChild(fb);
    }

    ttsBtn.addEventListener('click', function () {
      if (!synth) return;
      if (ttsPlaying) {
        synth.cancel();
        ttsPlaying = false;
        ttsBtn.classList.remove('playing');
        ttsBtn.textContent = '🔊 Đọc bài';
        return;
      }
      var articleBody = document.querySelector('.article-body');
      if (!articleBody) return;
      var text = articleBody.textContent.trim();
      utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = ttsSpeed;

      var voices = synth.getVoices();
      var viVoice = voices.find(function (v) { return v.lang.indexOf('vi') === 0; });
      if (viVoice) utterance.voice = viVoice;

      utterance.onend = function () {
        ttsPlaying = false;
        ttsBtn.classList.remove('playing');
        ttsBtn.textContent = '🔊 Đọc bài';
      };
      utterance.onerror = function () {
        ttsPlaying = false;
        ttsBtn.classList.remove('playing');
        ttsBtn.textContent = '🔊 Đọc bài';
      };

      synth.speak(utterance);
      ttsPlaying = true;
      ttsBtn.classList.add('playing');
      ttsBtn.textContent = '⏸ Dừng đọc';
    });

    var speedSelect = document.querySelector('.tts-speed select');
    if (speedSelect) {
      speedSelect.addEventListener('change', function () {
        ttsSpeed = parseFloat(speedSelect.value);
        if (ttsPlaying && synth) {
          synth.cancel();
          ttsPlaying = false;
          ttsBtn.classList.remove('playing');
          ttsBtn.textContent = '🔊 Đọc bài';
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        if (ttsBtn && !ttsBtn.disabled) ttsBtn.click();
      }
    });
  }

  // ─── Simplified UI Mode ───
  var simpleBtns = document.querySelectorAll('.simple-toggle');
  if (simpleBtns.length) {
    var isSimpleOn = localStorage.getItem('cchc-simple') === '1';
    if (isSimpleOn) document.documentElement.setAttribute('data-simple', '1');
    simpleBtns.forEach(function (btn) { btn.setAttribute('aria-pressed', String(isSimpleOn)); });

    simpleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = document.documentElement.getAttribute('data-simple') === '1';
        var next = !on;
        document.documentElement.toggleAttribute('data-simple', next);
        if (next) document.documentElement.setAttribute('data-simple', '1');
        localStorage.setItem('cchc-simple', next ? '1' : '0');
        simpleBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(next)); });
      });
    });
  }
})();
