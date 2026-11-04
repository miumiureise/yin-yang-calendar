import React from 'react';
import { Element, Meishiki } from '../../core/types';
import { ELEMENT_COLORS } from '../../core/constants/ganzhi';

interface Props {
  meishiki: Meishiki;
}

const BalanceChart: React.FC<Props> = ({ meishiki }) => {
  const elements: Element[] = ['木', '火', '土', '金', '水'];
  const maxVal = Math.max(...Object.values(meishiki.balance), 1);

  return (
    <div style={{ margin: '20px 0', textAlign: 'left' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>五行バランス</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {elements.map(el => {
          const val = meishiki.balance[el] || 0;
          const width = (val / maxVal) * 100;
          return (
            <div key={el} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '20px', fontWeight: 'bold' }}>{el}</span>
              <div style={{ flex: 1, backgroundColor: '#eee', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${width}%`, 
                  backgroundColor: ELEMENT_COLORS[el], 
                  height: '100%', 
                  transition: 'width 0.5s ease-out' 
                }} />
              </div>
              <span style={{ width: '20px', textAlign: 'right', fontSize: '0.8rem' }}>{val}</span>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '10px' }}>
        ※ 本計算は簡易的な数え上げ方式に基づいています。季節や蔵干などの詳細分析は今後のアップデートで実装予定です。
      </p>
    </div>
  );
};

export default BalanceChart;
