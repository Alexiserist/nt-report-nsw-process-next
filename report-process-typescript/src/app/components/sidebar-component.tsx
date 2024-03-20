import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import DraftsIcon from "@mui/icons-material/Drafts";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

export interface ListItem {
  icon: any;
  name: string;
  isFolder: boolean;
  subFolder: ListItem[];
}

export default function SidebarComponent() {
  const itemList: ListItem[] = [
    {
      icon: MailIcon,
      name: "Folder 1",
      isFolder: true,
      subFolder: [
        {
          icon: DraftsIcon,
          name: "File 1",
          isFolder: false,
          subFolder: [],
        },
        {
          icon: DraftsIcon,
          name: "File 1",
          isFolder: false,
          subFolder: [],
        },
      ],
    },
    {
      icon: MailIcon,
      name: "Folder 1",
      isFolder: true,
      subFolder: [
        {
          icon: DraftsIcon,
          name: "File 1",
          isFolder: false,
          subFolder: [],
        },
        {
          icon: DraftsIcon,
          name: "File 1",
          isFolder: false,
          subFolder: [],
        },
      ],
    },
    {
      icon: DraftsIcon,
      name: "File 1",
      isFolder: false,
      subFolder: [],
    },
    // Add more items as needed
  ];

  const [openSecondLevel, setOpenSecondLevel] = React.useState(-1);

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader">
        {itemList.map((item, index) => {
          if (item.subFolder.length === 0) {
            return (
              <ListItemButton key={index}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            );
          } else {
            return (
              <div key={index}>
                <ListItemButton onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)}>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {openSecondLevel === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {item.subFolder.map((subItem,subIndex) => {
                  return (
                    <Collapse key={`collapse_${index}_${subIndex}`}  in={openSecondLevel === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <subItem.icon />
                          </ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  );
                })}
              </div>
            );
          }
        })}
      </List>
    </div>
  );
}
