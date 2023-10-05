import React from 'react';

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './Header.scss';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Books Dashboard
          </Typography>
          <Button
            href="/addNewBook"
            variant="text"
            sx={{ color: 'white' }}
          >
            Add new book
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
