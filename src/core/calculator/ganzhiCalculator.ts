import { Tenkan, Junishi, GanzhiInfo } from '../types';
import { TENKAN_LIST, JUNISHI_LIST, TENKAN_ELEMENTS, JUNISHI_ELEMENTS, TENKAN_YINYANG, JUNISHI_YINYANG } from '../constants/ganzhi';

/**
 * 六十干支の計算
 * 基準日: 2000年1月1日 (甲子の日ではないが、計算の起点として使用)
 * 実際には、ある既知の干支の日付から差分を計算する。
 * 2000年1月1日は「戊午」の日。
 * 
 * 計算式:
 * Tenkan = (基準日からの日数 + 基準日の十干インデックス) % 10
 * Junishi = (基準日からの日数 + 基準日の十二支インデックス) % 12
 */
export class GanzhiCalculator {
  // 2000-01-01 = 戊午 (Tenkan: 戊 [4], Junishi: 午 [6])
  private static readonly BASE_DATE = new Date('2000-01-01T00:00:00Z');
  private static readonly BASE_TENKAN_IDX = 4; // 戊
  private static readonly BASE_JUNISHI_IDX = 6; // 午

  static calculateForDate(date: Date): GanzhiInfo {
    const diffTime = date.getTime() - this.BASE_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const tenkanIdx = (diffDays + this.BASE_TENKAN_IDX) % 10;
    const junishiIdx = (diffDays + this.BASE_JUNISHI_IDX) % 12;

    // JavaScriptの剰余演算は負の数に対して負を返すため、補正する
    const normalizedTenkanIdx = tenkanIdx < 0 ? tenkanIdx + 10 : tenkanIdx;
    const normalizedJunishiIdx = junishiIdx < 0 ? junishiIdx + 12 : junishiIdx;

    const tenkan = TENKAN_LIST[normalizedTenkanIdx];
    const junishi = JUNISHI_LIST[normalizedJunishiIdx];

    return {
      tenkan,
      junishi,
      element: TENKAN_ELEMENTS[tenkan],
      yinYang: TENKAN_YINYANG[tenkan], // 日干を基準に陰陽を判定
      combined: `${tenkan}${junishi}`,
    };
  }
}
