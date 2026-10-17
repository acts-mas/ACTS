/* Dependency-free, illustrative ACTS communication sequence. */
(() => {
  'use strict';

  const root = document.getElementById('topology-demo');
  if (!root) return;

  const states = [
    {
      name: 'Exchange',
      title: 'Build a shared view.',
      text: 'Communication can connect all three roles, allowing agents to exchange complementary reasoning before deciding what to do next.',
      detail: 'The illustration begins with every directed link selected.',
      edges: ['sq', 'qs', 'sv', 'vs', 'qv', 'vq'],
      modes: ['broadcast', 'broadcast', 'broadcast'],
      note: 'All three agents communicate',
      number: '01',
    },
    {
      name: 'Select',
      title: 'Keep useful exchanges.',
      text: 'With attn-broadcast, agents select recipients whose attention scores are above the eligible-candidate mean. Each agent here selects one of two eligible peers.',
      detail: 'All three agents remain eligible. The selected links form an illustrative directed cycle.',
      edges: ['qs', 'sv', 'vq'],
      modes: ['attn.', 'attn.', 'attn.'],
      note: 'Three selected links · attn-broadcast',
      number: '02',
    },
    {
      name: 'Stop',
      title: 'Stop when the team is ready.',
      text: 'An off action makes no LLM call. In this illustration, two of the three agents select off, triggering the majority-off stopping rule.',
      detail: 'The remaining solo selection is different from off; once the stopping rule is met, the rollout ends.',
      edges: [],
      modes: ['off', 'off', 'solo'],
      note: 'Majority off · rollout ends',
      number: '03',
    },
  ];

  const edges = [
    ['sq', 'M 138 152 Q 233 67 331 80'],
    ['qs', 'M 335 109 Q 236 172 148 171'],
    ['sv', 'M 147 188 Q 248 198 336 247'],
    ['vs', 'M 334 290 Q 222 300 130 208'],
    ['qv', 'M 397 117 Q 449 178 397 242'],
    ['vq', 'M 359 231 Q 334 180 359 129'],
  ];
  const roles = [
    { letter: 'S', role: 'Independent Solver', x: 108, y: 174, labelY: 235 },
    { letter: 'Q', role: 'Questioner', x: 370, y: 90, labelY: 29 },
    { letter: 'T', role: 'Team Solver', x: 370, y: 270, labelY: 331 },
  ];

  root.classList.add('td-root');
  root.innerHTML = `
    <div class="td-topbar">
      <p class="td-eyebrow">Adaptive communication</p>
      <div class="td-steps" role="group" aria-label="Explore the illustrative communication sequence">
        ${states.map((state, index) => `<button class="td-step" type="button" data-td-step="${index}" aria-pressed="${index === 0}" aria-controls="td-explanation"><span class="td-step-number" aria-hidden="true">${index + 1}</span>${state.name}</button>`).join('')}
      </div>
    </div>
    <div class="td-body">
      <div class="td-graphic">
        <div class="td-chart-header"><span>Selected communication links</span><span class="td-link-count" aria-hidden="true"><b class="td-link-number">6</b> directed links</span></div>
        <svg class="td-svg" viewBox="0 0 510 350" role="img" aria-labelledby="td-svg-title td-svg-description">
          <title id="td-svg-title">Illustrative communication among three agent roles</title>
          <desc id="td-svg-description">All three agents communicate through six directed links.</desc>
          <defs>
            <marker id="td-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M 1 1 L 9 5 L 1 9 Z" fill="#176b50" /></marker>
            <marker id="td-arrow-warm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M 1 1 L 9 5 L 1 9 Z" fill="#dd8a52" /></marker>
          </defs>
          <path class="td-guide" d="M 108 174 L 370 90 L 370 270 Z" />
          <g class="td-edges">${edges.map(([id, path]) => `<path class="td-edge" data-td-edge="${id}" d="${path}" marker-end="url(#td-arrow-green)" />`).join('')}</g>
          ${roles.map((role, index) => `
            <g class="td-node td-node-talk" data-td-node="${index}">
              <circle class="td-node-halo" cx="${role.x}" cy="${role.y}" r="43" />
              <circle class="td-node-ring" cx="${role.x}" cy="${role.y}" r="33" />
              <text class="td-node-letter" x="${role.x}" y="${role.y - 2}">${role.letter}</text>
              <text class="td-node-mode" x="${role.x}" y="${role.y + 16}">broadcast</text>
              <text class="td-node-label" x="${role.x}" y="${role.labelY}">${role.role}</text>
            </g>`).join('')}
        </svg>
        <p class="td-graphic-note"><span class="td-status-dot" aria-hidden="true"></span><span class="td-state-note">All three agents communicate</span></p>
      </div>
      <div class="td-explanation" id="td-explanation">
        <span class="td-state-number" aria-hidden="true">01 / 03</span>
        <h3 class="td-title">Build a shared view.</h3>
        <p class="td-description">${states[0].text}</p>
        <p class="td-detail">${states[0].detail}</p>
        <div class="td-modes" aria-label="Action definitions">
          <span><b class="td-mode-talk">attn.</b> attn-broadcast</span>
          <span><b class="td-mode-solo">solo</b> reason independently</span>
          <span><b class="td-mode-off">off</b> no LLM call</span>
        </div>
      </div>
    </div>
    <p class="td-disclaimer">Illustrative sequence, not an experimental trajectory.</p>
    <p class="td-sr-only" aria-live="polite" aria-atomic="true"></p>
  `;

  const buttons = [...root.querySelectorAll('.td-step')];
  const edgePaths = [...root.querySelectorAll('.td-edge')];
  const nodes = [...root.querySelectorAll('.td-node')];
  const live = root.querySelector('.td-sr-only');
  let current = 0;

  function select(index, announce = true) {
    const state = states[index];
    current = index;
    root.dataset.tdState = state.name.toLowerCase();
    buttons.forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(buttonIndex === index)));
    edgePaths.forEach((path) => {
      const id = path.dataset.tdEdge;
      const isVisible = state.edges.includes(id);
      const isWarm = index === 1 && id === 'sv';
      path.classList.toggle('td-edge-hidden', !isVisible);
      path.classList.toggle('td-edge-warm', isWarm);
      path.setAttribute('marker-end', `url(#td-arrow-${isWarm ? 'warm' : 'green'})`);
    });
    nodes.forEach((node, nodeIndex) => {
      const mode = state.modes[nodeIndex];
      node.setAttribute('class', `td-node td-node-${mode === 'off' || mode === 'solo' ? mode : 'talk'}`);
      node.querySelector('.td-node-mode').textContent = mode;
    });
    root.querySelector('.td-link-number').textContent = String(state.edges.length);
    root.querySelector('.td-state-number').textContent = `${state.number} / 03`;
    root.querySelector('.td-title').textContent = state.title;
    root.querySelector('.td-description').textContent = state.text;
    root.querySelector('.td-detail').textContent = state.detail;
    root.querySelector('.td-state-note').textContent = state.note;
    const accessibleSummary = `${state.name}. ${state.edges.length} directed communication links. ${roles.map((role, i) => `${role.role}: ${state.modes[i] === 'attn.' ? 'attn-broadcast' : state.modes[i]}`).join('. ')}. ${state.text} ${state.detail}`;
    root.querySelector('#td-svg-description').textContent = accessibleSummary;
    if (announce) live.textContent = accessibleSummary;
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => select(index)));
  root.querySelector('.td-steps').addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % states.length;
    else if (event.key === 'ArrowLeft') next = (current + states.length - 1) % states.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = states.length - 1;
    else return;
    event.preventDefault();
    select(next);
    buttons[next].focus();
  });

  select(0, false);
})();
