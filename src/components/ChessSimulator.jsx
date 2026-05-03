import React, { useState } from 'react';

// ─── Chess piece unicode symbols ──────────────────────────────────────────────
const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
  '': '',
};

const FILES = ['a','b','c','d','e','f','g','h'];
const RANKS = ['8','7','6','5','4','3','2','1'];

// ─── Board snapshots & candidate move highlights per step ─────────────────────
// Row 0 = rank 8 (top), Row 7 = rank 1 (bottom)
const STEPS = [
  {
    label: 'Step 1 — Starting Position (Score = 0)',
    board: [
      ['bR','bN','bB','bQ','bK','bB','bN','bR'],
      ['bP','bP','bP','bP','bP','bP','bP','bP'],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['wP','wP','wP','wP','wP','wP','wP','wP'],
      ['wR','wN','wB','wQ','wK','wB','wN','wR'],
    ],
    // Candidate destination squares [row, col]
    candidates: [
      { move: 'e4',  dest: [4, 4], piece: 'wP' },
      { move: 'd4',  dest: [4, 3], piece: 'wP' },
      { move: 'Nf3', dest: [5, 5], piece: 'wN' },
    ],
    hint: 'Click a move below to highlight where the piece would land.',
  },
  {
    label: 'Step 2 — After e4 (Score = 5)',
    board: [
      ['bR','bN','bB','bQ','bK','bB','bN','bR'],
      ['bP','bP','bP','bP','bP','bP','bP','bP'],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  'wP','',  '',  ''],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['wP','wP','wP','wP','',  'wP','wP','wP'],
      ['wR','wN','wB','wQ','wK','wB','wN','wR'],
    ],
    candidates: [
      { move: 'Nf3', dest: [5, 5], piece: 'wN' },
      { move: 'Bc4', dest: [4, 2], piece: 'wB' },
      { move: 'd3',  dest: [5, 3], piece: 'wP' },
    ],
    hint: 'Click a move below to see where each piece would go.',
  },
  {
    label: 'Step 3 — After Nf3 (Score = 10)',
    board: [
      ['bR','bN','bB','bQ','bK','bB','bN','bR'],
      ['bP','bP','bP','bP','bP','bP','bP','bP'],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  '',  '',  '',  ''],
      ['',  '',  '',  '',  'wP','',  '',  ''],
      ['',  '',  '',  '',  '',  'wN','',  ''],
      ['wP','wP','wP','wP','',  'wP','wP','wP'],
      ['wR','wN','wB','wQ','wK','wB','',  'wR'],
    ],
    candidates: [
      { move: 'Bc4', dest: [4, 2], piece: 'wB' },
      { move: 'O-O', dest: [7, 6], piece: 'wK' },
      { move: 'd3',  dest: [5, 3], piece: 'wP' },
    ],
    hint: 'Click a move below to see where each piece would go.',
  },
];

// Colour for each candidate pill (purely cosmetic, no scoring info)
const PILL_COLORS = ['#2a5db0', '#7b4099', '#a05c14'];

export default function ChessSimulator() {
  const [stepIdx, setStepIdx]       = useState(0);
  const [selected, setSelected]     = useState(null); // index into candidates

  const step = STEPS[stepIdx];

  const handleStepChange = (i) => {
    setStepIdx(i);
    setSelected(null);
  };

  const handleSelect = (ci) => {
    setSelected(prev => (prev === ci ? null : ci));
  };

  // Build highlight set from selected candidate
  const highlightSquare = selected !== null
    ? `${step.candidates[selected].dest[0]},${step.candidates[selected].dest[1]}`
    : null;

  return (
    <div style={{
      background: '#d4d0c8',
      border: '2px solid #808080',
      borderTop: '2px solid #fff',
      borderLeft: '2px solid #fff',
      fontFamily: 'Tahoma, Arial, sans-serif',
      minWidth: 0,
    }}>
      {/* ── Title bar ── */}
      <div style={{
        background: 'linear-gradient(to right, #000080, #1084d0)',
        color: '#fff',
        padding: '5px 10px',
        fontWeight: 'bold',
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        userSelect: 'none',
      }}>
        <span style={{ fontSize: 14 }}>♟</span>
        Board Visualizer — Chess Position Reference
      </div>

      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* ── Step tabs ── */}
        <div style={{ display: 'flex', gap: 4 }}>
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleStepChange(i)}
              style={{
                flex: 1,
                padding: '4px 6px',
                fontSize: 11,
                fontWeight: i === stepIdx ? 'bold' : 'normal',
                background: i === stepIdx ? '#000080' : '#c0c0c0',
                color: i === stepIdx ? '#fff' : '#333',
                border: '2px outset #808080',
                cursor: 'pointer',
                fontFamily: 'Tahoma, Arial, sans-serif',
              }}
            >
              Step {i + 1}
            </button>
          ))}
        </div>

        {/* ── Step label ── */}
        <div style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: '#000080',
          borderBottom: '1px solid #aaa',
          paddingBottom: 4,
        }}>
          {step.label}
        </div>

        {/* ── Board + move pills side by side ── */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Board */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* Rank labels */}
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: 2 }}>
                {RANKS.map(r => (
                  <div key={r} style={{
                    width: 14, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: '#555', fontWeight: 'bold',
                  }}>{r}</div>
                ))}
              </div>

              {/* Squares */}
              <div style={{ border: '3px solid #333' }}>
                {step.board.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex' }}>
                    {row.map((piece, ci) => {
                      const isLight = (ri + ci) % 2 === 0;
                      const key = `${ri},${ci}`;
                      const isHighlighted = highlightSquare === key;

                      // Colour: highlighted square pops in blue, others are standard wood
                      const bg = isHighlighted
                        ? (isLight ? '#aad4ff' : '#4a90d9')
                        : (isLight ? '#f0d9b5' : '#b58863');

                      const isWhite = piece.startsWith('w');
                      return (
                        <div key={ci} style={{
                          width: 36, height: 36,
                          background: bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          lineHeight: 1,
                          color: isWhite ? '#fff' : '#111',
                          textShadow: isWhite
                            ? '0 0 2px #333, 0 0 2px #333'
                            : '0 0 1px rgba(255,255,255,0.5)',
                          outline: isHighlighted ? '3px solid #1a6fce' : 'none',
                          outlineOffset: '-3px',
                          position: 'relative',
                        }}>
                          {PIECES[piece] || ''}
                          {/* Ghost piece hint on highlighted empty square */}
                          {isHighlighted && !piece && selected !== null && (
                            <span style={{ opacity: 0.45, fontSize: 22 }}>
                              {PIECES[step.candidates[selected].piece]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* File labels */}
            <div style={{ display: 'flex', marginLeft: 16 }}>
              {FILES.map(f => (
                <div key={f} style={{
                  width: 36, textAlign: 'center',
                  fontSize: 10, color: '#555', fontWeight: 'bold',
                }}>{f}</div>
              ))}
            </div>
          </div>

          {/* ── Candidate move pills ── */}
          <div style={{ flex: 1, minWidth: 130, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Candidate Moves
            </div>
            {step.candidates.map((c, ci) => {
              const color = PILL_COLORS[ci];
              const isActive = selected === ci;
              return (
                <button
                  key={ci}
                  onClick={() => handleSelect(ci)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 10px',
                    background: isActive ? color : '#f0f0f0',
                    color: isActive ? '#fff' : '#222',
                    border: `2px solid ${isActive ? color : '#aaa'}`,
                    cursor: 'pointer',
                    fontFamily: 'Tahoma, Arial, sans-serif',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <span style={{
                    fontSize: 18,
                    color: isActive ? '#fff' : '#333',
                  }}>
                    {PIECES[c.piece]}
                  </span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', fontSize: 14 }}>
                    {c.move}
                  </span>
                  {isActive && (
                    <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.85 }}>
                      ← highlighted
                    </span>
                  )}
                </button>
              );
            })}

            {/* Hint text */}
            <div style={{
              marginTop: 4,
              padding: '7px 9px',
              background: '#fffff0',
              border: '1px solid #c8a000',
              fontSize: 11,
              lineHeight: 1.6,
              color: '#555',
              fontStyle: 'italic',
            }}>
              {step.hint}
            </div>
          </div>
        </div>

        {/* ── Prev / Next ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-win" style={{ fontSize: 12 }}
            onClick={() => handleStepChange(Math.max(0, stepIdx - 1))}
            disabled={stepIdx === 0}>
            ◀ Prev
          </button>
          <button className="btn-win" style={{ fontSize: 12 }}
            onClick={() => handleStepChange(Math.min(STEPS.length - 1, stepIdx + 1))}
            disabled={stepIdx === STEPS.length - 1}>
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}
