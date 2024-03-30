import EditIcon from "@mui/icons-material/Edit";
import BreadCrumb from "@/components/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import axios from "axios";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const GetInfluencer = async () => {
  return await axios.get("api/influencer/get");
};

const Edit = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: GetInfluencer,
  });
  const rows = data?.data;
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const processRowUpdate = async (newRow: any) => {
    await EditInfluencer(newRow);
    return newRow;
  };

  const EditInfluencer = async (rowData: any) => {
    const { id, name } = rowData;
    const req = await axios.post("api/influencer/edit", {
      id,
      name,
    });
    queryClient.invalidateQueries({
      queryKey: ["data"],
    });
    return req;
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    const req = await axios.post("api/influencer/remove", {
      id,
    });
    queryClient.invalidateQueries({
      queryKey: ["data"],
    });
    return req;
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 180, editable: false },
    { field: "name", headerName: "İsim", width: 180, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Aksiyonlar",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Sil"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (isLoading) return <Loader />;
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
            text: "Influencer Düzenle",
            icon: (
              <EditIcon
                style={{
                  marginLeft: "5px",
                  fontSize: "16px",
                  marginRight: "-6px",
                  color: " rgb(224, 224, 224)",
                }}
              />
            ),
          },
        ]}
      />
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </div>
  );
};

export default Edit;
