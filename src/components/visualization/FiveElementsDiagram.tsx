import React from 'react';
import { ELEMENT_COLORS } from '../../core/constants/ganzhi';
import { Element } from '../../core/types';

const ELEMENTS: Element[] = ['木', '火', '土', '金', '水'];

const FiveElementsDiagram: React.FC = () => {
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const getPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* 相生関係 (Generating - Green Arrows) */}
        <g stroke="#4B7D4B" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-gen)">
          {ELEMENTS.map((_, i) => {
            const start = getPosition(i);
            const end = getPosition((i + 1) % 5);
            return (
              <path 
                key={`gen-${i}`} 
                d={`M ${start.x} ${start.y} A ${radius * 0.8} ${radius * 0.8} 0 0 1 ${end.x} ${end.y}`} 
              />
            );
          })}
        </g>

        {/* 相剋関係 (Controlling - Red Arrows) */}
        <g stroke="#C0392B" strokeWidth="1.5" fill="none" strokeDasharray="4 2" markerEnd="url(#arrowhead-con)">
          {ELEMENTS.map((_, i) => {
            const start = getPosition(i);
            const end = getPosition((i + 2) % 5);
            return (
              <line 
                key={`con-${i}`} 
                x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
              />
            );
          })}
        </g>

        {/* 要素ノード */}
        {ELEMENTS.map((el, i) => {
          const { x, y } = getPosition(i);
          return (
            <g key={el}>
              <circle cx={x} cy={y} r="18" fill="#fff" stroke={ELEMENT_COLORS[el]} strokeWidth="3" />
              <text 
                x={x} y={y} 
                textAnchor="middle" 
                dominantBaseline="central" 
                fill={ELEMENT_COLORS[el]} 
                style={{ fontWeight: 'bold', fontSize: '14px' }}
              >
                {el}
              </text>
            </g>
          );
        })}

        {/* 矢印定義 */}
        <defs>
          <marker id="arrowhead-gen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4B7D4B" />
          </marker>
          <marker id="arrowhead-con" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#C0392B" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default FiveElementsDiagram;
