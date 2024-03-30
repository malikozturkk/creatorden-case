import { YearlySummary, PureDataItem } from "@/types/index.types";

export function groupSortByTypeAndYear(
  data: PureDataItem[]
): Record<string, YearlySummary[]> {
  const grouped: Record<string, YearlySummary[]> = {};

  data.forEach((item) => {
    if (!grouped[item.type]) {
      grouped[item.type] = [];
    }
    let yearlySummary = grouped[item.type].find(
      (summary) => summary.year === item.year
    );
    if (!yearlySummary) {
      yearlySummary = { year: item.year, count: 0, total_reach_rate: 0 };
      grouped[item.type].push(yearlySummary);
    }
    yearlySummary.count += 1;
    yearlySummary.total_reach_rate += item.reach_rate;
  });
  for (const type in grouped) {
    grouped[type].sort((a, b) => a.year - b.year);
  }

  return grouped;
}
