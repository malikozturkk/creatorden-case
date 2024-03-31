import { DataItemWithChange } from "@/types/index.types";

export function calculatePercentageAndSort(
  data: DataItemWithChange[]
): DataItemWithChange[] {
  const totalReachRate = data.reduce(
    (acc, item) => acc + item.average_reach_rate,
    0
  );

  const updatedData = data.map((item) => ({
    ...item,
    percentage_rate: (item.average_reach_rate / totalReachRate) * 100,
  }));

  const highestPercentageRate = Math.max(
    ...updatedData.map((item) => item.percentage_rate || 0)
  );

  const finalData = updatedData.map((item) => ({
    ...item,
    highest: item.percentage_rate === highestPercentageRate,
  }));

  return finalData.sort((a, b) => a.year - b.year);
}
