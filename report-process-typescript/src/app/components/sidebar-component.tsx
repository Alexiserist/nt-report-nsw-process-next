import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import DraftsIcon from '@mui/icons-material/Drafts';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export interface ListItem {
    icon: any,
    name: string,
    isFolder : boolean,
    subFolder : ListItem[]
}

export default function SidebarComponent() {
    const itemList: ListItem[] = [
        {
            icon: MailIcon,
            name: 'Folder 1',
            isFolder: true,
            subFolder: []
        },
        {
            icon: DraftsIcon,
            name: 'File 1',
            isFolder: false,
            subFolder: []
        },
        // Add more items as needed
    ];

    const [open, setOpen] = React.useState(true);
    const [openSecondLevel, setOpenSecondLevel] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    }
    const handleClickSecondLevel = () => {
        setOpenSecondLevel(!openSecondLevel);
    }

    return (
        <div>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
            {itemList.map((item, index) => (
                <ListItemButton>
                    <ListItemIcon>
                        <item.icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                </ListItemButton>
            ))}
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
        </div>
    );
}