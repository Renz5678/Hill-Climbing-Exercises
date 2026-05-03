import React from 'react';

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
    <b>x = 1, 0, 1, 2, 3, 2, 3</b>.
  </>
);

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
    Apply <b>Simple Hill Climbing</b>.
  </>
);

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
    followUp: (
      <>
        <b>Follow-Up:</b> Compare the results of all three variants. Which produced the best result, and why?
      </>
    ),
  },
  {
    id: 2,
    title: 'Exercise 2',
    subtitle: 'Chess Position Evaluation',
    algorithmLabel: 'Simple Hill Climbing',
    content: ex2Content,
  },
  {
    id: 3,
    title: 'Exercise 3',
    subtitle: 'Minimization Under Time Constraint',
    algorithmLabel: 'Simple Hill Climbing (minimisation)',
    content: ex3Content,
    followUp: (
      <>
        <b>Follow-Up:</b> Did the algorithm find the minimum within the time limit? If not, at what point did it terminate, and how much time would full convergence require?
      </>
    ),
  },
  {
    id: 4,
    title: 'Exercise 4',
    subtitle: 'Optimal Irrigation Schedule',
    algorithmLabel: 'Simple Hill Climbing',
    content: ex4Content,
  },
  {
    id: 5,
    title: 'Exercise 5',
    subtitle: 'Minimizing Cumulative Algorithm Cost',
    algorithmLabel: 'Simple Hill Climbing',
    content: ex5Content,
    followUp: (
      <>
        <b>Follow-Up:</b> Since no pipeline length gives exactly C(n) = 100, the algorithm cannot reach the goal precisely. At what value of n does it stop, and what does this reveal about using exact target values in discrete search spaces?
      </>
    ),
  },
];
