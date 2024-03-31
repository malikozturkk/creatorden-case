import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import axios from "axios";
import { useAlert } from "@/context/useAlert";
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
import { GetPosts } from "@/services";

const EditGrid = () => {
  const { addAlert } = useAlert();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: GetPosts,
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
    const { id, influencer_id, year, type, reach_rate } = rowData;
    const req = await axios.post("api/post/edit", {
      id,
      influencer_id: parseInt(influencer_id),
      year: parseInt(year),
      type,
      reach_rate,
    });
    queryClient.invalidateQueries({
      queryKey: ["data"],
    });
    addAlert({ message: req.data, severity: "success" });
    return req;
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    const req = await axios.post("api/post/remove", {
      id,
    });
    queryClient.invalidateQueries({
      queryKey: ["data"],
    });
    addAlert({ message: req.data, severity: "success" });
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
    {
      field: "influencer_id",
      headerName: "Influencer Id",
      width: 180,
      editable: true,
    },
    {
      field: "year",
      headerName: "Yıl",
      type: "string",
      width: 80,
      align: "left",
      editable: true,
      headerAlign: "left",
    },
    {
      field: "type",
      headerName: "Tür",
      type: "singleSelect",
      valueOptions: ["STORY", "REELS", "STATIC"],
      width: 180,
      editable: true,
    },
    {
      field: "reach_rate",
      headerName: "Erişim Oranı",
      width: 180,
      editable: true,
      type: "number",
    },
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
  );
};

export default EditGrid;
