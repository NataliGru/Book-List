import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridRowModel,
  GridRowId,
  GridRowsProp,
  GridValueGetterParams,
  GridRowModesModel,
  GridRowEditStopReasons,
  GridRowModes,
  GridRowEditStartParams,
  GridRowEditStopParams,
  GridToolbarContainer,
  GridEventListener,
  GridActionsCellItem,
  GridColDef,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { deleteBook, getBooks, updateBook } from '../../api/books';
import { Book } from '../../types/Book';
// import { columns } from './BookCol';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}



const buttons = () => (
  <Box sx={{ '& > :not(style)': { m: 1 } }}>
    <Fab color="secondary" aria-label="edit">
      <EditIcon />
    </Fab>
    <Fab color="secondary" aria-label="delete">
      <DeleteIcon />
    </Fab>
    <Fab color="secondary" aria-label="active">
      <DoneAllIcon />
    </Fab>
  </Box>
);

export default function BookTable() {
  const [rows, setRows] = useState<GridValidRowModel[]>([]);

  useEffect(() => {
    getBooks()
      .then((data) => {
        const initialRows: GridValidRowModel[] = data.map((book) => ({
          ...book,
        }));

        setRows(initialRows)
      })
      .catch((error) => error);
  }, []);



  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});


  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
};

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    rows && setRows(rows.filter((row) => row.id !== id));

    deleteBook(id as number);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows && rows.find((row) => row.id === id);
    if (editedRow && editedRow.isNew) {
      rows && setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (updatedRow: GridValidRowModel) => {
    setRows((prevRows) =>
    prevRows && prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)),
    );

    updateBook(updatedRow as Book)

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 45, editable: false },
  {
    field: 'title',
    headerName: 'Book title',
    type: 'string',
    editable: true,
    width: 130,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'author',
    headerName: 'Author name',
    type: 'string',
    width: 180,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'string',
    width: 100,
    editable: true,
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    type: 'string',
    width: 100,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'string',
    width: 120,
    editable: false,
  },
  {
    field: 'modifiedAt',
    headerName: 'Modified At',
    type: 'string',
    width: 120,
    editable: false,
  },
  {
    field: 'active',
    headerName: 'Active',
    type: 'boolean',
    width: 100,
    editable: true,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
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
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];


  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        padding: 5,
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
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
}
