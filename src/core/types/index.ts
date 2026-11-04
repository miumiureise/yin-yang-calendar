export type Element = '木' | '火' | '土' | '金' | '水';
export type YinYang = '陰' | '陽';
export type Tenkan = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type Junishi = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '亥';

export interface GanzhiInfo {
  tenkan: Tenkan;
  junishi: Junishi;
  element: Element;
  yinYang: YinYang;
  combined: string;
}

export interface Pillar {
  name: string;
  ganzhi: GanzhiInfo;
}

export interface Meishiki {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar | null;
  balance: Record<Element, number>;
}

export interface DateAnalysis {
  date: Date;
  ganzhi: GanzhiInfo;
  description: string;
}
