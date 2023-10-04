import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import FilterSelector from '../FilterSelector/FilterSelector';

export const Header: React.FC = () => {
  return (
    <div className='header'>
      <FilterSelector />
      <Button variant="contained">Add new book</Button>
    </div>
  );
};

