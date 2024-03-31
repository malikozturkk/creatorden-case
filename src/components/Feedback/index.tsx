import React from "react";

export interface FeedbackProps {
  feedbacks: {
    message: string;
    type: string;
  }[];
}

const colors = {
  great: "#abd2aa",
  improve: "#ebb99d",
  same: "#d9d9d9",
};

const Feedback: React.FC<FeedbackProps> = ({ feedbacks }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {feedbacks.map((feedback, index) => {
        //@ts-ignore
        const color = colors[feedback?.type];
        return (
          <div
            className="rounded-xl p-5 flex flex-row justify-between w-full items-center"
            key={index}
            style={{
              border: `4px solid ${color}`,
            }}
          >
            <label className="font-bold text-xl">{feedback.message}</label>
            <label className="font-bold text-xl" style={{ color }}>
              {feedback.type}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Feedback;
