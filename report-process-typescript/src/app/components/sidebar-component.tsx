import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export interface ListItem {
  name: string;
  isFolder: boolean;
  path: string;
  subFolder: ListItem[];
}

export default function SidebarComponent({ menuItemList }: any) {
  const itemList: ListItem[] = menuItemList;

  const [openSecondLevel, setOpenSecondLevel] = React.useState(-1);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (path:any) => {
    if(path){
      setPathDelete(path);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [path,setPathDelete] = React.useState('');

  const onSelectedDelete = async() => {
    try{
      const body = {
        path: path
      };
      const res = await fetch("/api/upload3", {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }catch(e:any){
      console.error(e);
    } finally{
      handleClose();
    }
  }

  return (
    <div>
      {
        <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader">
          {itemList.map((item, index) => {
            if (item.subFolder.length === 0) {
              return (
                <ListItemButton key={index}>
                  <ListItemIcon>{item.isFolder ? <FolderIcon /> : <DescriptionIcon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              );
            } else {
              return (
                <div key={index}>
                  <ListItemButton>
                    <ListItemIcon onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)}>{item.isFolder ? <FolderIcon /> : <DescriptionIcon />}</ListItemIcon>
                    <ListItemText onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)} primary={item.name} />
                    <DeleteForeverIcon onClick={() => handleClickOpen(item.path)} className="mr-3 p-1 text-red-500 rounded-full bg-red-200" />
                    {openSecondLevel === index ? (
                      <ExpandLess onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)} />
                    ) : (
                      <ExpandMore onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)} />
                    )}
                  </ListItemButton>
                  {item.subFolder.map((subItem, subIndex) => {
                    return (
                      <Collapse key={`collapse_${index}_${subIndex}`} in={openSecondLevel === index} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <DescriptionIcon />
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
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this ?"}</DialogTitle>
        <DialogActions>
          <div className="flex justify-between">
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button onClick={onSelectedDelete} autoFocus>
            Confirm
          </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
