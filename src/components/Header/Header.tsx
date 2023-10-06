import React from 'react';

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './Header.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <NavLink to="/" style={{
              textDecoration: 'none',
              color: 'white',
            }}>
            <Typography
              variant="h6"
              component="div"
            >
              Books Dashboard
            </Typography>
          </NavLink>

          <NavLink to="/addNewBook"  style={{
              textDecoration: 'none',
              color: 'white',
            }}>
            <Typography
              variant="h6"
              component="div"
            >
              Add new book
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
