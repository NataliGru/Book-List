import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridRowId,
  GridRowModesModel,
  GridRowEditStopReasons,
  GridRowModes,
  GridEventListener,
  GridActionsCellItem,
  GridColDef,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { deleteBook, updateBook } from '../../api/books';
import { Book } from '../../types/Book';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import moment from 'moment';

type BookTableProps = {
  books: Book[];
};

const editedTime = moment().format('DD MMMM YYYY, h:mmA');

export default function BookTable({ books }: BookTableProps) {
  const [rows, setRows] = useState<GridValidRowModel[]>([]);

  useEffect(() => {
    const initialRows: GridValidRowModel[] = books.map((book) => ({
      ...book,
    }));

    setRows(initialRows);
  }, [books]);

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
    const updatedWithDate = {...updatedRow, modifiedAt: editedTime };

    setRows(
      (prevRows) =>
        prevRows &&
        prevRows.map((row) => (row.id === updatedRow.id ? updatedWithDate : row)),
    );

    updateBook(updatedWithDate as Book);

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
      width: 150,
      editable: false,
    },
    {
      field: 'modifiedAt',
      headerName: 'Modified At',
      type: 'string',
      width: 150,
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
