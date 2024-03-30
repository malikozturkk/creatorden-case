import React from "react";
import { Controller } from "react-hook-form";
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
import { FormProps } from "@/types/index.types";

const Form: React.FC<FormProps> = ({ formMethods, rate, setRate }) => {
  const [type, setType] = React.useState("");

  const {
    control,
    register,
    formState: { errors },
  } = formMethods;

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRate(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(event.target.value === "" ? 0 : Number(event.target.value));
  };
  return (
    <>
      <div className="flex-col flex w-full md:flex-row">
        <Controller
          name="influencerName"
          control={control}
          render={({ field }) => (
            <FormControl className="w-full m-2 md:w-1/3" variant="outlined">
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
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <FormControl className="w-full m-2 md:w-1/3" variant="outlined">
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
            <FormControl className="w-full m-2 md:w-1/3" variant="outlined">
              <InputLabel error={errors.type ? true : false}>Tür</InputLabel>
              <Select
                {...field}
                {...register("type", { required: true, minLength: 4 })}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
  );
};

export default Form;
