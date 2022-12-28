import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
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

  const [preview, setPreview] = useState(null);

  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

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
    // console.log(values);
  };

  const {
    register: registerImg,
    handleSubmit: handleSubmitImg,
    reset: resetImg,
    resetField: resetFieldImg,
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmitImg = () => {};

  const clearFile = () => {
    setPreview(null);
    setIsChangeAvatar(false);
    // clearErrorsAvatar("avatar");
    resetFieldImg("location");
  };

  useEffect(() => {
    return () => {
      dispatch(clearAdminLocationState());
    };
  }, []);

  useEffect(() => {
    if (locationId && !Object.keys(locationDetail).length) {
      dispatch(getEditLocationDetail(locationId));
    }

    if (locationId === undefined) {
      reset();
    }

    if (locationId && Object.keys(locationDetail).length) {
      if (Object.keys(errors).length) {
        reset();
      }

      setValue("name", locationDetail?.name);
      setValue("province", locationDetail?.province);
      setValue("country", locationDetail?.country);
      setValue("valueate", locationDetail?.valueate);
    }
  }, [locationId, Object.keys(locationDetail).length]);

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
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2 }}
        >
          <Box
            padding={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "12px",
              minWidth: "500px",
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
          <Box>
            {locationId && Object.keys(locationDetail).length && (
              <Box
                padding={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                  height: "100%",
                }}
              >
                <Stack gap={2}>
                  <Box>
                    <LazyLoadImage
                      effect="opacity"
                      delayMethod="throttle"
                      delayTime={300}
                      src={preview ?? locationDetail?.image}
                      width={"100%"}
                      height={250}
                      style={{ objectFit: "fill" }}
                    />
                  </Box>
                  <Box component={"form"}>
                    <Stack>
                      <Box marginBottom={2}>
                        <Tooltip title={"Click here to choose location image"}>
                          <Button
                            size="small"
                            component="label"
                            variant="outlined"
                            // disabled={isDetailLoading}
                          >
                            Change location image
                            <input
                              hidden
                              accept="image/png, image/gif, image/jpeg, image/jpg"
                              type="file"
                              {...registerImg("location", {
                                required: true,
                                onChange: (e) => {
                                  if (e.target.files?.length !== 0) {
                                    const preview =
                                      e.currentTarget.files.length &&
                                      URL.createObjectURL(
                                        e.currentTarget.files[0]
                                      );
                                    setPreview(preview);
                                    setIsChangeAvatar(true);
                                  } else {
                                    clearFile();
                                  }
                                },
                              })}
                            />
                          </Button>
                        </Tooltip>
                      </Box>
                      <Box>
                        {isChangeAvatar && (
                          <>
                            <Tooltip title="Update">
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
                                Update
                              </Button>
                            </Tooltip>

                            <Tooltip title="Cancel">
                              <IconButton onClick={clearFile}>
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLocationForm;
