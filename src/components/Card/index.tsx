import React from "react";
import { calculatePercentageAndSort } from "@/lib/calculatePercentageAndSort";
import { calculatePercentageChange } from "@/lib/calculatePercentageChange";
import { CardData } from "@/types/index.types";

const Card: React.FC<{ data: CardData }> = ({ data }) => {
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
        // @ts-ignore
        const sortedData = calculatePercentageAndSort(contentData);
        // @ts-ignore
        const percentageChange = calculatePercentageChange(sortedData);
        return (
          <div className="flex gap-3 flex-col w-full" key={type}>
            <label className="text-xl font-bold flex items-center justify-center w-32">
              {type}
            </label>
            <div
              className="flex flex-col gap-4 py-4 items-start rounded-xl justify-between md:items-center md:flex-row md:p-0 md:rounded-none"
              //@ts-ignore
              style={{ backgroundColor: bgColorsLighter[type] }}
            >
              {Object.entries(percentageChange).map(
                ([year, content], index) => {
                  //@ts-ignore
                  const rate = Number(content.percentage_rate.toFixed(1));
                  const lastItem =
                    index !== 0 && index + 1 === contentData.length;
                  //@ts-ignore
                  const change = Number(content.change);
                  return (
                    <div
                      key={index}
                      className={`flex gap-4 items-center text-[#424242] font-bold md:border-none md:p-0 flex-row  w-full md:w-[initial] text-base ${
                        lastItem
                          ? "md:flex-row-reverse"
                          : "border-solid border-[#424242] border-b pb-4"
                      }`}
                    >
                      <div
                        className={`w-52 flex flex-col gap-4 md:flex-row items-start md:items-center ${
                          lastItem ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        {
                          //@ts-ignore
                          content.change && (
                            <label
                              className={`${
                                change > 0
                                  ? "text-green-500"
                                  : change === 0
                                  ? "text-[#919191]"
                                  : "text-red-500"
                              } mr-3`}
                            >
                              {change > 0 ? "+" + change : change}
                            </label>
                          )
                        }
                        <div
                          className={`text-base font-bold flex items-center justify-center max-w-52 rounded-r-2xl text-white h-16 min-w-12 ${
                            lastItem
                              ? "md:rounded-l-2xl md:rounded-r-none"
                              : "rounded-r-2xl"
                          }`}
                          style={{
                            backgroundColor: content.highest
                              ? //@ts-ignore
                                bgColorsNormal[type]
                              : //@ts-ignore
                                bgColorsLight[type],
                            width: `${rate}%`,
                          }}
                        >
                          {rate}%
                        </div>
                      </div>
                      <div className="flex gap-6 items-center justify-center">
                        <div className="font-semibold text-xl text-[#020202]">
                          {content.year}
                        </div>
                        <div className="text-[#0a0312]">{content.count}</div>
                        <div className="text-[#5d676b]">
                          {content.total_reach_rate}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Card;
