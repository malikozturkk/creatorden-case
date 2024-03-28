import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import HomeIcon from "@mui/icons-material/Home";
import LoadingButton from "@mui/lab/LoadingButton";
import BreadCrumb from "@/components/BreadCrumb";
import { AddCircle } from "@mui/icons-material";
import Form from "@/components/Form";

const Create = () => {
  const [rate, setRate] = React.useState(0);
  const formMethods = useForm({
    defaultValues: {
      influencerName: "",
      year: "",
      type: "",
      reachRate: 0,
    },
  });
  const { handleSubmit } = formMethods;
  const onSubmit = async (data: any) => {
    const req = await axios.post("api/createInfluencer", {
      influencerDatas: [
        {
          influencer: data.influencerName,
          year: parseInt(data.year),
          type: data.type,
          reach_rate: rate,
        },
      ],
    });
    return req;
  };
  return (
    <>
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
            text: "Influencer Ekle",
            icon: (
              <AddCircle
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center h-[75vh]">
          <div className="flex flex-col items-center justify-center bg-[#0F1924] border border-solid border-[#192028] rounded-lg p-7 gap-5 w-[70%] md:w-1/2">
            <h1 className="text-xl font-bold text-white">Influencer Ekle</h1>
            <Form formMethods={formMethods} rate={rate} setRate={setRate} />
            <LoadingButton
              size="large"
              type="submit"
              loading={false}
              variant="outlined"
              fullWidth
            >
              Influencer Ekle
            </LoadingButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
