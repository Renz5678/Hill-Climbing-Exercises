import React, { useState } from 'react';
import SimulationPanel from './SimulationPanel';

// Tab bar for the three Exercise 1 variants
function VariantTabs({ variants }) {
  const [activeTab, setActiveTab] = useState(0);
  const v = variants[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* tab strip */}
      <div style={{ display: 'flex', background: '#c0c0c0', borderBottom: '2px solid #808080', flexShrink: 0 }}>
        {variants.map((vt, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '5px 14px',
              fontSize: 11,
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontWeight: activeTab === i ? 'bold' : 'normal',
              background: activeTab === i ? '#ffffff' : '#c0c0c0',
              border: 'none',
              borderTop:    activeTab === i ? '2px solid #ffffff' : '2px solid #c0c0c0',
              borderLeft:   '2px solid #808080',
              borderRight:  '2px solid #ffffff',
              borderBottom: activeTab === i ? '2px solid #ffffff' : 'none',
              cursor: 'pointer',
              marginBottom: activeTab === i ? -2 : 0,
              color: '#000',
            }}
          >
            V{i + 1}
          </button>
        ))}
      </div>

      {/* variant name */}
      <div style={{
        padding: '5px 10px',
        background: '#e8e8e8',
        fontSize: 12,
        fontWeight: 'bold',
        borderBottom: '1px solid #b0b0b0',
        flexShrink: 0,
        color: '#000080',
      }}>
        {v.name}
      </div>

      {/* simulation */}
      <div style={{ flex: 1, overflow: 'hidden', padding: 6 }}>
        <SimulationPanel
          key={activeTab}
          steps={v.steps}
          result={v.result}
          variantName={v.name}
          rule={v.rule}
        />
      </div>
    </div>
  );
}

// ─── Main Slide View ─────────────────────────────────────────────────────────
export default function SlideView({ exercise }) {
  const splitRatio = 0.35; // top (problem) gets 35%, bottom (simulation) 65%

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ── Problem statement ── */}
      <div
        className="panel-inset"
        style={{
          height: `${splitRatio * 100}%`,
          background: '#ffffff',
          overflowY: 'auto',
          padding: '14px 18px',
          flexShrink: 0,
          borderColor: '#808080',
        }}
      >
        <div style={{
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily: 'Tahoma, Arial, sans-serif',
          color: '#000',
        }}>
          {exercise.content}
        </div>

        {/* follow-up note if any */}
        {exercise.followUp && (
          <div style={{
            marginTop: 14,
            padding: '10px 14px',
            background: '#f0f0f0',
            borderLeft: '4px solid #000080',
            fontSize: 12,
            lineHeight: 1.7,
            color: '#333',
          }}>
            {exercise.followUp}
          </div>
        )}
      </div>

      {/* ── Divider label ── */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(to right, #000080, #1084d0)',
        color: '#fff',
        padding: '3px 12px',
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'Tahoma, Arial, sans-serif',
        letterSpacing: '0.5px',
      }}>
        ▶ STEP-BY-STEP SIMULATION &nbsp;—&nbsp; {exercise.algorithmLabel}
      </div>

      {/* ── Simulation ── */}
      <div style={{ flex: 1, overflow: 'hidden', padding: 8 }}>
        {exercise.hasVariants ? (
          <VariantTabs variants={exercise.variants} />
        ) : (
          <SimulationPanel
            steps={exercise.steps}
            result={exercise.result}
          />
        )}
      </div>

    </div>
  );
}
