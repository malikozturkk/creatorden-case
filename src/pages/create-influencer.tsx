import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { Person2 } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import BreadCrumb from "@/components/BreadCrumb";
import { useAlert } from "@/context/useAlert";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, FormControl } from "@mui/material/";
import ErrorText from "@/components/ErrorText";

const Create = () => {
  const { addAlert } = useAlert();
  const formMethods = useForm({
    defaultValues: {
      influencerName: "",
    },
  });
  const { handleSubmit } = formMethods;
  const onSubmit = async (data: any) => {
    const req = await axios.post("api/influencer/create", {
      influencerDatas: [
        {
          name: data.influencerName,
        },
      ],
    });
    addAlert({ message: req.data, severity: "success" });
    return req;
  };

  const {
    control,
    register,
    formState: { errors },
  } = formMethods;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center h-[75vh]">
          <div className="flex flex-col items-center justify-center bg-[#0F1924] border border-solid border-[#192028] rounded-lg p-7 gap-5 w-[70%] md:w-1/2">
            <h1 className="text-xl font-bold text-white">Influencer Ekle</h1>
            <Controller
              name="influencerName"
              control={control}
              render={({ field }) => (
                <FormControl className="w-full" variant="outlined">
                  <TextField
                    {...field}
                    error={errors?.influencerName ? true : false}
                    color="success"
                    {...register("influencerName", {
                      required: true,
                      minLength: 2,
                    })}
                    id="outlined-basic"
                    label="Influencer Adı"
                    variant="outlined"
                  />
                  {errors.influencerName ? (
                    errors.influencerName?.type === "required" ? (
                      <ErrorText message="Influencer İsmi Zorunlu" />
                    ) : (
                      <ErrorText message="Influencer İsmi Minimum 2 Karakter Olmalı" />
                    )
                  ) : null}
                </FormControl>
              )}
            />
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
