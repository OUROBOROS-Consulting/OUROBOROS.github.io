export function init(quizData, { onComplete, onBack }) {
  const container = document.getElementById('quiz-engine-container');

  let state = { topicId: null, questionIndex: 0, answered: false };

  function getTopic(id) {
    return quizData.topics.find(t => t.id === id);
  }

  function renderProgress(index, total) {
    const bar = document.createElement('div');
    bar.className = 'engine-progress';
    for (let i = 0; i < total; i++) {
      const seg = document.createElement('span');
      seg.className = 'engine-progress__seg' + (i <= index ? ' engine-progress__seg--active' : '');
      bar.appendChild(seg);
    }
    return bar;
  }

  function renderQuestion() {
    const topic    = getTopic(state.topicId);
    const q        = topic.questions[state.questionIndex];
    const total    = topic.questions.length;
    const isLast   = state.questionIndex === total - 1;

    container.innerHTML = '';

    const back = document.createElement('button');
    back.className = 'engine-back';
    back.setAttribute('type', 'button');
    back.textContent = '← All topics';
    back.addEventListener('click', onBack);
    container.appendChild(back);

    container.appendChild(renderProgress(state.questionIndex, total));

    const typeLabels = ['Recognition', 'Mechanism', 'Application'];
    const typeEl = document.createElement('p');
    typeEl.className = 'engine-type';
    typeEl.textContent = typeLabels[state.questionIndex] ?? `Question ${state.questionIndex + 1}`;
    container.appendChild(typeEl);

    const scenario = document.createElement('p');
    scenario.className = 'engine-scenario';
    scenario.textContent = q.scenario;
    container.appendChild(scenario);

    const opts = document.createElement('div');
    opts.className = 'engine-options';
    q.options.forEach((text, i) => {
      const btn = document.createElement('button');
      btn.className = 'engine-option';
      btn.setAttribute('type', 'button');
      btn.textContent = text;
      btn.addEventListener('click', () => handleAnswer(i, q, isLast));
      opts.appendChild(btn);
    });
    container.appendChild(opts);
  }

  function handleAnswer(chosen, q, isLast) {
    if (state.answered) return;
    state.answered = true;

    const correct = chosen === q.correct;
    const opts    = container.querySelectorAll('.engine-option');
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('engine-option--correct');
      else if (i === chosen && !correct) btn.classList.add('engine-option--wrong');
    });

    const verdict = document.createElement('p');
    verdict.className = 'engine-verdict';
    verdict.textContent = correct
      ? '✓ Correct'
      : 'Not quite — this one surprises most people.';
    verdict.classList.add(correct ? 'engine-verdict--correct' : 'engine-verdict--wrong');
    container.appendChild(verdict);

    const reveal = document.createElement('div');
    reveal.className = 'engine-reveal';
    const revealText = document.createElement('p');
    revealText.className = 'engine-reveal__text';
    revealText.textContent = q.reveal;
    const citation = document.createElement('p');
    citation.className = 'engine-reveal__citation';
    citation.textContent = q.citation;
    reveal.appendChild(revealText);
    reveal.appendChild(citation);
    container.appendChild(reveal);

    const next = document.createElement('button');
    next.className = 'engine-next';
    next.setAttribute('type', 'button');
    next.textContent = isLast ? 'See results →' : 'Next question →';
    next.addEventListener('click', () => {
      if (isLast) {
        onComplete(state.topicId);
      } else {
        state.questionIndex++;
        state.answered = false;
        renderQuestion();
      }
    });
    container.appendChild(next);
  }

  return {
    loadTopic(topicId) {
      state = { topicId, questionIndex: 0, answered: false };
      renderQuestion();
    }
  };
}
