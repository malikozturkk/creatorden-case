import React from "react";
import { calculatePercentageAndSort } from "@/hooks/calculatePercentageAndSort";

export interface DataItem {
  count: number;
  total_reach_rate: number;
  year: number;
}

export interface CardData {
  [key: string]: DataItem[];
}

const Card: React.FC<{ data: CardData }> = ({ data }) => {
  console.log(data, "datasasa");
  const bgColorsNormal = {
    STORY: "#8001e2",
    REELS: "#0ca6da",
    STATIC: "#e07133",
  };

  const bgColorsLight = {
    STORY: "#b666f3",
    REELS: "#75d0ec",
    STATIC: "#efac87",
  };

  const bgColorsLighter = {
    STORY: "#e9cdff",
    REELS: "#eafbff",
    STATIC: "#ffe8db",
  };
  return (
    <div className="w-full flex flex-col items-start gap-10 flex-wrap justify-center">
      {Object.entries(data).map(([type, contentData]) => {
        const sortedData = calculatePercentageAndSort(contentData);
        return (
          <div className="flex gap-3 flex-col w-full" key={type}>
            <label className="text-xl font-bold flex items-center justify-center w-52">
              {type}
            </label>
            <div
              className="flex flex-row gap-4 items-center justify-between"
              //@ts-ignore
              style={{ backgroundColor: bgColorsLighter[type] }}
            >
              {Object.entries(sortedData).map(([year, content], index) => {
                //@ts-ignore
                const rate = Number(content.percentage_rate.toFixed(1));
                const lastItem =
                  index !== 0 && index + 1 === contentData.length;
                return (
                  <div
                    className="flex gap-4 items-center text-[#424242] text-lg font-bold"
                    style={{
                      flexDirection: lastItem ? "row-reverse" : "row",
                    }}
                  >
                    <div
                      className="text-2xl font-bold flex items-center justify-center w-52 rounded-r-2xl text-white h-16"
                      style={{
                        //@ts-ignore
                        backgroundColor: bgColorsNormal[type],
                        borderTopRightRadius: !lastItem ? "1.5rem" : "0",
                        borderBottomRightRadius: !lastItem ? "1.5rem" : "0",
                        borderTopLeftRadius: lastItem ? "1.5rem" : "0",
                        borderBottomLeftRadius: lastItem ? "1.5rem" : "0",
                      }}
                    >
                      {rate}%
                    </div>
                    <div className="font-semibold text-xl text-black">
                      {content.year}
                    </div>
                    <div>{content.count}</div>
                    <div>{content.total_reach_rate}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Card;
