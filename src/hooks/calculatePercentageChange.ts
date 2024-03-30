interface DataItem {
  year: number;
  count: number;
  total_reach_rate: number;
  percentage_rate: number;
  highest: boolean;
  change?: string | null;
}

export function calculatePercentageChange(data: DataItem[]): DataItem[] {
  data.forEach((item, index) => {
    if (index === 0) {
      item.change = null; // İlk öğe için değişim hesaplanamaz
    } else {
      const previousItem = data[index - 1];
      const percentageChange =
        ((item.percentage_rate - previousItem.percentage_rate) /
          previousItem.percentage_rate) *
        100;
      item.change = percentageChange.toFixed(1);
    }
  });

  return data;
}
