import { GetServerSideProps, NextPage } from "next";
import React from "react";
import axios from "axios";
import BreadCrumb from "@/components/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import Card from "@/components/Card";
import { groupSortByTypeAndYear } from "@/hooks/groupSortByTypeAndYear";
import { CardProps } from "@/types/index.types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get("http://localhost:3000/api/post/get", {
    params: { influencer_id: id },
  });

  return {
    props: { data: res.data, id },
  };
};

const Influencer: NextPage<CardProps> = ({ data, id }) => {
  const groupedData = groupSortByTypeAndYear(data);
  const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;
  return (
    <div>
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
            text: `${id}. Influencer`,
          },
        ]}
      />
      {isEmpty(groupedData) ? (
        "data yok"
      ) : (
        <div className="bg-[#161b22] flex flex-col justify-center items-center gap-6 rounded-xl mt-12">
          <div className="flex justify-between w-full mt-8">
            <div className="bg-[#424242] p-3 rounded-r-lg text-2xl flex items-center">
              REACH RATE
            </div>
            <div className="bg-[#424242] p-3 rounded-l-lg flex gap-5 items-center">
              <label className="text-2xl font-bold">62.9%</label>
              <div className="flex flex-col text-sm font-semibold">
                <label className="text-[#2dc44d]">+24.1%</label>
                <label>in 2021</label>
              </div>
            </div>
          </div>
          <Card data={groupedData} />
        </div>
      )}
    </div>
  );
};

export default Influencer;
