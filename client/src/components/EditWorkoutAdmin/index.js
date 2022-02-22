import {React, useState} from 'react'
import axios from 'axios'
import {
    Button,
    Grid,
    TextareaAutosize,
    TextField,
    Typography
} from '@mui/material'

export default function EditWorkoutAdmin(props) {

    const [desc, setDesc] = useState(props.data.description)
    const [name, setName] = useState(props.data.name)

    const handleSetDesc = (e) =>{
        const temp = e.target.value;
        setDesc(temp)
    }

    const handleSetName = (e)=>{
        const temp = e.target.value;
        setName(temp)
    }

    const saveEdits = (e)=>{
        e.preventDefault();

        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;

        if (name === null || name === ''){
            name = props.data.name
        }
        if (description === null || description === ''){
            description = props.data.description
        }


        const data = {
            'name': name,
            'description': description
        }
        
        axios.put(`/api/workout/edit/${props.data._id}`, data)
            .then(res => {
                if (res.status !== 200){
                    console.log(res.data.message)
                    return
                } else {
                    props.back()
                }
            })
            .catch(err=>
                console.log(err.response)
                )
    }

    const goBack = ()=>{
        props.back()
    }
    
    return (
        <Grid container justifyContent="center" textAlign="center" sx={{m: 2, px: 10}} component="form" onSubmit={saveEdits}>
            <Grid item xs={12} textAlign="center" sx={{m: 2}}>
                <Typography variant ="h3">Edit Workout</Typography>
                <Typography variant ="p" ><br/>To prevent accidental deletion:<br /> Fields is left blank will leave existing data unchanged.<br/> To remove data temporarily (not recommended), replace text with '.' or another placeholder.</Typography>
            </Grid>
            <Grid item xs={12} sx={{p:1}}>
                <Typography sx={{m: 2}} variant="h5">
                    Name:<br />
                </Typography>
                <Typography sx={{m: 2}}>
                    {props.data.name}<br />
                </Typography>
                <TextField
                    name={props.data.name}
                    value={name}
                    onChange={handleSetName}
                    id="name"
                    label={props.data.name}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} >
                <Typography sx={{m: 2}} variant="h5">
                    Description:<br />
                </Typography>
                <Typography sx={{m: 2}}>
                    Description: {props.data.description}
                </Typography>
                <TextareaAutosize
                    minRows={10}
                    value={desc}
                    onChange={handleSetDesc}
                    name={props.data.description}
                    id="description"
                    label={props.data.description}
                    variant="outlined"
                />
            </Grid>
            <Button variant="contained" onClick={goBack} sx={{m: 2}}>
              Cancel
            </Button>
            <Button variant="contained" onClick={saveEdits} sx={{m: 2}}>
              Save
            </Button>
        </Grid>
    )
}
