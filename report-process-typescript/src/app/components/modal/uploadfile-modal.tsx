import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UploadFile from "@mui/icons-material/UploadFile";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  minWidth: 700,
  borderRadius: 3,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UploadFileModal() {
  const [open, setOpen] = React.useState(false); // modal
  const handleOpen = () => setOpen(true); // modal
  const handleClose = () => {
    setOpen(false);
    resetData();
  }; // modal

  //input
  const [mode, setMode] = React.useState<string>("1");
  const changeMode = (event: any) => {
    setMode(event.target.value);
  };
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  // Validate
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    console.log("errors", errors);
  };

  //upload
  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const resetData = () => {
    setValue("folderFiles", null);
    setValue("folderName", null);
  };

  const fileName = watch("folderFiles")?.[0]?.name || "";

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        <UploadFile className="mr-1"></UploadFile>Upload Data
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Data
          </Typography>
          <div className="mt-4">
            <FormControl>
              <FormLabel id="radio-buttons-group-label">Mode</FormLabel>
              <RadioGroup row value={mode} onChange={changeMode} aria-labelledby="radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="1" control={<Radio />} label="Upload" />
                <FormControlLabel value="2" control={<Radio />} label="Folder" />
              </RadioGroup>
            </FormControl>
          </div>
          {mode == "1" ? (
            <div className="mt-4">
              <Box sx={{ minWidth: 350 }}>
                <FormControl fullWidth>
                  <InputLabel className="bg-white">Folder Name</InputLabel>
                  <Select value={age} label="Age" onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="mt-4 flex justify-between align-center">
                <input type="file"></input>
                <div>
                  <Button variant="contained">
                    <UploadFile className="mr-1"></UploadFile>Upload Data
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 flex justify-between self-center">
                <TextField
                  fullWidth
                  size="small"
                  error={Boolean(errors.folderName)}
                  label="Folder Name"
                  defaultValue=""
                  helperText={errors.folderName && "This field is required"}
                  {...register("folderName", { required: true })}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Button
                    variant="contained"
                    id="upload"
                    onClick={() => {
                      handleUploadClick();
                    }}
                  >
                    <UploadFile className="mr-1"></UploadFile>Upload
                  </Button>
                  <input type="file" id="fileInput" className="hidden" {...register("folderFiles", { required: true })}></input>
                  {errors?.folderFiles ? (
                    <label htmlFor="fileInput" className="ml-3 text-red-500 text-xs">
                      Please Upload files*
                    </label>
                  ) : (
                    <label htmlFor="fileInput" className="ml-3 text-secondary text-xs cursor-pointer">
                      {fileName ? fileName : null}
                    </label>
                  )}
                </div>
                {fileName && (
                  <Button variant="contained" type="submit">
                    <UploadFile className="mr-1"></UploadFile>Confirm
                  </Button>
                )}
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}
