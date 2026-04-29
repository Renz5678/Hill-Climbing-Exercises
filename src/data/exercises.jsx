import React from 'react';

// ── helper to build a step object ──────────────────────────────────────────
const step = (state, checks, decision, type) => ({ state, checks, decision, type });
// type: 'move' | 'reject' | 'stop' | 'goal'

// ══════════════════════════════════════════════════════════════════════════════
// EXERCISE 1  —  f(x) = −x⁴ + 8x³ − 18x² + 12x   (Goal = 20, Start x = 0)
// ══════════════════════════════════════════════════════════════════════════════
const ex1Content = (
  <>
    Given the function: <b>f(x) = −x⁴ + 8x³ − 18x² + 12x</b><br />
    <b>Goal:</b> f(x) = 20 &nbsp;|&nbsp; <b>Start:</b> x = 0<br />
    <b>Operators:</b> x + 1 (right), x − 1 (left)<br /><br />
    Apply all three hill climbing variants — <b>Simple, Steepest Ascent,</b> and{' '}
    <b>Stochastic</b> — starting from <b>x = 0</b>.<br />
    For Stochastic HC, the random neighbor sequence is:{' '}
    <b>x = 1, 2, 1, 3, 4, 5, 4</b>.
  </>
);

const ex1V1Steps = [
  step(
    'x = 0 | f(0) = 0',
    ['Check x + 1 = 1: f(1) = −1 + 8 − 18 + 12 = 1', '1 > 0 ✓ — first improving neighbor found'],
    '→ MOVE to x = 1',
    'move'
  ),
  step(
    'x = 1 | f(1) = 1',
    [
      'Check x + 1 = 2: f(2) = −16 + 64 − 72 + 24 = 0',
      '0 < 1 ✗ — not better',
      'Check x − 1 = 0: f(0) = 0',
      '0 < 1 ✗ — not better',
      'No improving neighbor found',
    ],
    '→ STOP  (local maximum)',
    'stop'
  ),
];

const ex1V2Steps = [
  step(
    'x = 0 | f(0) = 0',
    [
      'Evaluate ALL neighbors:',
      '  x + 1 = 1: f(1) = −1 + 8 − 18 + 12 = 1',
      '  x − 1 = −1: f(−1) = −1 − 8 − 18 − 12 = −39',
      'Best neighbor: x = 1 with f = 1',
      '1 > 0 ✓ — best neighbor is better than current',
    ],
    '→ MOVE to x = 1',
    'move'
  ),
  step(
    'x = 1 | f(1) = 1',
    [
      'Evaluate ALL neighbors:',
      '  x + 1 = 2: f(2) = −16 + 64 − 72 + 24 = 0',
      '  x − 1 = 0: f(0) = 0',
      'Best neighbor value = 0',
      '0 < 1 ✗ — no neighbor improves on current',
    ],
    '→ STOP  (local maximum)',
    'stop'
  ),
];

const ex1V3Steps = [
  step(
    'x = 0 | f(0) = 0',
    ['Random neighbor drawn: x = 1', 'f(1) = −1 + 8 − 18 + 12 = 1', '1 > 0 ✓ — strictly better'],
    '→ MOVE to x = 1',
    'move'
  ),
  step(
    'x = 1 | f(1) = 1',
    ['Random neighbor drawn: x = 2', 'f(2) = −16 + 64 − 72 + 24 = 0', '0 < 1 ✗ — not strictly better'],
    '→ STAY at x = 1',
    'reject'
  ),
  step(
    'x = 1 | f(1) = 1',
    ['Random neighbor drawn: x = 1', 'f(1) = 1 — equal, not strictly better'],
    '→ STAY at x = 1',
    'reject'
  ),
  step(
    'x = 1 | f(1) = 1',
    ['Random neighbor drawn: x = 3', 'f(3) = −81 + 216 − 162 + 36 = 9', '9 > 1 ✓ — strictly better'],
    '→ MOVE to x = 3',
    'move'
  ),
  step(
    'x = 3 | f(3) = 9',
    ['Random neighbor drawn: x = 4', 'f(4) = −256 + 512 − 288 + 48 = 16', '16 > 9 ✓ — strictly better'],
    '→ MOVE to x = 4',
    'move'
  ),
  step(
    'x = 4 | f(4) = 16',
    ['Random neighbor drawn: x = 5', 'f(5) = −625 + 1000 − 450 + 60 = −15', '−15 < 16 ✗ — not strictly better'],
    '→ STAY at x = 4',
    'reject'
  ),
  step(
    'x = 4 | f(4) = 16',
    ['Random neighbor drawn: x = 4', 'f(4) = 16 — equal, not strictly better', 'Sequence exhausted'],
    '→ STOP  (random sequence exhausted)',
    'stop'
  ),
];

// ══════════════════════════════════════════════════════════════════════════════
// EXERCISE 2  —  Chess Position Evaluation   (Goal = 15, Start = 0)
// ══════════════════════════════════════════════════════════════════════════════
const ex2Content = (
  <>
    A chess engine evaluates board positions with a numerical score.
    Only the <b>first move</b> that strictly improves the current score is accepted
    (Simple Hill Climbing).<br /><br />
    <b>Goal:</b> Score = 15 &nbsp;|&nbsp; <b>Start:</b> Score = 0<br /><br />
    <b>Available moves per step:</b><br />
    <b>Step 1</b> (score = 0): e4 → 5 &nbsp;|&nbsp; d4 → 3 &nbsp;|&nbsp; Nf3 → 7<br />
    <b>Step 2</b> (score = 5): Nf3 → 10 &nbsp;|&nbsp; Bc4 → 8 &nbsp;|&nbsp; d3 → 6<br />
    <b>Step 3</b> (score = 10): Bc4 → 15 &nbsp;|&nbsp; O-O → 12 &nbsp;|&nbsp; d3 → 9
  </>
);

const ex2Steps = [
  step(
    'Score = 0',
    [
      'Evaluate moves in order:',
      '  e4 → score = 5',
      '5 > 0 ✓ — first improving move found',
    ],
    '→ ACCEPT e4  (score: 0 → 5)',
    'move'
  ),
  step(
    'Score = 5  (after e4)',
    [
      'Evaluate moves in order:',
      '  Nf3 → score = 10',
      '10 > 5 ✓ — first improving move found',
    ],
    '→ ACCEPT Nf3  (score: 5 → 10)',
    'move'
  ),
  step(
    'Score = 10  (after Nf3)',
    [
      'Evaluate moves in order:',
      '  Bc4 → score = 15',
      '15 > 10 ✓ — first improving move found',
      '15 = Goal ✓ — goal reached!',
    ],
    '→ ACCEPT Bc4  (score: 10 → 15) — GOAL REACHED',
    'goal'
  ),
];

// ══════════════════════════════════════════════════════════════════════════════
// EXERCISE 3  —  f(x) = x² − 6x + 10   Minimisation, 60ms limit
// ══════════════════════════════════════════════════════════════════════════════
const ex3Content = (
  <>
    Given the function: <b>f(x) = x² − 6x + 10</b><br />
    <b>Goal:</b> f(x) = 0 &nbsp;|&nbsp; <b>Start:</b> x = 0, elapsed = 0 ms<br />
    <b>Time limit:</b> 60 ms &nbsp;|&nbsp; <b>Each step costs:</b> 10 ms<br />
    <b>Operators:</b> x + 1 (right, +10 ms), x − 1 (left, +10 ms)<br /><br />
    This is a <b>minimisation</b> problem — only move to a neighbor with a
    strictly <b>lower</b> value. Check x + 1 first.
  </>
);

const ex3Steps = [
  step(
    'x = 0 | f(0) = 10 | t = 0 ms',
    ['Check x + 1 = 1: f(1) = 1 − 6 + 10 = 5', '5 < 10 ✓ — strictly lower value'],
    '→ MOVE to x = 1  (t = 10 ms)',
    'move'
  ),
  step(
    'x = 1 | f(1) = 5 | t = 10 ms',
    ['Check x + 1 = 2: f(2) = 4 − 12 + 10 = 2', '2 < 5 ✓ — strictly lower value'],
    '→ MOVE to x = 2  (t = 20 ms)',
    'move'
  ),
  step(
    'x = 2 | f(2) = 2 | t = 20 ms',
    ['Check x + 1 = 3: f(3) = 9 − 18 + 10 = 1', '1 < 2 ✓ — strictly lower value'],
    '→ MOVE to x = 3  (t = 30 ms)',
    'move'
  ),
  step(
    'x = 3 | f(3) = 1 | t = 30 ms',
    [
      'Check x + 1 = 4: f(4) = 16 − 24 + 10 = 2',
      '2 > 1 ✗ — not lower',
      'Check x − 1 = 2: f(2) = 4 − 12 + 10 = 2',
      '2 > 1 ✗ — not lower',
      'No improving (lower) neighbor exists',
      'Note: time used = 30 ms of 60 ms — time limit was NOT the cause of stopping',
    ],
    '→ STOP  (local minimum — goal f = 0 is mathematically unreachable)',
    'stop'
  ),
];

// ══════════════════════════════════════════════════════════════════════════════
// EXERCISE 4  —  Y(i) = −5i² + 50i   Irrigation   (Goal = 150, Start i = 0)
// ══════════════════════════════════════════════════════════════════════════════
const ex4Content = (
  <>
    A farmer maximises weekly crop yield. Yield is modelled by:<br />
    <b>Y(i) = −5i² + 50i</b><br />
    where <b>i</b> = irrigations per week, <b>Y(i)</b> = yield in kg.<br /><br />
    <b>Goal:</b> Y(i) = 150 &nbsp;|&nbsp; <b>Start:</b> i = 0<br />
    <b>Operators:</b> i + 1 (irrigate more), i − 1 (irrigate less)<br /><br />
    Apply <b>Simple Hill Climbing</b> (check i + 1 first, accept first improvement).
  </>
);

const ex4Steps = [
  step(
    'i = 0 | Y(0) = 0',
    ['Check i + 1 = 1: Y(1) = −5(1) + 50(1) = 45', '45 > 0 ✓'],
    '→ MOVE to i = 1',
    'move'
  ),
  step(
    'i = 1 | Y(1) = 45',
    ['Check i + 1 = 2: Y(2) = −5(4) + 50(2) = −20 + 100 = 80', '80 > 45 ✓'],
    '→ MOVE to i = 2',
    'move'
  ),
  step(
    'i = 2 | Y(2) = 80',
    ['Check i + 1 = 3: Y(3) = −5(9) + 50(3) = −45 + 150 = 105', '105 > 80 ✓'],
    '→ MOVE to i = 3',
    'move'
  ),
  step(
    'i = 3 | Y(3) = 105',
    ['Check i + 1 = 4: Y(4) = −5(16) + 50(4) = −80 + 200 = 120', '120 > 105 ✓'],
    '→ MOVE to i = 4',
    'move'
  ),
  step(
    'i = 4 | Y(4) = 120',
    ['Check i + 1 = 5: Y(5) = −5(25) + 50(5) = −125 + 250 = 125', '125 > 120 ✓'],
    '→ MOVE to i = 5',
    'move'
  ),
  step(
    'i = 5 | Y(5) = 125',
    [
      'Check i + 1 = 6: Y(6) = −5(36) + 50(6) = −180 + 300 = 120',
      '120 < 125 ✗ — not better',
      'Check i − 1 = 4: Y(4) = 120',
      '120 < 125 ✗ — not better',
      'No improving neighbor exists',
      'Note: true maximum of Y(i) is 125 at i = 5; goal Y = 150 is unreachable',
    ],
    '→ STOP  (global maximum reached — goal Y = 150 is mathematically unreachable)',
    'stop'
  ),
];

// ══════════════════════════════════════════════════════════════════════════════
// EXERCISE 5  —  C(n) = n(n+1)(2n+1)/6   (Goal = 100, Start n = 1)
// ══════════════════════════════════════════════════════════════════════════════
const ex5Content = (
  <>
    A student benchmarks cumulative pipeline cost defined by:<br />
    <b>C(n) = n(n + 1)(2n + 1) / 6</b><br />
    where <b>n</b> = number of algorithms, <b>C(n)</b> = total operations.<br /><br />
    <b>Goal:</b> C(n) = 100 &nbsp;|&nbsp; <b>Start:</b> n = 1<br />
    <b>Operators:</b> n + 1 (add algorithm), n − 1 (remove algorithm)<br />
    <b>Rule:</b> Only move to a <b>higher</b> value that is closer to the goal of 100.<br /><br />
    Apply <b>Simple Hill Climbing</b> starting from <b>n = 1</b>.
  </>
);

const ex5Steps = [
  step(
    'n = 1 | C(1) = 1·2·3/6 = 1',
    ['Check n + 1 = 2: C(2) = 2·3·5/6 = 5', '5 > 1, closer to 100 ✓'],
    '→ MOVE to n = 2',
    'move'
  ),
  step(
    'n = 2 | C(2) = 5',
    ['Check n + 1 = 3: C(3) = 3·4·7/6 = 14', '14 > 5, closer to 100 ✓'],
    '→ MOVE to n = 3',
    'move'
  ),
  step(
    'n = 3 | C(3) = 14',
    ['Check n + 1 = 4: C(4) = 4·5·9/6 = 30', '30 > 14, closer to 100 ✓'],
    '→ MOVE to n = 4',
    'move'
  ),
  step(
    'n = 4 | C(4) = 30',
    ['Check n + 1 = 5: C(5) = 5·6·11/6 = 55', '55 > 30, closer to 100 ✓'],
    '→ MOVE to n = 5',
    'move'
  ),
  step(
    'n = 5 | C(5) = 55',
    ['Check n + 1 = 6: C(6) = 6·7·13/6 = 91', '91 > 55, closer to 100 ✓'],
    '→ MOVE to n = 6',
    'move'
  ),
  step(
    'n = 6 | C(6) = 91',
    [
      'Check n + 1 = 7: C(7) = 7·8·15/6 = 140',
      '140 > 100 — overshoots goal ✗ — not a valid improvement toward exact target',
      'Check n − 1 = 5: C(5) = 55',
      '55 < 91 ✗ — moving away from goal',
      'No neighbor strictly improves toward the exact goal of 100',
      'Note: no integer n satisfies C(n) = 100 exactly — goal is unreachable in discrete space',
    ],
    '→ STOP  (no exact solution exists; closest value is C(6) = 91)',
    'stop'
  ),
];

// ══════════════════════════════════════════════════════════════════════════════
// EXPORTED DATA
// ══════════════════════════════════════════════════════════════════════════════
export const exercises = [
  {
    id: 1,
    title: 'Exercise 1',
    subtitle: 'Simple Function Optimization',
    algorithmLabel: 'Hill Climbing — 3 Variants',
    content: ex1Content,
    hasVariants: true,
    variants: [
      {
        name: 'Variant 1 — Simple Hill Climbing',
        rule: 'Accept the first neighbor that is strictly better. Check x+1 first, then x−1.',
        steps: ex1V1Steps,
        result: { text: 'x = 1,  f(x) = 1', reached: false, note: 'Local maximum — goal NOT reached' },
      },
      {
        name: 'Variant 2 — Steepest Ascent Hill Climbing',
        rule: 'Evaluate ALL neighbors first, then move to the single best one.',
        steps: ex1V2Steps,
        result: { text: 'x = 1,  f(x) = 1', reached: false, note: 'Same local maximum — goal NOT reached' },
      },
      {
        name: 'Variant 3 — Stochastic Hill Climbing',
        rule: 'Accept a randomly chosen neighbor only if strictly better than current. Sequence: x = 1, 2, 1, 3, 4, 5, 4.',
        steps: ex1V3Steps,
        result: { text: 'x = 4,  f(x) = 16', reached: false, note: 'Best result among the three — goal NOT reached' },
      },
    ],
    followUp: (
      <>
        <b>Follow-Up:</b> Compare the three variants. Stochastic HC produced the best result (f = 16) because
        the random sequence jumped directly to x = 3, bypassing the valley at x = 2 (f = 0) that
        trapped both deterministic variants at x = 1. Simple and Steepest Ascent cannot escape local optima
        — Stochastic's randomness is its key advantage.
      </>
    ),
  },
  {
    id: 2,
    title: 'Exercise 2',
    subtitle: 'Chess Position Evaluation',
    algorithmLabel: 'Simple Hill Climbing',
    content: ex2Content,
    hasVariants: false,
    steps: ex2Steps,
    result: { text: 'Score = 15  (e4 → Nf3 → Bc4)', reached: true, note: 'Goal REACHED in 3 steps' },
  },
  {
    id: 3,
    title: 'Exercise 3',
    subtitle: 'Minimization Under Time Constraint',
    algorithmLabel: 'Simple Hill Climbing (minimisation)',
    content: ex3Content,
    hasVariants: false,
    steps: ex3Steps,
    result: { text: 'x = 3,  f(x) = 1,  time = 30 ms', reached: false, note: 'Local minimum — goal f = 0 is mathematically unreachable (no real root)' },
    followUp: (
      <>
        <b>Follow-Up:</b> The algorithm stopped at x = 3 with f(x) = 1 after only 30 ms — well within the
        60 ms limit. Time was <em>not</em> the limiting factor. The true minimum of f(x) = x² − 6x + 10 is
        f(3) = 1 (vertex of the parabola). The discriminant 36 − 40 = −4 &lt; 0, so f(x) = 0 has no
        real solution. The goal itself was mathematically impossible.
      </>
    ),
  },
  {
    id: 4,
    title: 'Exercise 4',
    subtitle: 'Optimal Irrigation Schedule',
    algorithmLabel: 'Simple Hill Climbing',
    content: ex4Content,
    hasVariants: false,
    steps: ex4Steps,
    result: { text: 'i = 5,  Y(i) = 125', reached: false, note: 'True global maximum (125) found — goal Y = 150 is mathematically unreachable' },
  },
  {
    id: 5,
    title: 'Exercise 5',
    subtitle: 'Minimizing Cumulative Algorithm Cost',
    algorithmLabel: 'Simple Hill Climbing',
    content: ex5Content,
    hasVariants: false,
    steps: ex5Steps,
    result: { text: 'n = 6,  C(n) = 91', reached: false, note: 'No integer n satisfies C(n) = 100 — goal unreachable in discrete space' },
    followUp: (
      <>
        <b>Follow-Up:</b> The algorithm stops at n = 6 with C(6) = 91. Moving to n = 7 gives C = 140,
        which overshoots the exact target of 100 and is not accepted. This reveals a fundamental
        limitation of hill climbing in discrete spaces: when the exact goal falls between two discrete
        states, the algorithm halts just below the target. Goals should be defined as ranges (e.g.,
        C(n) ≥ 100) rather than exact values.
      </>
    ),
  },
];
