import React, { useEffect, useState, useMemo } from "react";
import { Box, Popover, Stack, Tooltip } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchInput from "components/Admin/SearchInput/SearchInput";
import DataListTable from "components/Admin/DataListTable/DataListTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  clearAdminLocationState,
  getLocationList,
} from "redux/slices/adminSlice";
import { LocationId } from "interfaces/location";

type Props = {};
interface E extends LocationId {
  id: number;
}

const LocationManagement = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    location: { isLocationLoading, locationList },
  } = useSelector((state: RootState) => state.admin);

  const rows: E[] = [...locationList]?.map((location, index) => ({
    ...location,
    id: index + 1,
  }));

  const columns = useMemo<GridColumns<typeof rows[number]>>(
    () => [
      {
        field: "id",
        width: 80,
        type: "number",
        hideable: false,
        align: "center",
        disableColumnMenu: true,
        headerAlign: "center",
        renderHeader: () => <span>ID</span>,
      },
      {
        field: "name",
        type: "string",
        align: "center",
        flex: 1,
        minWidth: 200,
        disableColumnMenu: true,
        headerAlign: "center",
        renderHeader: () => <span>Name</span>,
      },
      {
        field: "province",
        type: "string",
        align: "center",
        minWidth: 150,
        disableColumnMenu: true,
        headerAlign: "center",
        renderHeader: () => <span>Province</span>,
      },
      {
        field: "country",
        type: "string",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        headerAlign: "center",
        renderHeader: () => <span>Country</span>,
      },
      {
        field: "valueate",
        type: "number",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        headerAlign: "center",
        renderHeader: () => <span>Valueate</span>,
      },
      {
        field: "image",
        type: "number",
        align: "center",
        sortable: false,
        flex: 1,
        disableColumnMenu: true,
        headerAlign: "center",
        minWidth: 250,
        renderHeader: () => <span>Image</span>,
        renderCell: (params) => (
          <LazyLoadImage
            effect="opacity"
            src={params.value}
            alt={params.row.name}
            height={"100%"}
            width={"100%"}
          />
        ),
      },
      {
        field: "actions",
        type: "actions",
        renderHeader: () => <span>Actions</span>,
        getActions: (params) => [
          <GridActionsCellItem
            sx={{
              "&:hover": {
                transform: "scale(1.3)",
              },
            }}
            icon={
              <Box>
                <Tooltip title="Delete location">
                  <DeleteIcon color="error" />
                </Tooltip>
              </Box>
            }
            label="Delete"
            // onClick={() => console.log(params.row._id)}
          />,
          <GridActionsCellItem
            sx={{
              "&:hover": {
                transform: "scale(1.3)",
              },
            }}
            icon={
              <Box>
                <Tooltip title="Edit location">
                  <EditIcon color="info" />
                </Tooltip>
              </Box>
            }
            label="Edit"
            onClick={() =>
              navigate({ pathname: `/admin/edit-location/${params.row._id}` })
            }
          />,
        ],
      },
    ],
    [dispatch]
  );

  useEffect(() => {
    dispatch(getLocationList({}));

    return () => {
      dispatch(clearAdminLocationState());
    };
  }, []);

  return (
    <>
      <Stack height={"100%"}>
        <SearchInput type="location" />
        <DataListTable
          title="Location list"
          type="location"
          table={{ columns: columns, rows: rows }}
          loading={isLocationLoading}
        />
      </Stack>
    </>
  );
};

export default LocationManagement;
