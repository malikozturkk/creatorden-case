import Loader from "@/components/Loader";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { Person2 } from "@mui/icons-material";
import BreadCrumb from "@/components/BreadCrumb";
import { useInfluencers } from "@/context/useTopThree";
import Winner from "@/components/Winner";
import { GetInfluencer } from "@/services";
import NoData from "@/components/NoData";

const Home = () => {
  const { data: infData, isLoading } = useQuery({
    queryKey: ["infData"],
    queryFn: GetInfluencer,
  });

  const { topThree } = useInfluencers();

  if (isLoading) return <Loader />;

  return (
    <>
      {infData?.data.length > 0 && (
        <BreadCrumb
          items={[
            {
              text: "Anasayfa",
              url: "/",
              target: "_self",
              icon: (
                <HomeIcon
                  fontSize="small"
                  style={{
                    marginLeft: "5px",
                    marginRight: "-6px",
                    color: " rgb(224, 224, 224)",
                  }}
                />
              ),
            },
            {
              text: "Influencerlar",
              icon: (
                <Person2
                  fontSize="small"
                  style={{
                    marginLeft: "5px",
                    marginRight: "-6px",
                    color: " rgb(224, 224, 224)",
                  }}
                />
              ),
            },
          ]}
        />
      )}
      {topThree?.length > 0 && <Winner />}

      <div className="flex flex-col items-center gap-6 p-6 flex-wrap justify-center md:flex-row">
        {infData?.data.length > 0 ? (
          infData?.data.map((item: any) => (
            <Link
              href={`/${item.id}`}
              key={item.id}
              className="flex flex-1 max-w-72 min-w-72 border border-solid border-[#192028] rounded-lg p-3 hover:bg-[#192028] hover:border-red-500"
            >
              <div className="flex items-center w-full gap-6 text-base font-semibold">
                <img
                  src={`/api/avatar?seed=${item.id}`}
                  alt="User Avatar"
                  width={75}
                  height={75}
                  className="rounded-full"
                />
                <label className="cursor-pointer">{item.id}</label>
                <label className="cursor-pointer">{item.name}</label>
              </div>
            </Link>
          ))
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default Home;
