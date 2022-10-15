import React, { useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  FormHelperText,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Loading from "components/Loading/Loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  clearAdminLocationState,
  clearDetailLocation,
  getEditLocationDetail,
} from "redux/slices/adminSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  title: string;
  mode: "add" | "edit";
};

interface LocationForm {
  name: string;
  province: string;
  country: string;
  valueate: number;
}

const AdminLocationForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const location = useLocation();

  const {
    location: { isLocationLoading, locationDetail },
  } = useSelector((state: RootState) => state.admin);

  const { locationId } = useParams();

  const locationSchema = yup.object().shape({
    name: yup.string().required("Please input location name!").default(""),
    province: yup.string().required("Please input province name!").default(""),
    country: yup.string().required("Please input country name!").default(""),
    valueate: yup
      .number()
      .required("Please input location name!")
      .min(0)
      .max(10)
      .default(0),
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LocationForm>({
    mode: "onBlur",
    resolver: yupResolver(locationSchema),
    defaultValues: {
      name: "",
      province: "",
      country: "",
      valueate: 0,
    },
  });

  const onSubmit = (values: LocationForm) => {
    console.log(values);
  };

  useEffect(() => {
    reset({}, { keepDefaultValues: true, keepValues: false });

    if (Object.keys(locationDetail).length) {
      dispatch(clearDetailLocation());
    }
  }, [location.pathname]);

  useEffect(() => {
    if (locationId) {
      dispatch(getEditLocationDetail(locationId));
    }

    return () => {
      dispatch(clearAdminLocationState());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(locationDetail).length) {
      setValue("name", locationDetail?.name);
      setValue("province", locationDetail?.province);
      setValue("country", locationDetail?.country);
      setValue("valueate", locationDetail?.valueate);
    }
  }, [locationDetail]);

  if (isLocationLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Loading css={{ width: "100%", height: "100%" }} />
        <CircularProgress
          thickness={6}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <h1>{props.title}</h1>
      <Box marginTop={2}>
        <Stack direction="row" columnGap={2}>
          <Box
            padding={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "12px",
            }}
          >
            <Box
              component={"form"}
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack rowGap={{ xs: 1, md: 2 }} marginBottom={2}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...rest } }) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      required
                      variant="outlined"
                      size="medium"
                      fullWidth
                      placeholder="Enter location name"
                      InputLabelProps={{ shrink: true }}
                      label="Name"
                      margin="dense"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="province"
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...rest } }) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      required
                      variant="outlined"
                      size="medium"
                      fullWidth
                      placeholder="Enter province name"
                      InputLabelProps={{ shrink: true }}
                      label="Province"
                      margin="dense"
                      error={!!errors.province}
                      helperText={errors.province?.message}
                    />
                  )}
                />

                <Controller
                  name="country"
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...rest } }) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      variant="outlined"
                      label="Country"
                      fullWidth
                      placeholder="Enter country name"
                      size="medium"
                      required
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />

                <Controller
                  name="valueate"
                  control={control}
                  defaultValue={0}
                  render={({ field: { ref, onBlur, ...rest } }) => (
                    <Box>
                      <label>Valueate</label>
                      <Select
                        {...rest}
                        inputRef={ref}
                        variant="outlined"
                        label="Valueate"
                        placeholder="Choose valueate"
                        size="small"
                        fullWidth
                        required
                        margin="dense"
                        error={!!errors.valueate}
                        inputProps={{}}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 150,
                            },
                          },
                          MenuListProps: {
                            sx: {
                              "& .MuiButtonBase-root.MuiMenuItem-root:hover": {
                                backgroundColor:
                                  "rgba(0, 0, 0, 0.04) !important",
                              },
                            },
                          },
                        }}
                      >
                        {[...Array(11)].map((option, index) => (
                          <MenuItem key={index} value={index}>
                            {index}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.valueate?.message}
                      </FormHelperText>
                    </Box>
                  )}
                />
              </Stack>
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  color: "white !important",
                  backgroundColor: "#ff385c",
                  "&:hover": {
                    backgroundColor: "#ff385c !important",
                    opacity: 0.9,
                  },
                }}
              >
                {locationDetail?.name ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
          <Box flexGrow={1}>
            {locationDetail?.name && (
              <Box
                padding={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                  height: "100%",
                }}
              >
                <Stack gap={2} direction="row">
                  <Box width="60%">
                    <LazyLoadImage
                      effect="opacity"
                      delayMethod="throttle"
                      delayTime={300}
                      src={locationDetail?.image}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                  <Box>
                    <Stack>
                      <Box marginBottom={5}>
                        <Tooltip title={"Click here to choose location image"}>
                          <p>Click here to choose location image</p>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          type="submit"
                          size="large"
                          sx={{
                            color: "white !important",
                            backgroundColor: "#ff385c",
                            "&:hover": {
                              backgroundColor: "#ff385c !important",
                              opacity: 0.9,
                            },
                          }}
                        >
                          {locationDetail?.name ? "Update" : "Add"}
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminLocationForm;
