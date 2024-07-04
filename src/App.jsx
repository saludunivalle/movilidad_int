import React from 'react';
import { CssBaseline, Box, Typography } from '@mui/material';
import CustomTimeline from './components/Timeline';
import CustomHeader from './components/CustomHeader';

function App() {
  return (
    <>
    <CustomHeader/>
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <CssBaseline />
      <CustomTimeline />
    </Box>
    </>
  );
}

export default App;
