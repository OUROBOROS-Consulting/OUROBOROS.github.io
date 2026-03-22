(function () {
  'use strict';

  // ── BibTeX Parser ──────────────────────────────────────────────────────────
  // Handles nested braces, quoted values, and bare numbers.

  function parseBibtex(src) {
    src = src.replace(/%[^\n]*/g, ''); // strip line comments
    const entries = [];
    let i = 0;

    while (i < src.length) {
      const at = src.indexOf('@', i);
      if (at === -1) break;

      let j = at + 1;
      while (j < src.length && /\w/.test(src[j])) j++;
      const type = src.slice(at + 1, j).toLowerCase().trim();

      while (j < src.length && src[j] !== '{') j++;
      if (j >= src.length) break;

      let depth = 1, start = ++j;
      while (j < src.length && depth > 0) {
        if (src[j] === '{') depth++;
        else if (src[j] === '}') depth--;
        j++;
      }

      const body = src.slice(start, j - 1);
      i = j;

      if (type === 'string' || type === 'comment' || type === 'preamble') continue;

      const comma = body.indexOf(',');
      if (comma === -1) continue;

      const key    = body.slice(0, comma).trim();
      const fields = parseFields(body.slice(comma + 1));
      entries.push({ type, key, ...fields });
    }

    return entries;
  }

  function parseFields(str) {
    const fields = {};
    let i = 0;

    while (i < str.length) {
      while (i < str.length && !/\w/.test(str[i])) i++;
      if (i >= str.length) break;

      let j = i;
      while (j < str.length && /\w/.test(str[j])) j++;
      const name = str.slice(i, j).toLowerCase();

      while (j < str.length && str[j] !== '=' && str[j] !== ',') j++;
      if (j >= str.length || str[j] === ',') { i = j + 1; continue; }
      j++; // skip '='

      while (j < str.length && /\s/.test(str[j])) j++;

      let value = '';
      if (j < str.length && str[j] === '{') {
        let depth = 1; j++;
        const s = j;
        while (j < str.length && depth > 0) {
          if (str[j] === '{') depth++;
          else if (str[j] === '}') depth--;
          j++;
        }
        value = str.slice(s, j - 1);
      } else if (j < str.length && str[j] === '"') {
        j++;
        const s = j;
        while (j < str.length && str[j] !== '"') j++;
        value = str.slice(s, j);
        j++;
      } else {
        const s = j;
        while (j < str.length && str[j] !== ',' && str[j] !== '\n') j++;
        value = str.slice(s, j).trim();
      }

      fields[name] = value.trim();
      i = j;
    }

    return fields;
  }

  // ── LaTeX Cleanup ──────────────────────────────────────────────────────────

  function cleanLatex(str) {
    if (!str) return '';
    return str
      .replace(/\\[`'^"~=.u]\{?(\w)\}?/g, '$1')       // accented chars
      .replace(/\{\\(emph|textit|textbf)\{([^}]+)\}\}/g, '$2')
      .replace(/\\(emph|textit|textbf)\{([^}]+)\}/g, '$2')
      .replace(/---/g, '\u2014')
      .replace(/--/g, '\u2013')
      .replace(/[{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function formatAuthors(str) {
    if (!str) return '';
    return str
      .split(/\s+and\s+/i)
      .map(function (a) {
        a = cleanLatex(a).trim();
        const parts = a.split(',');
        return parts.length === 2
          ? parts[1].trim() + ' ' + parts[0].trim()
          : a;
      })
      .join(', ');
  }

  // ── Renderer ───────────────────────────────────────────────────────────────

  function renderEntry(e) {
    const title   = cleanLatex(e.title   || '(No title)');
    const authors = formatAuthors(e.author || '');
    const year    = cleanLatex(e.year    || '');
    const venue   = cleanLatex(e.journal || e.booktitle || e.publisher || e.school || '');
    const note    = cleanLatex(e.note    || '');
    const doi     = (e.doi || '').trim();
    const url     = (e.url || '').trim();
    const href    = doi ? 'https://doi.org/' + doi : url;
    const byline  = [authors, year].filter(Boolean).join(' \u00b7 ');

    return [
      '<div class="card--formula">',
      '  <div class="card--formula__interior">',
      '    <span class="stat-value bib-title">' + title + '</span>',
      byline ? '    <p class="card-tag">'  + byline + '</p>'  : '',
      venue  ? '    <p class="card-desc">' + venue  + '</p>'  : '',
      note   ? '    <p class="card-desc">' + note   + '</p>'  : '',
      href   ? '    <a class="card-link" href="' + href + '" target="_blank" rel="noopener">View \u2192</a>' : '',
      '  </div>',
      '</div>'
    ].filter(Boolean).join('\n');
  }

  // ── Boot ───────────────────────────────────────────────────────────────────

  document.querySelectorAll('[data-bibtex-src]').forEach(function (el) {
    var src = el.getAttribute('data-bibtex-src');
    fetch(src)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (text) {
        var entries = parseBibtex(text);
        el.innerHTML = entries.length
          ? entries.map(renderEntry).join('\n')
          : '<p class="card-desc">No references found.</p>';
      })
      .catch(function (err) {
        el.innerHTML = '<p class="card-desc">Could not load references: ' + err.message + '</p>';
      });
  });

}());
