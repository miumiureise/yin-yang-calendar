import { GanzhiCalculator } from './ganzhiCalculator';
import { Tenkan, Junishi, Element, GanzhiInfo, Pillar, Meishiki } from '../types';
import { TENKAN_LIST, JUNISHI_LIST, TENKAN_ELEMENTS } from '../constants/ganzhi';

export class FortuneCalculator {
  static calculateMeishiki(birthDate: Date, birthHour?: number): Meishiki {
    const dayGanzhi = GanzhiCalculator.calculateForDate(birthDate);
    
    const year = birthDate.getFullYear();
    const yearOffset = (year - 4) % 60;
    const yearTenkan = TENKAN_LIST[yearOffset % 10];
    const yearJunishi = JUNISHI_LIST[yearOffset % 12];

    const month = birthDate.getMonth();
    const monthOffset = (yearOffset + month) % 60;
    const monthTenkan = TENKAN_LIST[monthOffset % 10];
    const monthJunishi = JUNISHI_LIST[monthOffset % 12];

    let hourPillar = null;
    if (birthHour !== undefined) {
      const dayTenkanIdx = TENKAN_LIST.indexOf(dayGanzhi.tenkan);
      const hourStartTenkanIdx = (dayTenkanIdx % 5 === 0) ? 0 : (dayTenkanIdx % 5 === 1) ? 2 : (dayTenkanIdx % 5 === 2) ? 4 : (dayTenkanIdx % 5 === 3) ? 6 : 8;
      const hourIdx = Math.floor(birthHour / 2);
      const hourTenkan = TENKAN_LIST[(hourStartTenkanIdx + hourIdx) % 10];
      const hourJunishi = JUNISHI_LIST[hourIdx % 12];
      
      hourPillar = {
        name: '時柱',
        ganzhi: {
          tenkan: hourTenkan,
          junishi: hourJunishi,
          element: TENKAN_ELEMENTS[hourTenkan],
          yinYang: '陽',
          combined: `${hourTenkan}${hourJunishi}`
        }
      };
    }

    const pillars = [
      { name: '年柱', ganzhi: { tenkan: yearTenkan, junishi: yearJunishi, element: TENKAN_ELEMENTS[yearTenkan], yinYang: '陽', combined: `${yearTenkan}${yearJunishi}` } },
      { name: '月柱', ganzhi: { tenkan: monthTenkan, junishi: monthJunishi, element: TENKAN_ELEMENTS[monthTenkan], yinYang: '陽', combined: `${monthTenkan}${monthJunishi}` } },
      { name: '日柱', ganzhi: dayGanzhi },
    ];

    const balance: Record<Element, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
    pillars.forEach(p => {
      balance[p.ganzhi.element]++;
    });
    if (hourPillar) balance[hourPillar.ganzhi.element]++;

    return {
      yearPillar: pillars[0],
      monthPillar: pillars[1],
      dayPillar: pillars[2],
      hourPillar,
      balance
    };
  }
}
