import React from 'react';
import {
    Button,
    Grid,
    Paper,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Table
 } from '@mui/material'

export default function WorkoutLog(props) {
  return (
    <Grid container textAlign="center" sx={{marginTop: 2}}>
        <TableContainer component={Paper} elevation={12} sx={{marginTop: 2, maxWidth: '50%', mx: 'auto', maxHeight: '200px'}}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{fontSize: 20}}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Workout</TableCell>
                        <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.data?.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell >
                            {row.date}
                        </TableCell>
                        <TableCell >
                            {row.name}
                        </TableCell>
                        <TableCell >
                            {row.notes}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Grid item xs={12} sx={{marginTop: 2}}>
                
            <Button
                onClick={()=>props.close()}
            >
                Close Log
            </Button>
        </Grid>
    </Grid>
  )
}
