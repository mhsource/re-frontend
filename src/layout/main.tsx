import * as React from 'react';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './topbar'
import SideBar from './sidebar';
import Container from './container';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar />
            <SideBar />
            <Container />
        </Box>
    )
}

export default MainLayout;