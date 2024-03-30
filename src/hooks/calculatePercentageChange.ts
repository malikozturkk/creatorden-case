import { DataItemWithChange } from "@/types/index.types";

export function calculatePercentageChange(
  data: DataItemWithChange[]
): DataItemWithChange[] {
  data.forEach((item, index) => {
    if (index === 0) {
      item.change = null;
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
