import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const NoData = () => {
  const noDataContainer = useRef(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      //@ts-ignore
      container: noDataContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./notdata.json"),
    });
    return () => instance.destroy();
  }, []);

  return <div className="w-[70%] mx-auto" ref={noDataContainer} />;
};

export default NoData;
