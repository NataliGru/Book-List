import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';

export const Footer = () => {
  const MY_GIT_HUB_ACCOUNT = 'https://github.com/NataliGru';

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation>
        <Link href={MY_GIT_HUB_ACCOUNT} target="_blank" rel="noopener noreferrer">
          <BottomNavigationAction
            label="GitHub"
            icon={<GitHubIcon />}
          />
        </Link>
      </BottomNavigation>
    </Box>
  );
};
