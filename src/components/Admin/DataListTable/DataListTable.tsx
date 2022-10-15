import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LocationId } from "interfaces/location";
import { Room } from "interfaces/room";

type Props = {
  title: string;
  type: string;
  table: {
    columns: GridColDef[];
    rows: Array<LocationId | Room | any>;
  };
  loading: boolean;
};

const DataListTable = (props: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      marginTop={2}
      rowGap={1}
      flexGrow={1}
    >
      <Box>
        <h3>{props.title}</h3>
      </Box>
      <Box sx={{ height: "100%" }}>
        <DataGrid
          rows={props.table.rows}
          disableColumnFilter
          columns={props.table.columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          rowHeight={200}
          loading={props.loading}
          isRowSelectable={() => false}
          paginationMode="client"
          sx={{
            "& .MuiTablePagination-actions": {
              "& .MuiButtonBase-root.Mui-disabled.MuiIconButton-root.Mui-disabled":
                {
                  color: "rgba(0, 0, 0, 0.26) !important",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04) !important",
                  },
                },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DataListTable;
