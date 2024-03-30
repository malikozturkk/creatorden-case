interface DataItem {
  year: number;
  count: number;
  total_reach_rate: number;
  percentage_rate?: number;
  highest?: boolean;
}

export function calculatePercentageAndSort(data: DataItem[]): DataItem[] {
  const totalReachRate = data.reduce(
    (acc, item) => acc + item.total_reach_rate,
    0
  );

  const updatedData = data.map((item) => ({
    ...item,
    percentage_rate: (item.total_reach_rate / totalReachRate) * 100,
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
