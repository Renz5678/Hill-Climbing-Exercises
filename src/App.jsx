import React from 'react';
import { exercises } from './data/exercises';

// Icons for each exercise
const ICONS = ['📐', '♟', '⏱', '🌾', '⚙'];

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#c0c0c0',
      fontFamily: 'Tahoma, Arial, sans-serif',
      margin: 0,
      padding: 0,
    }}>
      {/* ── Title bar ── */}
      <div style={{
        background: 'linear-gradient(to right, #000080, #1084d0)',
        color: '#fff',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
      }}>
        <span style={{ fontSize: 18 }}>🏔</span>
        <span style={{ fontWeight: 'bold', fontSize: 14, letterSpacing: '0.5px' }}>
          Hill Climbing Algorithms — Questionnaire
        </span>
      </div>

      {/* ── Questions ── */}
      <div style={{ padding: '24px 24px 48px' }}>
        {exercises.map((ex, i) => (
          <div
            key={ex.id}
            className="panel-raised"
            style={{ marginBottom: 24, background: '#ffffff', overflow: 'hidden' }}
          >
            {/* question header */}
            <div style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              color: '#fff',
              padding: '7px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>{ICONS[i]}</span>
              <span style={{ fontWeight: 'bold', fontSize: 13 }}>
                {ex.title}: {ex.subtitle}
              </span>
              <span style={{
                marginLeft: 'auto',
                fontSize: 10,
                background: 'rgba(255,255,255,0.2)',
                padding: '2px 8px',
                border: '1px solid rgba(255,255,255,0.4)',
              }}>
                {ex.algorithmLabel}
              </span>
            </div>

            {/* question body */}
            <div style={{ padding: '28px 32px', fontSize: 16, lineHeight: 2, color: '#000' }}>
              {ex.content}
            </div>

            {/* follow-up note if any */}
            {ex.followUp && (
              <div style={{
                margin: '0 32px 28px',
                padding: '10px 14px',
                background: '#f0f0f0',
                borderLeft: '4px solid #000080',
                fontSize: 14,
                lineHeight: 1.7,
                color: '#333',
              }}>
                {ex.followUp}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
