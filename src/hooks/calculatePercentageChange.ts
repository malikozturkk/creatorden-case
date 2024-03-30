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
      item.change = null;
    } else {
      const previousItem = data[index - 1];
      const percentageChange =
        item.percentage_rate - previousItem.percentage_rate;
      item.change = percentageChange.toFixed(2);
    }
  });

  return data;
}
