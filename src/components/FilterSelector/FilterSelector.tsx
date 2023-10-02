import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getSearchWith } from '../../utils/searchHelper';

export default function FilterSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';

  const handleFilterChange = (event: SelectChangeEvent) => {
    const selectedFilter = event.target.value as string;

    const search = getSearchWith(searchParams, { filter: selectedFilter });

    setSearchParams(search);
  };

  return (
    <Box sx={{ maxWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter"
          onChange={handleFilterChange}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'deactivated'}>Deactivated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
