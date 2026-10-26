(() => {
  const panels = [...document.querySelectorAll('.day-panel')];
  const tabs = [...document.querySelectorAll('.day-tab')];
  const progressLabel = document.querySelector('#progress-label');
  const progressFill = document.querySelector('#progress-fill');
  const runtimePill = document.querySelector('#runtime-pill');
  const runtimeNotice = document.querySelector('#runtime-notice');
  const progressKey = 'ai-nlp-three-day-progress-v2';
  const explanations = [
    'Đúng. preprocess_text chạy theo thứ tự: token hóa, lọc stop words, rồi stemming.',
    'Đúng. Khi pos_count lớn hơn neg_count, nhánh if đầu tiên trả “Tích cực”.',
    'Đúng. free xuất hiện một lần ở cột 0, win hai lần ở cột 1, prize không xuất hiện.',
    'Đúng. Model đã học ý nghĩa của từng cột; đổi thứ tự cột sẽ đổi nghĩa của vector.',
    'Đúng. Accuracy mô tả kết quả trên tập đã đánh giá, không đảm bảo chất lượng mọi email tương lai.'
  ];

  const labById = new Map((window.NLP_LABS || []).map(lab => [lab.id, lab]));
  let runner = null;
  let activeRun = null;
  let nextRunId = 1;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function renderLab(lab, index) {
    const steps = lab.steps.map((step, stepIndex) => `
      <article class="lab-step">
        <span class="lab-step-number">${String(stepIndex + 1).padStart(2, '0')}</span>
        <div><code>${escapeHTML(step[0])}</code><p>${escapeHTML(step[1])}</p><small><b>Nếu bỏ/sửa:</b> ${escapeHTML(step[2])}</small></div>
      </article>`).join('');

    return `<article class="code-lab" id="lab-${escapeHTML(lab.id)}" data-lab-id="${escapeHTML(lab.id)}">
      <div class="lab-heading"><span class="lab-level">${escapeHTML(lab.level)}</span><span class="lab-time">Bài ${index + 1}</span></div>
      <h3>${escapeHTML(lab.title)}</h3>
      <p class="lab-problem"><b>Ta cần giải quyết:</b> ${escapeHTML(lab.problem)}</p>
      <div class="lab-why"><b>Tại sao cần bước này?</b><p>${escapeHTML(lab.why)}</p></div>
      <div class="lab-io"><div><small>DỮ LIỆU VÀO</small><span>${escapeHTML(lab.input)}</span></div><i aria-hidden="true">→</i><div><small>KẾT QUẢ CẦN NHÌN THẤY</small><span>${escapeHTML(lab.output)}</span></div></div>
      <details class="lab-line-guide"><summary>Giải nghĩa từng dòng và xem điều gì xảy ra nếu bỏ nó</summary><div class="lab-steps">${steps}</div></details>
      ${lab.note ? `<div class="lab-note"><b>Phân biệt với code gốc:</b> ${escapeHTML(lab.note)}</div>` : ''}
      <div class="lab-challenge"><span class="eyebrow">VIỆC BẠN TỰ LÀM</span><p>${escapeHTML(lab.challenge)}</p></div>
      <label class="editor-label" for="editor-${escapeHTML(lab.id)}">Bản code Python <span>Thụt lề 4 dấu cách · Tab chèn dấu cách</span></label>
      <textarea class="python-editor" id="editor-${escapeHTML(lab.id)}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Code Python: ${escapeHTML(lab.title)}"></textarea>
      <div class="lab-actions">
        <button class="run-lab primary-action" type="button">▶ Chạy code</button>
        <button class="check-lab" type="button">✓ Chạy &amp; kiểm tra</button>
        <button class="clear-output-lab" type="button">Xóa output</button>
        <button class="reset-lab" type="button">Đặt lại</button>
      </div>
      <div class="lab-output-wrap"><div class="output-heading"><b>Kết quả chạy</b><span class="lab-status" aria-live="polite">Chưa chạy</span></div><pre class="lab-output" aria-live="polite">Bấm “Chạy code” để xem Python thực hiện các dòng trên.</pre></div>
      <details class="expected-output"><summary>Xem output mong đợi</summary><pre>${escapeHTML(lab.expected)}</pre></details>
      <div class="lab-support"><div class="hint-buttons"><span>Gợi ý theo nấc:</span><button type="button" data-hint="1">Gợi ý 1</button><button type="button" data-hint="2">Gợi ý 2</button></div><p class="lab-hint-text" data-hint-text hidden></p>
        <details class="lab-solution"><summary>Xem lời giải hoàn chỉnh</summary><pre><code>${escapeHTML(lab.solution)}</code></pre></details>
      </div>
    </article>`;
  }

  function renderLabs() {
    document.querySelectorAll('[data-lab-group]').forEach(container => {
      const group = container.dataset.labGroup;
      const labs = (window.NLP_LABS || []).filter(lab => lab.group === group);
      container.innerHTML = labs.map(renderLab).join('');
      labs.forEach(lab => {
        const editor = container.querySelector(`#editor-${CSS.escape(lab.id)}`);
        const storageKey = `ai-nlp-code-draft-${lab.id}`;
        try { editor.value = localStorage.getItem(storageKey) || lab.starter; } catch { editor.value = lab.starter; }
        editor.addEventListener('input', () => {
          try { localStorage.setItem(storageKey, editor.value); } catch { /* storage is optional */ }
        });
        editor.addEventListener('keydown', event => {
          if (event.key !== 'Tab') return;
          event.preventDefault();
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.setRangeText('    ', start, end, 'end');
          editor.dispatchEvent(new Event('input', { bubbles: true }));
        });
      });
    });
  }

  function readProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(progressKey) || '[]');
      return Array.isArray(value) ? value.map(Number).filter(n => n >= 1 && n <= 3) : [];
    } catch { return []; }
  }

  function saveProgress(days) {
    try { localStorage.setItem(progressKey, JSON.stringify([...new Set(days)])); } catch { /* local storage is optional */ }
  }

  function renderProgress() {
    const completed = readProgress();
    progressLabel.textContent = `${completed.length}/3 ngày hoàn thành`;
    progressFill.style.width = `${completed.length / 3 * 100}%`;
    tabs.forEach(tab => tab.classList.toggle('completed', completed.includes(Number(tab.dataset.day))));
    document.querySelectorAll('.complete-day').forEach(button => {
      const isDone = completed.includes(Number(button.dataset.complete));
      button.classList.toggle('completed', isDone);
      button.textContent = isDone ? `✓ Đã hoàn thành ngày ${button.dataset.complete}` : `Đánh dấu ngày ${button.dataset.complete} hoàn thành`;
      button.setAttribute('aria-pressed', String(isDone));
    });
  }

  function showDay(day, updateHash = true) {
    const targetDay = Math.max(1, Math.min(3, Number(day) || 1));
    panels.forEach(panel => {
      const active = Number(panel.dataset.panel) === targetDay;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
    tabs.forEach(tab => {
      const active = Number(tab.dataset.day) === targetDay;
      tab.classList.toggle('active', active);
      if (active) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
    if (updateHash) history.replaceState(null, '', `#ngay-${targetDay}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setRuntimeStatus(message, state = 'idle') {
    if (!runtimePill) return;
    runtimePill.dataset.state = state;
    runtimePill.querySelector('span').textContent = message;
  }

  function friendlyError(errorName, error) {
    const name = String(errorName || 'Error');
    const raw = String(error || 'Lỗi chưa xác định');
    if (name.includes('AssertionError')) return `Code đã chạy, nhưng bài tự kiểm tra chưa qua. ${raw}`;
    if (name.includes('IndentationError') || raw.includes('IndentationError')) return `Python đang báo lỗi thụt lề. Các dòng bên trong def, for và if cần thụt vào 4 dấu cách.\n\n${raw}`;
    if (name.includes('SyntaxError') || raw.includes('SyntaxError')) return `Python chưa đọc được cú pháp. Kiểm tra dấu nháy, ngoặc, dấu hai chấm và dòng đang báo lỗi.\n\n${raw}`;
    if (name.includes('NameError') || raw.includes('NameError')) return `Python gặp một tên chưa được tạo, hoặc tên bị viết khác chữ hoa/chữ thường.\n\n${raw}`;
    if (name.includes('TypeError') || raw.includes('TypeError')) return `Hai kiểu dữ liệu không phù hợp với thao tác đang dùng. Xem lại kiểu đầu vào của dòng được báo.\n\n${raw}`;
    if (name.includes('ModuleNotFoundError') || raw.includes('No module named')) return `Thư viện cần dùng chưa tải được vào trình chạy. Kiểm tra mạng rồi chạy lại.\n\n${raw}`;
    return `${raw}\n\nHãy đọc dòng cuối của lỗi trước; thường đó là nơi Python phát hiện vấn đề.`;
  }

  function terminateRunner() {
    if (activeRun?.timer) clearTimeout(activeRun.timer);
    if (runner) runner.terminate();
    runner = null;
  }

  function createRunner() {
    if (runner) return runner;
    if (location.protocol === 'file:') {
      throw new Error('Bạn đang mở file trực tiếp. Bài đọc được, nhưng Python Worker cần trang được mở qua HTTPS hoặc web server. Hãy triển khai website theo DEPLOY.md.');
    }
    runner = new Worker(new URL('./py-worker.mjs', document.baseURI), { type: 'module' });
    runner.addEventListener('message', handleRunnerMessage);
    runner.addEventListener('error', event => {
      if (!activeRun) return;
      terminateRunner();
      finishRun('Không tải được trình chạy. Kiểm tra HTTPS, đường truyền và worker cùng thư mục với trang.', 'error');
      event.preventDefault();
    });
    return runner;
  }

  function setLabControlsDisabled(disabled) {
    document.querySelectorAll('.run-lab, .check-lab, .clear-output-lab, .reset-lab').forEach(button => { button.disabled = disabled; });
  }

  function finishRun(message, state, output) {
    if (!activeRun) return;
    const { card, timer } = activeRun;
    if (timer) clearTimeout(timer);
    const status = card.querySelector('.lab-status');
    const outputBox = card.querySelector('.lab-output');
    status.textContent = message;
    status.dataset.state = state;
    if (output !== undefined) outputBox.textContent = output || 'Không có output. Thêm print(...) nếu muốn xem một giá trị.';
    if (state === 'passed') card.classList.add('lab-passed');
    else if (state === 'error' || state === 'needs-work') card.classList.remove('lab-passed');
    activeRun = null;
    setLabControlsDisabled(false);
    setRuntimeStatus(runner ? 'Python sẵn sàng' : 'Python chưa tải', runner ? 'ready' : 'idle');
  }

  function startRun(card, shouldCheck) {
    if (activeRun) return;
    const lab = labById.get(card.dataset.labId);
    const code = card.querySelector('.python-editor').value;
    const runId = nextRunId++;
    const status = card.querySelector('.lab-status');
    const outputBox = card.querySelector('.lab-output');
    status.textContent = 'Đang chuẩn bị Python…';
    status.dataset.state = 'loading';
    outputBox.textContent = 'Trình chạy khởi động trong worker; code của bạn chưa rời khỏi trình duyệt.';
    setRuntimeStatus('Đang tải runtime', 'loading');
    setLabControlsDisabled(true);

    try { createRunner(); }
    catch (error) {
      status.textContent = 'Cần HTTPS để chạy Python';
      status.dataset.state = 'error';
      outputBox.textContent = error.message;
      setRuntimeStatus('Cần HTTPS', 'error');
      setLabControlsDisabled(false);
      return;
    }

    activeRun = { id: runId, card, timer: null, shouldCheck };
    activeRun.timer = setTimeout(() => {
      finishRun('Tải runtime quá lâu; hãy kiểm tra kết nối Internet rồi thử lại.', 'error', 'Trang không bị treo. Bấm Đặt lại để bỏ output rồi chạy lại.');
      terminateRunner();
      setRuntimeStatus('Chưa tải được Python', 'error');
    }, 180000);
    runner.postMessage({ id: runId, type: 'run', code, checks: shouldCheck ? lab.tests : '' });
  }

  function handleRunnerMessage(event) {
    const message = event.data;
    if (!activeRun || message.id !== activeRun.id) return;
    const status = activeRun.card.querySelector('.lab-status');
    if (message.type === 'loading-runtime') {
      status.textContent = 'Đang tải Python lần đầu…';
      setRuntimeStatus('Đang tải Python', 'loading');
      return;
    }
    if (message.type === 'loading-packages') {
      status.textContent = 'Đang tải thư viện cần cho bài này…';
      setRuntimeStatus('Đang tải thư viện', 'loading');
      return;
    }
    if (message.type === 'running') {
      status.textContent = 'Python đang chạy code…';
      setRuntimeStatus('Đang chạy code', 'running');
      clearTimeout(activeRun.timer);
      activeRun.timer = setTimeout(() => {
        finishRun('Code chạy quá 10 giây; runtime đã dừng.', 'error', 'Có thể vòng lặp không dừng. Bấm Đặt lại rồi chạy lại Python.');
        terminateRunner();
        setRuntimeStatus('Đã dừng runtime', 'error');
      }, 10000);
      return;
    }
    if (message.type === 'complete') {
      finishRun(message.checked ? 'Đã chạy · bài kiểm tra đã qua' : 'Đã chạy xong', message.checked ? 'passed' : 'complete', message.output);
      return;
    }
    if (message.type === 'failed') {
      const failedCheck = String(message.errorName).includes('AssertionError') || String(message.error).includes('AssertionError');
      finishRun(failedCheck ? 'Code chạy được · bài kiểm tra chưa qua' : 'Có lỗi trong code', failedCheck ? 'needs-work' : 'error', `${message.output || ''}${message.output ? '\n' : ''}${friendlyError(message.errorName, message.error)}`);
    }
  }

  function wireLabControls() {
    document.querySelectorAll('.code-lab').forEach(card => {
      card.querySelector('.run-lab').addEventListener('click', () => startRun(card, false));
      card.querySelector('.check-lab').addEventListener('click', () => startRun(card, true));
      card.querySelector('.clear-output-lab').addEventListener('click', () => {
        card.querySelector('.lab-output').textContent = 'Output đã được xóa. Code và bản nháp vẫn được giữ nguyên.';
        card.querySelector('.lab-status').textContent = 'Đã xóa output';
        card.querySelector('.lab-status').dataset.state = 'idle';
      });
      card.querySelector('.reset-lab').addEventListener('click', () => {
        const lab = labById.get(card.dataset.labId);
        const editor = card.querySelector('.python-editor');
        editor.value = lab.starter;
        try { localStorage.removeItem(`ai-nlp-code-draft-${lab.id}`); } catch { /* optional */ }
        card.classList.remove('lab-passed');
        card.querySelector('.lab-output').textContent = 'Code đã được đặt lại. Bấm “Chạy code” để xem Python thực hiện các dòng trên.';
        card.querySelector('.lab-status').textContent = 'Chưa chạy';
        card.querySelector('.lab-status').dataset.state = 'idle';
      });
      card.querySelectorAll('[data-hint]').forEach(button => {
        button.addEventListener('click', () => {
          const lab = labById.get(card.dataset.labId);
          const text = card.querySelector('.lab-hint-text');
          text.hidden = false;
          text.textContent = button.dataset.hint === '1' ? lab.hint1 : lab.hint2;
        });
      });
    });
  }

  renderLabs();
  wireLabControls();
  tabs.forEach(tab => tab.addEventListener('click', () => showDay(tab.dataset.day)));
  document.querySelectorAll('.complete-day').forEach(button => {
    button.addEventListener('click', () => {
      const day = Number(button.dataset.complete);
      const completed = readProgress();
      saveProgress(completed.includes(day) ? completed.filter(value => value !== day) : [...completed, day]);
      renderProgress();
    });
  });
  document.querySelectorAll('.quiz').forEach((quiz, index) => {
    quiz.querySelector('.check-answer').addEventListener('click', () => {
      const feedback = quiz.querySelector('.feedback');
      const selected = quiz.querySelector('input:checked');
      feedback.classList.remove('correct', 'incorrect');
      if (!selected) { feedback.textContent = 'Chọn một đáp án trước nhé, rồi hãy tự giải thích lý do.'; return; }
      if (selected.value === quiz.dataset.answer) {
        feedback.textContent = explanations[index] || 'Chính xác. Hãy thử giải thích lý do bằng lời của bạn.';
        feedback.classList.add('correct');
      } else {
        feedback.textContent = 'Chưa đúng. Hãy đọc lại dòng giải thích liên quan rồi thử lại.';
        feedback.classList.add('incorrect');
      }
    });
  });
  document.querySelectorAll('.reveal-answer').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const opening = answer.hidden;
      answer.hidden = !opening;
      button.textContent = opening
        ? (button.textContent.includes('Gợi ý') ? 'Ẩn gợi ý' : 'Ẩn lời giải')
        : (button.textContent.includes('gợi ý') || button.textContent.includes('Gợi ý') ? 'Gợi ý trả lời' : 'Xem một lời giải mẫu');
    });
  });

  document.querySelector('#dismiss-runtime-note')?.addEventListener('click', () => runtimeNotice?.remove());
  if (location.protocol === 'file:') setRuntimeStatus('Cần HTTPS để chạy', 'error');
  const initialDay = Number((location.hash.match(/ngay-(\d)/) || [])[1]) || 1;
  showDay(initialDay, false);
  renderProgress();
})();
