import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TableComponent({ jsonData }: any) {
  const exceldata = jsonData["data"] || [];
  const fileName = jsonData["fileName"] || "";
  console.log(exceldata);
  return (
    <div>
      <div className="text-2xl font-bold mb-5">{fileName ? `File name: ${fileName}` : ''}</div>
      {exceldata.length > 0 ? (
        <div style={{width: 'auto', overflowX: 'scroll'}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 850 ,overflow:'scroll'}} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-[#1976d2]">
                  <TableCell style={{minWidth: 170}} colSpan={3} align="center">
                    <span className="text-white text-xl">Summary Daily Documents Report</span>
                    <span className="block text-white font-semibold text-lg mt-2">Report Date : 15/02/2024</span>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-[#1976d2]">
                  <TableCell style={{minWidth: 170}} align="center">
                    <span className="text-white">Agency</span>
                  </TableCell>
                  <TableCell  style={{minWidth: 170}} align="center">
                    <span className="text-white">Inbound Document To NSW</span>
                  </TableCell>
                  <TableCell style={{minWidth: 170}} align="center">
                    <span className="text-white">Outbound Document To NSW</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exceldata.length > 0 ? (
                  exceldata.map((row: any, index: number) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell style={{maxWidth: 170}} align="center" className="cursor-pointer"></TableCell>
                      <TableCell  style={{maxWidth: 170}} align="center"></TableCell>
                      <TableCell style={{maxWidth: 170}} align="center"></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <span className="font-bold">No data</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="h-[calc(100vh_-_272px)] flex">
          <div className=" justify-center self-center border-2 bg-red-300 text-white p-4">
            <span className="text-3xl mr-3">Please Select Data </span>
            <SearchIcon className=" p-1 text-blue-500 rounded-full bg-blue-200 align-top" sx={{ fontSize: 35 }} />
          </div>
        </div>
      )}
    </div>
  );
}
