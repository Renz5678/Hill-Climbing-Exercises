import React, { useState, useEffect, useRef } from 'react';

const TYPE_COLORS = {
  move:   { bg: '#d4edda', border: '#28a745', text: '#155724', badge: '✓ MOVE',   badgeBg: '#28a745' },
  reject: { bg: '#fff3cd', border: '#ffc107', text: '#856404', badge: '✗ STAY',   badgeBg: '#e0a800' },
  stop:   { bg: '#f8d7da', border: '#dc3545', text: '#721c24', badge: '■ STOP',   badgeBg: '#dc3545' },
  goal:   { bg: '#cce5ff', border: '#004085', text: '#004085', badge: '★ GOAL',   badgeBg: '#004085' },
};

export default function SimulationPanel({ steps, result, variantName, rule }) {
  const [revealed, setRevealed] = useState(0); // how many steps are shown (0 = none)
  const logRef = useRef(null);

  // reset when steps/variant changes
  useEffect(() => {
    setRevealed(0);
  }, [steps, variantName]);

  // auto-scroll to bottom when a new step appears
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [revealed]);

  const canNext  = revealed < steps.length;
  const canPrev  = revealed > 0;
  const finished = revealed === steps.length;

  const handleNext  = () => canNext  && setRevealed(r => r + 1);
  const handlePrev  = () => canPrev  && setRevealed(r => r - 1);
  const handleReset = () => setRevealed(0);
  const handleAll   = () => setRevealed(steps.length);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ── Rule banner ── */}
      {rule && (
        <div className="panel-inset" style={{
          background: '#fffff0',
          padding: '5px 10px',
          fontSize: 12,
          fontFamily: 'Tahoma, Arial, sans-serif',
          borderColor: '#808080',
          flexShrink: 0,
          lineHeight: 1.4,
        }}>
          <span style={{ fontWeight: 'bold', color: '#000080' }}>Rule: </span>
          {rule}
        </div>
      )}

      {/* ── Step counter ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 8px',
        background: '#d4d0c8',
        borderBottom: '1px solid #808080',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 'bold' }}>
          Step {Math.min(revealed, steps.length)} / {steps.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn-win" style={{ fontSize: 11 }} onClick={handleReset} disabled={!canPrev}>
            ↺ Reset
          </button>
          <button className="btn-win" style={{ fontSize: 11 }} onClick={handlePrev} disabled={!canPrev}>
            ◀ Prev
          </button>
          <button className="btn-win" style={{ fontSize: 11 }} onClick={handleNext} disabled={!canNext}>
            Next ▶
          </button>
          <button className="btn-win" style={{ fontSize: 11 }} onClick={handleAll} disabled={!canNext}>
            All ▶▶
          </button>
        </div>
      </div>

      {/* ── Log area ── */}
      <div
        ref={logRef}
        className="panel-inset"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {revealed === 0 && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#808080',
            fontStyle: 'italic',
            fontSize: 13,
          }}>
            Press <strong style={{ margin: '0 6px' }}>Next ▶</strong> to begin the simulation…
          </div>
        )}

        {steps.slice(0, revealed).map((s, idx) => {
          const isCurrent = idx === revealed - 1;
          const colors = TYPE_COLORS[s.type] || TYPE_COLORS.stop;
          return (
            <div
              key={idx}
              style={{
                border: `2px solid ${isCurrent ? colors.border : '#b0b0b0'}`,
                background: isCurrent ? colors.bg : '#f5f5f5',
                borderRadius: 2,
                overflow: 'hidden',
                opacity: isCurrent ? 1 : 0.75,
                transition: 'opacity 0.2s',
              }}
            >
              {/* step header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 8px',
                background: isCurrent ? colors.border : '#c8c8c8',
                color: isCurrent ? '#fff' : '#333',
              }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', fontSize: 12 }}>
                  STEP {idx + 1} &nbsp;|&nbsp; {s.state}
                </span>
                {isCurrent && (
                  <span style={{
                    background: colors.badgeBg,
                    color: '#fff',
                    padding: '1px 8px',
                    fontSize: 11,
                    fontWeight: 'bold',
                    border: '1px solid rgba(0,0,0,0.2)',
                  }}>
                    {colors.badge}
                  </span>
                )}
              </div>

              {/* checks */}
              <div style={{ padding: '6px 10px', fontFamily: 'Courier New, monospace', fontSize: 12, lineHeight: 1.7 }}>
                {s.checks.map((line, li) => (
                  <div key={li} style={{ color: isCurrent ? colors.text : '#555' }}>
                    {line}
                  </div>
                ))}
              </div>

              {/* decision */}
              <div style={{
                padding: '4px 10px',
                borderTop: `1px solid ${isCurrent ? colors.border : '#ccc'}`,
                fontFamily: 'Courier New, monospace',
                fontWeight: 'bold',
                fontSize: 12,
                color: isCurrent ? colors.text : '#555',
                background: isCurrent ? `${colors.bg}cc` : '#ebebeb',
              }}>
                {s.decision}
              </div>
            </div>
          );
        })}

        {/* ── Result banner ── */}
        {finished && result && (
          <div style={{
            border: `2px solid ${result.reached ? '#004085' : '#721c24'}`,
            background: result.reached ? '#cce5ff' : '#f8d7da',
            padding: '10px 14px',
            marginTop: 4,
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: 13,
              color: result.reached ? '#004085' : '#721c24',
              marginBottom: 4,
            }}>
              {result.reached ? '★ RESULT — GOAL REACHED' : '■ RESULT — ALGORITHM TERMINATED'}
            </div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: 13, fontWeight: 'bold' }}>
              {result.text}
            </div>
            <div style={{ fontSize: 12, marginTop: 4, color: '#333' }}>
              {result.note}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
