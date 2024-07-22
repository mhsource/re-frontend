import * as React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Chip } from '@mui/material';


const TopBar = () => {

    const handleSubmit = () => {
        localStorage.removeItem("token")
        window.location.href ="/"
      };


    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    <img src="" style={{ width: "48px", marginTop: "6px" }}></img>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ flexGrow: 1 }} />
                <Chip icon={<InboxIcon />} onClick={handleSubmit} color="primary" label="Sair" />
            </Toolbar>
        </ AppBar>
    )
}
export default TopBar;