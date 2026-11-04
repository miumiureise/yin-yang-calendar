export interface SolarTerm {
  name: string;
  month: number; // 1-12
  approxDay: number;
}

// 簡略化した節気データ (正確な計算には天文暦が必要だが、まずは近似値で実装し、
// 後に精緻なライブラリやテーブルへ移行可能にする)
export const SOLAR_TERMS: SolarTerm[] = [
  { name: '立春', month: 2, approxDay: 4 },
  { name: '驚蟄', month: 3, approxDay: 5 },
  { name: '清明', month: 4, approxDay: 4 },
  { name: '立夏', month: 5, approxDay: 5 },
  { name: '芒種', month: 6, approxDay: 5 },
  { name: '夏至', month: 6, approxDay: 21 },
  { name: '小暑', month: 7, approxDay: 7 },
  { name: '大暑', month: 7, approxDay: 23 },
  { name: '立秋', month: 8, approxDay: 7 },
  { name: '処暑', month: 8, approxDay: 23 },
  { name: '白露', month: 9, approxDay: 7 },
  { name: '秋分', month: 9, approxDay: 23 },
  { name: '寒露', month: 10, approxDay: 8 },
  { name: '霜降', month: 10, approxDay: 23 },
  { name: '立冬', month: 11, approxDay: 7 },
  { name: '小雪', month: 11, approxDay: 22 },
  { name: '大雪', month: 12, approxDay: 7 },
  { name: '冬至', month: 12, approxDay: 21 },
  { name: '小寒', month: 1, approxDay: 5 },
  { name: '大寒', month: 1, approxDay: 20 },
];
