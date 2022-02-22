import React from 'react';
import axios from 'axios'
import {
    Button,
    Grid,
    TextField
} from '@mui/material/';

export default function SearchForm(props) {

    const searchWorkouts = (e)=>{
        e.preventDefault();
        const name = document.getElementById('search_name').value;
        axios.get(`/api/workouts/${name}`)
            .then((res)=>{
                if (res.status !== 200){
                    console.log(res.message)
                } else {
                    props.setSearchInfo(res.data.data)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

  return (
      <>
        <Grid item
            component="form" 
            sx={{
                mx: 3
            }}
            onSubmit={searchWorkouts}
            >
            <TextField 
                sx={{m: 1}}
                size="small"
                id="search_name"
                placeholder="Search"
                variant="outlined"
            />
            <Button 
                sx={{m: 1}}
                type="submit" 
                variant="contained"
                >
                Go
            </Button>
        </Grid>
    </>
    );
}
