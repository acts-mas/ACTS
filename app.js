(() => {
  'use strict';

  const data = window.ACTS_RESULTS;
  const config = window.ACTS_SITE || {};
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const fmt = (value) => Number(value).toFixed(2);
  const safeUrl = (value) => {
    if (!value) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ['https:', 'http:', 'file:'].includes(url.protocol) ? value : null;
    } catch { return null; }
  };

  [['#code-link',config.codeUrl],['#arxiv-link',config.arxivUrl]].forEach(([selector,url]) => {
    if (!safeUrl(url)) return;
    const link = $(selector);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.hidden = false;
  });
  if (Array.isArray(config.authors) && config.authors.length) {
    const authors = $('#authors');
    config.authors.forEach((author,index) => {
      if (index) authors.append(document.createTextNode('  ·  '));
      const item = document.createElement(safeUrl(author.url) ? 'a' : 'span');
      item.textContent = author.name;
      if (safeUrl(author.url)) { item.href = author.url; item.target = '_blank'; item.rel = 'noopener'; }
      if (author.affiliation) {
        const sup = document.createElement('sup');
        sup.textContent = author.affiliation;
        item.append(sup);
      }
      authors.append(item);
    });
    authors.hidden = false;
  }
  if (Array.isArray(config.affiliations) && config.affiliations.length) {
    $('#affiliations').textContent = config.affiliations.join('   ·   ');
    $('#affiliations').hidden = false;
  }
  if (config.bibtex) {
    $('#bibtex').textContent = config.bibtex;
    $('#citation').hidden = false;
    $('#copy-citation').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(config.bibtex);
        $('#copy-status').textContent = 'Citation copied.';
      } catch {
        const range = document.createRange();
        range.selectNodeContents($('#bibtex'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        $('#copy-status').textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
      }
    });
  }

  const dialog = $('#figure-dialog');
  $$('[data-zoom]').forEach((button) => button.addEventListener('click', () => {
    $('#dialog-image').src = button.dataset.zoom;
    $('#dialog-image').alt = button.dataset.caption;
    $('#dialog-caption').textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  if ('IntersectionObserver' in window) {
    const nav = $$('.main-nav a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        nav.forEach((link) => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active',active);
          if (active) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-15% 0px -65% 0px'});
    nav.forEach((link) => observer.observe($(link.hash)));
  }

  if (!data) return;
  let modelId = 'gpt';
  let taskId = 'hotpot';
  const taskName = () => taskId === 'hotpot' ? 'HotpotQA' : 'HLE';
  const currentModel = () => data.models.find((model) => model.id === modelId);

  function renderBars(model) {
    const sorted = [...model.methods].sort((a,b) => b.average - a.average);
    $('#accuracy-bars').innerHTML = sorted.map((method) => `
      <div class="bar-row ${escape(method.group)}" aria-label="${escape(method.name)}: ${fmt(method.average)} percent macro-average accuracy">
        <span class="bar-name">${escape(method.name)}</span>
        <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${method.average}%"></div></div>
        <span class="bar-value">${fmt(method.average)}</span>
      </div>`).join('') + '<div class="bar-axis" aria-hidden="true"><span></span><div class="bar-axis-values"><span>0</span><span>50</span><span>100%</span></div><span></span></div>';
    const ours = model.methods.find((method) => method.group === 'ours');
    const baseline = model.methods.find((method) => method.name === 'Agent Q-Mix');
    $('#average-gain').textContent = `+${fmt(ours.average - baseline.average)}`;
    $('#average-comparison').textContent = `${fmt(ours.average)}% vs. ${fmt(baseline.average)}% · ${model.name}`;
  }

  function renderScatter(model) {
    const index = taskId === 'hotpot' ? 3 : 2;
    const points = model.methods.map((method) => ({...method,x:method.tokens[taskId],y:method.accuracy[index]}));
    const plot = {left:44,top:27,width:386,height:187};
    const sx = (value) => plot.left + value / 18 * plot.width;
    const sy = (value) => plot.top + plot.height - value / 60 * plot.height;
    const gridX = [0,3,6,9,12,15,18].map((value) => `<line class="plot-grid" x1="${sx(value)}" y1="${plot.top}" x2="${sx(value)}" y2="${plot.top+plot.height}"/><text class="plot-label" x="${sx(value)}" y="233" text-anchor="middle">${value}</text>`).join('');
    const gridY = [0,15,30,45,60].map((value) => `<line class="plot-grid" x1="${plot.left}" y1="${sy(value)}" x2="${plot.left+plot.width}" y2="${sy(value)}"/><text class="plot-label" x="34" y="${sy(value)+3}" text-anchor="end">${value}</text>`).join('');
    const ordered = [...points.filter((point) => !['ours','learned','single'].includes(point.group)),...points.filter((point) => ['single','learned','ours'].includes(point.group))];
    const svgPoints = ordered.map((point) => {
      const type = point.group === 'ours' ? 'ours' : point.group === 'learned' ? 'baseline' : point.group === 'single' ? 'direct' : 'other';
      const label = `${point.name}: ${fmt(point.y)}% accuracy, ${point.x.toFixed(1)}k tokens per sample`;
      return `<circle class="plot-point plot-${type}" cx="${sx(point.x)}" cy="${sy(point.y)}" r="${type === 'ours' ? 6.5 : type === 'baseline' ? 5.5 : 4.5}" tabindex="0" role="img" aria-label="${escape(label)}" data-point-label="${escape(label)}"><title>${escape(label)}</title></circle>`;
    }).join('');
    const labels = points.filter((point) => ['ours','learned','single'].includes(point.group)).map((point) => {
      const ours = point.group === 'ours';
      const label = ours ? 'ACTS' : point.group === 'learned' ? 'Q-Mix' : 'Direct';
      return `<text x="${sx(point.x)}" y="${sy(point.y)+(ours ? -13 : 18)}" text-anchor="middle" style="font: ${ours ? '650' : '500'} 10px var(--font);fill:${ours ? '#176b50' : '#718072'}" aria-hidden="true">${label}</text>`;
    }).join('');
    $('#efficiency-chart').innerHTML = `<svg viewBox="0 0 460 269" role="group" aria-labelledby="scatter-title scatter-description"><title id="scatter-title">${escape(model.name)} · ${taskName()} accuracy and tokens</title><desc id="scatter-description">All eleven methods. The horizontal axis is mean tokens per sample in thousands, from zero to eighteen. The vertical axis is accuracy in percent, from zero to sixty. Focus any point for its values, or open the exact-value table below.</desc><text class="plot-label" x="44" y="13">Accuracy (%) ↑</text>${gridX}${gridY}${svgPoints}${labels}<text class="plot-label" x="237" y="259" text-anchor="middle">Mean tokens per sample (thousands) →</text></svg>`;
    $('#chart-tooltip').textContent = 'Hover or focus a point to inspect a method.';
    $$('[data-point-label]').forEach((point) => {
      const show = () => { $('#chart-tooltip').textContent = point.dataset.pointLabel; };
      point.addEventListener('mouseenter',show);
      point.addEventListener('focus',show);
      point.addEventListener('click',show);
    });
    const ours = points.find((point) => point.group === 'ours');
    const baseline = points.find((point) => point.group === 'learned');
    const saving = (1 - ours.x / baseline.x) * 100;
    $('#efficiency-insight').innerHTML = `<div><strong class="insight-number">−${saving.toFixed(1)}%</strong><span class="insight-label">tokens vs. Agent Q-Mix<br>${ours.x.toFixed(1)}k vs. ${baseline.x.toFixed(1)}k · ${taskName()}</span></div><div><strong class="insight-number">+${fmt(ours.y-baseline.y)}<span style="font-size:12px"> pp</span></strong><span class="insight-label">accuracy vs. Agent Q-Mix<br>${fmt(ours.y)}% vs. ${fmt(baseline.y)}% · ${taskName()}</span></div>`;
    $('#efficiency-table').innerHTML = `<table><caption>${escape(model.name)} · ${taskName()}</caption><thead><tr><th scope="col">Method</th><th scope="col">Accuracy (%)</th><th scope="col">Tokens (k)</th></tr></thead><tbody>${points.map((point) => `<tr class="${point.group === 'ours' ? 'ours-row' : ''}"><th scope="row">${escape(point.name)}</th><td>${fmt(point.y)}</td><td>${point.x.toFixed(1)}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderBenchmarkTable(model) {
    const maximums = data.benchmarks.map((_,index) => Math.max(...model.methods.map((method) => method.accuracy[index])));
    const maxAverage = Math.max(...model.methods.map((method) => method.average));
    $('#benchmark-table').innerHTML = `<caption>${escape(model.name)} · Table 1</caption><thead><tr><th scope="col">Method</th>${data.benchmarks.map((benchmark) => `<th scope="col">${escape(benchmark)}</th>`).join('')}<th scope="col">Avg.</th></tr></thead><tbody>${model.methods.map((method) => `<tr class="${method.group === 'ours' ? 'ours-row' : ''}"><th scope="row">${escape(method.name)}</th>${method.accuracy.map((value,index) => `<td class="${value === maximums[index] ? 'best' : ''}">${fmt(value)}</td>`).join('')}<td class="${method.average === maxAverage ? 'best' : ''}">${fmt(method.average)}</td></tr>`).join('')}</tbody>`;
  }

  function renderAblations(model) {
    const full = model.ablations[0];
    $('#ablation-table').innerHTML = `<caption>${escape(model.name)} · Table 2</caption><thead><tr><th scope="col">Variant</th><th scope="col">Accuracy (%) ↑</th><th scope="col">Loss vs. ACTS (pp)</th><th scope="col">Tokens (k) ↓</th></tr></thead><tbody>${model.ablations.map((variant,index) => {
      const loss = full.accuracy - variant.accuracy;
      return `<tr class="${index === 0 ? 'ours-row' : ''}"><th scope="row">${escape(variant.label)}${index === 0 ? ' · full model' : ''}</th><td>${fmt(variant.accuracy)}</td><td>${index === 0 ? '<span class="insight-label">Reference</span>' : `<span class="loss-track" aria-hidden="true"><span class="loss-fill" style="width:${Math.min(100,loss/7*100)}%"></span></span><span class="loss-value">−${fmt(loss)}</span>`}</td><td>${fmt(variant.tokens)}</td></tr>`;
    }).join('')}</tbody>`;
  }

  function render() {
    const model = currentModel();
    $$('[data-model]').forEach((button) => button.setAttribute('aria-pressed',String(button.dataset.model === modelId)));
    $$('[data-task]').forEach((button) => button.setAttribute('aria-pressed',String(button.dataset.task === taskId)));
    renderBars(model);
    renderScatter(model);
    renderBenchmarkTable(model);
    renderAblations(model);
  }
  $$('[data-model]').forEach((button) => button.addEventListener('click', () => { modelId = button.dataset.model; render(); }));
  $$('[data-task]').forEach((button) => button.addEventListener('click', () => { taskId = button.dataset.task; renderScatter(currentModel()); $$('[data-task]').forEach((item) => item.setAttribute('aria-pressed',String(item.dataset.task === taskId))); }));
  render();
})();
