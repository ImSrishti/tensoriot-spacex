import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import {
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';

export default function BasicTable() {
  const [tabelData, setTableData] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://api.spacexdata.com/v3/launches', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const tempData = result.map((spacex) => {
          return {
            no: spacex?.flight_number,
            launched: spacex?.launch_date_local,
            location: spacex?.launch_site.site_name,
            mission: spacex?.mission_name,
            orbit: spacex?.rocket.second_stage.payloads[0].orbit,
            launchStatus: spacex?.launch_success,
            rocket: spacex?.rocket.rocket_name,
          };
        });
        setTableData(tempData);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      <FormControl sx={{ marginLeft: 'auto' }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={10}
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      {/* <CircularProgress color="inherit" /> */}
      <TableContainer component={Paper}>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

        <Table
          sx={{ minWidth: 650, borderRadius: 3 }}
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: 'gainsboro' }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Launched UTC</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Mission</TableCell>
              <TableCell align="right">Orbit</TableCell>
              <TableCell align="right">Launch Status</TableCell>
              <TableCell align="right">Rocket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabelData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.no}
                </TableCell>
                <TableCell align="right">{row.launched}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.mission}</TableCell>
                <TableCell align="right">{row.orbit}</TableCell>
                <TableCell align="center">
                  {row.launchStatus ? (
                    <Chip label="success" color="success" />
                  ) : (
                    <Chip label="failed" color="error" />
                  )}
                </TableCell>
                <TableCell align="right">{row.rocket}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ marginTop: 1, marginLeft: 'auto' }}
        count={5}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
}
