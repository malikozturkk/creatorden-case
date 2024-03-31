import React from "react";
import { winnerIcons } from "@/hooks/winnerIcon";
import { useInfluencers } from "@/context/useTopThree";

const Winner = () => {
  const { topThree } = useInfluencers();
  return (
    topThree?.length > 0 && (
      <div className="flex gap-8 min-h-16 w-full flex-col bg-[#424242] p-3 items-center text-white justify-center my-3 border border-white rounded-xl md:rounded-none md:flex-row">
        <label className="font-bold text-lg">
          Top 3 Influencers By Reach Rate
        </label>
        {topThree?.map((item, index) => (
          <div
            className="flex items-center gap-2 justify-center flex-col"
            key={index}
          >
            <label className="font-bold flex flex-col items-center justify-center">
              {winnerIcons[index + 1]}
              {item.name}
            </label>
            <label className="font-bold">{item.averageRate.toFixed(1)}</label>
          </div>
        ))}
      </div>
    )
  );
};

export default Winner;
