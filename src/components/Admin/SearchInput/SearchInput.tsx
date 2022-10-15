import React, { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import useDebounceSearch from "utils/useDebounceSearch";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import {
  getLocationList,
  clearAdminLocationState,
} from "redux/slices/adminSlice";

type Props = {
  type: string;
};

const SearchInput = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState<string>("");

  // CHANGE INPUT USING DEBOUNCE CUSTOM HOOK
  const debouncedValue = useDebounceSearch<string>(inputValue, 500);

  useEffect(() => {
    // console.log(debouncedValue);
    if (debouncedValue) {
      switch (props.type) {
        case "location":
          dispatch(clearAdminLocationState());
          dispatch(getLocationList({ location: debouncedValue }));
          break;

        case "rooom":
          break;

        default:
          break;
      }
    }
  }, [debouncedValue]);

  return (
    <Box width={{ xs: "100%", sm: "50%" }}>
      <TextField
        autoComplete="off"
        fullWidth
        onChange={(e) => setInputValue(e.target.value)}
        // handle keyboard and clear button event
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (debouncedValue) {
              dispatch(clearAdminLocationState());
              dispatch(getLocationList({ location: debouncedValue }));
            }
          } else if (e.key === "Escape" && e.code === "Escape") {
            setInputValue("");
            dispatch(clearAdminLocationState());
            dispatch(getLocationList({}));
          } else if (e.key === "Backspace" && e.code === "Backspace") {
            if (!inputValue) {
              dispatch(clearAdminLocationState());
              dispatch(getLocationList({}));
            }
          }
        }}
        value={inputValue}
        InputProps={{
          sx: {
            paddingY: {
              xs: 0,
              lg: 1,
            },
          },
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle clear input value"
                onClick={() => {
                  setInputValue("");
                  dispatch(clearAdminLocationState());
                  dispatch(getLocationList({}));
                }}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        placeholder="Search...!"
      />
    </Box>
  );
};

export default SearchInput;
