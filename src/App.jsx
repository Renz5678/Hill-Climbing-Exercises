import React, { useState } from 'react';
import WindowBar from './components/WindowBar';
import SlideView  from './components/SlideView';
import { exercises } from './data/exercises';

const MENUS = ['File', 'Edit', 'View', 'Help'];

// Icons for each exercise (Win98-style coloured squares)
const ICONS = ['📐', '♟', '⏱', '🌾', '⚙'];

export default function App() {
  const [current, setCurrent] = useState(0);
  const ex = exercises[current];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#c0c0c0',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}>
      {/* ── Title / Menu bar ── */}
      <WindowBar
        title={`Hill Climbing Algorithms — ${ex.title}: ${ex.subtitle}`}
        menus={MENUS}
      />

      {/* ── Main area: sidebar + slide ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <div className="panel-inset" style={{
          width: 210,
          flexShrink: 0,
          background: '#c0c0c0',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderTop: 'none',
          borderLeft: 'none',
          borderBottom: 'none',
        }}>
          {/* sidebar header */}
          <div style={{
            background: 'linear-gradient(to right, #000080, #1084d0)',
            color: '#fff',
            padding: '5px 8px',
            fontSize: 11,
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            userSelect: 'none',
          }}>
            EXERCISES
          </div>

          {/* slide list */}
          {exercises.map((e, i) => (
            <div
              key={e.id}
              className={`slide-item${current === i ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              style={{ padding: '8px 10px', fontSize: 12, cursor: 'pointer', lineHeight: 1.4 }}
            >
              <span style={{ fontSize: 15, marginRight: 6 }}>{ICONS[i]}</span>
              <div>
                <div style={{ fontWeight: 'bold' }}>{e.title}</div>
                <div style={{ fontSize: 10, opacity: 0.85, marginTop: 1 }}>{e.subtitle}</div>
              </div>
            </div>
          ))}

          {/* spacer */}
          <div style={{ flex: 1 }} />

          {/* navigation hint */}
          <div style={{
            padding: '8px',
            fontSize: 10,
            color: '#555',
            borderTop: '1px solid #b0b0b0',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            Use <b>Next ▶</b> to step through each simulation
          </div>
        </div>

        {/* ── Slide content ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#c0c0c0',
          padding: 8,
          gap: 0,
        }}>
          {/* slide title bar */}
          <div className="panel-raised" style={{ flexShrink: 0, marginBottom: 6 }}>
            <div style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              color: '#fff',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontWeight: 'bold', fontSize: 15, fontFamily: '"EB Garamond", serif' }}>
                {ICONS[current]}&nbsp; {ex.title}: {ex.subtitle}
              </span>
              <span style={{
                fontSize: 11,
                background: 'rgba(255,255,255,0.2)',
                padding: '2px 10px',
                border: '1px solid rgba(255,255,255,0.4)',
              }}>
                {current + 1} / {exercises.length}
              </span>
            </div>
          </div>

          {/* the actual slide */}
          <div className="panel-raised" style={{ flex: 1, overflow: 'hidden', background: '#ffffff' }}>
            <SlideView key={current} exercise={ex} />
          </div>

          {/* ── Slide nav buttons ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 6,
          }}>
            <button
              className="btn-win"
              disabled={current === 0}
              onClick={() => setCurrent(c => c - 1)}
              style={{ fontSize: 12, padding: '4px 16px' }}
            >
              ◀ Previous Exercise
            </button>

            <span style={{ fontSize: 11, color: '#555' }}>
              {ex.algorithmLabel}
            </span>

            <button
              className="btn-win"
              disabled={current === exercises.length - 1}
              onClick={() => setCurrent(c => c + 1)}
              style={{ fontSize: 12, padding: '4px 16px' }}
            >
              Next Exercise ▶
            </button>
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div style={{ display: 'flex', borderTop: '1px solid #808080', padding: '2px', background: '#c0c0c0', flexShrink: 0 }}>
        <div className="status-field" style={{ flex: 1 }}>
          {ex.title} — {ex.subtitle}
        </div>
        <div className="status-field" style={{ width: 160 }}>
          Algorithm: {ex.algorithmLabel}
        </div>
        <div className="status-field" style={{ width: 100 }}>
          Slide {current + 1} of {exercises.length}
        </div>
      </div>
    </div>
  );
}
