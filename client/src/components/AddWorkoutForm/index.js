import { Button, Grid, TextField, Paper} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

export default function AddWorkoutForm(props) {

    /**
     * Adds book to User database
     * @param {event} e form submission event
     */
    const addWorkout = (e) => {
        // e.preventDefault();
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        const data = {
            'name': name,
            'description': description
        }
        
        // ADD Workout and fetch from DB to update page display
        axios.post('/api/workouts/add', data)
        .then(res => {
            if(res.status !== 303){
                console.log('Error: ' + res.message)
                props.closeAddWorkout();
                return
            } else {
                props.closeAddWorkout();
            }
        })
        .catch((err) => {
            console.log(err.response)
            props.closeAddWorkout();
        })
    }
   

    return (
        <Paper
            elevation={12}
            sx={{maxWidth: '90%', mx:'auto'}}
            component="form" 
            onSubmit={addWorkout}
        >
            <Grid container justifyContent="right" alignItems="center" >
                <Button 
                    onClick={props.closeAddWorkout} 
                >
                    <CloseIcon />
                </Button>
            </Grid>
            <Grid container sx={{px: 5, paddingBottom: 2}}>
                
                <Grid item xs={12} sx={{p: 1}}>
                    <TextField
                        id="name"
                        required
                        autoFocus
                        placeholder="Name"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{p: 1}}>
                    <TextField
                        placeholder="Ex: A1: Squats. 3 sets, 12/10/8. A2:... etc."
                        multiline
                        maxRows={14}
                        id="description"
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{p: 1}}>
                    <Button 
                        type="submit" 
                        variant="contained"
                        fullWidth
                        >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}