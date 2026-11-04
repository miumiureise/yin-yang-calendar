import { Tenkan, Junishi, Element, YinYang } from '../types';

export const TENKAN_LIST: Tenkan[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const JUNISHI_LIST: Junishi[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const TENKAN_ELEMENTS: Record<Tenkan, Element> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
};

export const TENKAN_YINYANG: Record<Tenkan, YinYang> = {
  '甲': '陽', '乙': '陰', '丙': '陽', '丁': '陰', '戊': '陽', '己': '陰', '庚': '陽', '辛': '陰', '壬': '陽', '癸': '陰',
};

export const JUNISHI_ELEMENTS: Record<Junishi, Element> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水',
};

export const JUNISHI_YINYANG: Record<Junishi, YinYang> = {
  '子': '陽', '丑': '陰', '寅': '陽', '卯': '陰', '辰': '陽', '巳': '陰', '午': '陽', '未': '陰', '申': '陽', '酉': '陰', '戌': '陽', '亥': '陰',
};

export const ELEMENT_COLORS: Record<Element, string> = {
  '木': '#4B7D4B',
  '火': '#C0392B',
  '土': '#B8860B',
  '金': '#D4AF37',
  '水': '#1C3F6E',
};
