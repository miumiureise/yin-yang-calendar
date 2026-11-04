import React, { useState, useEffect } from 'react';
import { GanzhiCalculator } from './core/calculator/ganzhiCalculator';
import { FortuneCalculator, Meishiki } from './core/calculator/fortuneCalculator';
import { ELEMENT_COLORS } from './core/constants/ganzhi';
import FiveElementsDiagram from './components/visualization/FiveElementsDiagram';
import CalendarGrid from './components/calendar/CalendarGrid';
import BalanceChart from './components/visualization/BalanceChart';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState<number | undefined>(undefined);
  const [personalMeishiki, setPersonalMeishiki] = useState<Meishiki | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'analysis' | 'calendar'>('home');

  const ganzhi = GanzhiCalculator.calculateForDate(selectedDate);

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewYear, viewMonth + offset, 1);
    setViewMonth(newDate.getMonth());
    setViewYear(newDate.getFullYear());
  };

  const handleAnalyzePersonal = () => {
    if (!birthDate) return;
    const date = new Date(birthDate);
    const result = FortuneCalculator.calculateMeishiki(date, birthHour);
    setPersonalMeishiki(result);
    setActiveTab('analysis');
  };

  return (
    <div style={{ 
      backgroundColor: '#FDFBF7', 
      color: '#2D2D2D', 
      minHeight: '100vh', 
      padding: '0 0 80px 0', // Space for bottom nav
      fontFamily: '"Sawarabi Mincho", "Yu Mincho", serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <header style={{ 
        textAlign: 'center', 
        padding: '40px 20px 20px', 
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderBottom: '1px solid #eee'
      }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold', margin: '0', letterSpacing: '0.1em' }}>陰陽五行カレンダー</h1>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>伝統的な暦法に基づく日々のリズム</p>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        
        {activeTab === 'home' && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ 
              padding: '30px 20px', 
              border: '1px solid #D4AF37', 
              borderRadius: '20px', 
              backgroundColor: '#fff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              textAlign: 'center',
              marginBottom: '30px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', 
                background: `linear-gradient(90deg, #D4AF37, #fdfbf7, #D4AF37)` 
              }} />
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                {selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div style={{ 
                fontSize: '4rem', 
                fontWeight: 'bold', 
                margin: '10px 0',
                color: ELEMENT_COLORS[ganzhi.element],
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {ganzhi.combined}
              </div>
              <p style={{ fontSize: '1.1rem', marginBottom: '25px' }}>
                属性: <span style={{ color: ELEMENT_COLORS[ganzhi.element], fontWeight: 'bold' }}>{ganzhi.element}</span> | 陰陽: {ganzhi.yinYang}
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '20px', 
                paddingTop: '20px',
                borderTop: '1px solid #f0f0f0'
              }}>
                <FiveElementsDiagram />
                <div style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.8', color: '#444', padding: '0 10px' }}>
                  <strong style={{ fontSize: '1rem', display: 'block', textAlign: 'center', marginBottom: '10px' }}>今日の五行解説</strong>
                  今日は「{ganzhi.element}」の性質が強い日です。
                  {ganzhi.element === '木' && '成長と発展、新たな始まりを意味します。'}
                  {ganzhi.element === '火' && '情熱と拡散、エネルギーの爆発を意味します。'}
                  {ganzhi.element === '土' && '安定と調和、基盤を固めることを意味します。'}
                  {ganzhi.element === '金' && '凝縮と決断、整理整頓を意味します。'}
                  {ganzhi.element === '水' && '知恵と流動、内省と準備を意味します。'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ 
              padding: '25px', 
              backgroundColor: '#fff', 
              border: '1px solid #eee', 
              borderRadius: '20px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '25px', letterSpacing: '0.05em' }}>命式分析</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', marginLeft: '5px' }}>生年月日</label>
                  <input 
                    type="date" 
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)}
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', marginLeft: '5px' }}>出生時刻 (時)</label>
                  <input 
                    type="number" 
                    placeholder="例: 14" 
                    value={birthHour === undefined ? '' : birthHour} 
                    onChange={(e) => setBirthHour(e.target.value === '' ? undefined : parseInt(e.target.value))}
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
                  />
                </div>
                <button 
                  onClick={handleAnalyzePersonal}
                  style={{ 
                    padding: '15px', 
                    backgroundColor: '#D4AF37', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '10px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: '0 4px 10px rgba(212, 175, 55, 0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                  onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  命式を算出する
                </button>
              </div>

              {personalMeishiki && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', animation: 'slideUp 0.5s ease-out' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', width: '100%' }}>
                    {[
                      { name: '年柱', data: personalMeishiki.yearPillar },
                      { name: '月柱', data: personalMeishiki.monthPillar },
                      { name: '日柱', data: personalMeishiki.dayPillar },
                      { name: '時柱', data: personalMeishiki.hourPillar },
                    ].map(p => p.data ? (
                      <div key={p.name} style={{ 
                        padding: '20px', 
                        border: '1px solid #D4AF37', 
                        borderRadius: '15px', 
                        textAlign: 'center', 
                        backgroundColor: '#fcfcfc'
                      }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>{p.name}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: ELEMENT_COLORS[p.data.ganzhi.element] }}>
                          {p.data.ganzhi.combined}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{p.data.ganzhi.element}</div>
                      </div>
                    ) : (
                      <div key={p.name} style={{ 
                        padding: '20px', 
                        border: '1px dashed #ccc', 
                        borderRadius: '15px', 
                        textAlign: 'center', 
                        color: '#aaa'
                      }}>
                        <div style={{ fontSize: '0.8rem' }}>{p.name}</div>
                        <div style={{ fontSize: '1.2rem' }}>未確定</div>
                      </div>
                    ))}
                  </div>
                  <BalanceChart meishiki={personalMeishiki} />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => changeMonth(-1)} style={{ padding: '10px 15px', cursor: 'pointer', borderRadius: '10px', border: '1px solid #D4AF37', background: 'white', fontSize: '0.9rem' }}>← 前月</button>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{viewYear}年 {viewMonth + 1}月</h2>
              <button onClick={() => changeMonth(1)} style={{ padding: '10px 15px', cursor: 'pointer', borderRadius: '10px', border: '1px solid #D4AF37', background: 'white', fontSize: '0.9rem' }}>次月 →</button>
            </div>
            <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
              <CalendarGrid 
                year={viewYear} 
                month={viewMonth} 
                selectedDate={selectedDate} 
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setActiveTab('home');
                }} 
              />
            </div>
          </div>
        )}
      </main>

      {/* 下部ナビゲーション */}
      <nav style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '70px', 
        backgroundColor: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(10px)', 
        borderTop: '1px solid #eee', 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        zIndex: 1000
      }}>
        {[
          { id: 'home', label: '今日', icon: '🌙' },
          { id: 'analysis', label: '分析', icon: '⚖️' },
          { id: 'calendar', label: '暦', icon: '📅' },
        ].map(tab => (
          <div 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id as any)}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              cursor: 'pointer', 
              color: activeTab === tab.id ? '#D4AF37' : '#888',
              transition: 'color 0.2s',
              fontSize: '0.75rem'
            }}
          >
            <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
