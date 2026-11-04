import React from 'react';
import { GanzhiCalculator } from '../../core/calculator/ganzhiCalculator';
import { ELEMENT_COLORS } from '../../core/constants/ganzhi';

interface Props {
  year: number;
  month: number; // 0-11
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

const CalendarGrid: React.FC<Props> = ({ year, month, onDateSelect, selectedDate }) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const days = [];
  // 空白セル
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} style={{ height: '80px' }} />);
  }

  // 日付セル
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const ganzhi = GanzhiCalculator.calculateForDate(date);
    const isSelected = date.toDateString() === selectedDate.toDateString();

    days.push(
      <div 
        key={d} 
        onClick={() => onDateSelect(date)}
        style={{ 
          height: '80px', 
          border: '1px solid #eee', 
          cursor: 'pointer', 
          position: 'relative',
          backgroundColor: isSelected ? '#FDFBF7' : 'transparent',
          transition: 'background 0.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ fontSize: '0.8rem', color: '#666' }}>{d}</span>
        <span style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold', 
          color: ELEMENT_COLORS[ganzhi.element] 
        }}>
          {ganzhi.combined}
        </span>
        {isSelected && (
          <div style={{ 
            position: 'absolute', 
            bottom: '4px', 
            width: '4px', 
            height: '4px', 
            backgroundColor: '#D4AF37', 
            borderRadius: '50%' 
          }} />
        )}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(7, 1fr)', 
      width: '100%', 
      backgroundColor: '#fff',
      border: '1px solid #eee'
    }}>
      {['日', '月', '火', '水', '木', '金', '土'].map(day => (
        <div key={day} style={{ 
          textAlign: 'center', 
          padding: '10px 0', 
          fontWeight: 'bold', 
          borderBottom: '2px solid #D4AF37',
          backgroundColor: '#f9f9f9' 
        }}>
          {day}
        </div>
      ))}
      {days}
    </div>
  );
};

export default CalendarGrid;
