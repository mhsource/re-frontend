import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from '@mui/material'
import MenuItems from './menu'

const SideBar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240, fleShrink: 0,
                ['& .MuiDrawer-paper']: { width: 240, boxsizing: 'border-box' }
                
            }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {MenuItems.map((text) => (
                        <ListItem key={text.nome} disablePadding >
                            <Link href={text.id} underline="none" width={"100%"}>
                                <ListItemButton>
                                    <ListItemIcon> {text.icon}
                                    </ListItemIcon> {text.nome}
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
export default SideBar;