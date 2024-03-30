import React from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import LoadingButton from "@mui/lab/LoadingButton";
import BreadCrumb from "@/components/BreadCrumb";
import { AddCircle } from "@mui/icons-material";
import { useAlert } from "@/context/useAlert";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  Slider,
  MenuItem,
  InputLabel,
} from "@mui/material/";
import { Box, Grid, Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TrendingUp } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ErrorText from "@/components/ErrorText";

const GetInfluencer = async () => {
  return await axios.get("api/influencer/get");
};

const Create = () => {
  const [rate, setRate] = React.useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: GetInfluencer,
  });
  const { addAlert } = useAlert();
  const formMethods = useForm({
    defaultValues: {
      influencerId: "",
      year: "",
      type: "",
      reachRate: 0,
    },
  });
  const [type, setType] = React.useState("");
  const [influencerId, setInfluencerId] = React.useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleChng = (event: SelectChangeEvent) => {
    setInfluencerId(event.target.value as string);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRate(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const onSubmit = async (data: any) => {
    const req = await axios.post("api/post/create", {
      postData: [
        {
          influencer_id: data.influencerId,
          year: parseInt(data.year),
          type: data.type,
          reach_rate: rate,
        },
      ],
    });
    addAlert({ message: req.data, severity: "success" });
    return req;
  };

  if (isLoading) return <div>Loading...</div>;
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
            text: "Post Ekle",
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
            <h1 className="text-xl font-bold text-white">Post Ekle</h1>
            <>
              <div className="flex-col flex w-full md:flex-row">
                <Controller
                  name="influencerId"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="w-full m-2 md:w-1/3"
                      variant="outlined"
                    >
                      <InputLabel error={errors.type ? true : false}>
                        Influencer İsmi
                      </InputLabel>
                      <Select
                        {...field}
                        {...register("influencerId", {
                          required: true,
                          minLength: 4,
                        })}
                        error={errors?.influencerId ? true : false}
                        value={influencerId}
                        label="Influencer İsmi"
                        onChange={handleChng}
                      >
                        {data?.data.map((item: any) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>

                      {errors.influencerId &&
                        errors.influencerId.type === "required" && (
                          <ErrorText message="Influencer Zorunlu" />
                        )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="w-full m-2 md:w-1/3"
                      variant="outlined"
                    >
                      <TextField
                        {...field}
                        error={errors?.year ? true : false}
                        color="success"
                        type="number"
                        {...register("year", {
                          required: true,
                          minLength: 4,
                          maxLength: 4,
                        })}
                        id="outlined-basic"
                        label="Yıl"
                        variant="outlined"
                      />
                      {errors.year ? (
                        errors.year?.type === "required" ? (
                          <ErrorText message="Yıl Zorunlu" />
                        ) : errors.year?.type === "minLength" ? (
                          <ErrorText message="Yıl Minimum 4 Karakter Olmalı" />
                        ) : (
                          <ErrorText message="Yıl Maximum 4 Karakter Olmalı" />
                        )
                      ) : null}
                    </FormControl>
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="w-full m-2 md:w-1/3"
                      variant="outlined"
                    >
                      <InputLabel error={errors.type ? true : false}>
                        Tür
                      </InputLabel>
                      <Select
                        {...field}
                        {...register("type", { required: true, minLength: 4 })}
                        error={errors?.type ? true : false}
                        value={type}
                        label="Tür"
                        onChange={handleChange}
                      >
                        <MenuItem value="STORY">STORY</MenuItem>
                        <MenuItem value="REELS">REELS</MenuItem>
                        <MenuItem value="STATIC">STATIC</MenuItem>
                      </Select>

                      {errors.type && errors.type?.type === "required" && (
                        <ErrorText message="Tür Zorunlu" />
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <Controller
                name="reachRate"
                control={control}
                render={({ field }) => (
                  <FormControl className="w-full m-2" variant="outlined">
                    <Box>
                      <Typography id="input-slider" gutterBottom>
                        Erişim Oranı
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <TrendingUp />
                        </Grid>
                        <Grid item xs>
                          <Slider
                            {...field}
                            min={0}
                            max={1000}
                            value={typeof rate === "number" ? rate : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            value={rate}
                            size="small"
                            onChange={handleInputChange}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 1000,
                              type: "number",
                              "aria-labelledby": "input-slider",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </FormControl>
                )}
              />
            </>
            <LoadingButton
              size="large"
              type="submit"
              loading={false}
              variant="outlined"
              fullWidth
            >
              Post Ekle
            </LoadingButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
