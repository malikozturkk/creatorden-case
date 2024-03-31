import React from "react";
import lottie from "lottie-web";

const NoData = () => {
  const noDataContainer = React.useRef(null);
  lottie.loadAnimation({
    name: "animationOne",
    //@ts-ignore
    container: noDataContainer.current,
    renderer: "svg",
    loop: true,
    autoplay: false,
    animationData: require("./notdata.json"),
  });

  lottie.play("animationOne");
  return <div className="w-full" ref={noDataContainer} />;
};
export default NoData;
