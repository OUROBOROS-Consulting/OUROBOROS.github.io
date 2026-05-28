export function init(quizData) {
  const container = document.getElementById('quiz-share-container');

  function getTopic(id) {
    return quizData.topics.find(t => t.id === id);
  }

  function show(topicId, onExploreAnother) {
    const topic = getTopic(topicId);
    if (!topic) return;
    const share = topic.share;

    container.innerHTML = '';

    const heading = document.createElement('h2');
    heading.className = 'share-heading';
    heading.setAttribute('tabindex', '-1');
    heading.textContent = 'You finished the quiz.';
    container.appendChild(heading);

    // Share card
    const card = document.createElement('div');
    card.className = 'share-card';
    card.setAttribute('role', 'region');
    card.setAttribute('aria-label', 'Share your results');

    const topRule = document.createElement('div');
    topRule.className = 'share-card__rule share-card__rule--top';
    card.appendChild(topRule);

    const eyebrow = document.createElement('p');
    eyebrow.className = 'share-card__eyebrow';
    eyebrow.textContent = 'OUROBOROS CONSULTING';
    card.appendChild(eyebrow);

    const hook = document.createElement('p');
    hook.className = 'share-card__hook';
    hook.textContent = share.hook;
    card.appendChild(hook);

    const sub = document.createElement('p');
    sub.className = 'share-card__sub';
    sub.textContent = share.sub;
    card.appendChild(sub);

    const badge = document.createElement('span');
    badge.className = 'share-card__badge';
    badge.style.setProperty('--badge-color', `var(${topic.color})`);
    badge.textContent = topic.label;
    card.appendChild(badge);

    const url = document.createElement('p');
    url.className = 'share-card__url';
    url.textContent = 'ouroborosconsulting.org/quiz';
    card.appendChild(url);

    const bottomRule = document.createElement('div');
    bottomRule.className = 'share-card__rule share-card__rule--bottom';
    card.appendChild(bottomRule);

    container.appendChild(card);

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'share-actions';

    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn share-btn--primary';
    shareBtn.setAttribute('type', 'button');
    shareBtn.textContent = 'Share this card';
    shareBtn.addEventListener('click', async () => {
      const shareUrl = 'https://ouroborosconsulting.org/quiz/';
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Know the Tactics — OUROBOROS Consulting',
            text: share.hook,
            url: shareUrl,
          });
        } catch (_) { /* user cancelled or not supported */ }
      } else {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareUrl).catch(() => {});
          shareBtn.textContent = 'Link copied!';
          setTimeout(() => { shareBtn.textContent = 'Share this card'; }, 2000);
        }
      }
    });
    actions.appendChild(shareBtn);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'share-btn share-btn--secondary';
    copyBtn.setAttribute('type', 'button');
    copyBtn.textContent = 'Copy link to this topic';
    copyBtn.addEventListener('click', async () => {
      const topicUrl = 'https://ouroborosconsulting.org' + share.url_path;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(topicUrl).catch(() => {});
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy link to this topic'; }, 2000);
      }
    });
    actions.appendChild(copyBtn);

    const exploreBtn = document.createElement('button');
    exploreBtn.className = 'share-btn share-btn--ghost';
    exploreBtn.setAttribute('type', 'button');
    exploreBtn.textContent = 'Explore another concept';
    exploreBtn.addEventListener('click', onExploreAnother);
    actions.appendChild(exploreBtn);

    container.appendChild(actions);

    heading.focus();
  }

  return { show };
}
