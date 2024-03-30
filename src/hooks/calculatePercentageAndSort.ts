interface DataItem {
  year: number;
  count: number;
  total_reach_rate: number;
  percentage_rate?: number;
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
  return updatedData.sort((a, b) => a.year - b.year);
}
