import axios from 'axios';
import {
    Button,
    Grid,
    TextareaAutosize
} from '@mui/material/';

export default function Workout(props) {

    const info = props.data;
    const workoutArray = info.description.split('. ');
    const exercises = []
    const sets = []
    workoutArray.map((wo, index)=>
        index % 2 ===0 ? exercises.push(wo) : sets.push(wo)
    )

    /**
     * Submits workout data along with user info to update BOTH databases
     * @param {e} event 
     */
    const completeWorkout = (e)=>{
        e.preventDefault();

        let notes = document.getElementById("notes").value;
        let data ={
            'notes': notes
        }

        // call to EDIT User History API
        axios.put(`/api/user/edit/${info._id}`, data)
        .then(res => {
            if (res.status !== 200){
                console.log(res.data.message)
                return
            } else {
                alert('Workout saved successfully! To view updated workout log, please sign out and then sign back in.')
                props.back()
            }
        })
    }

  return (
    <Grid container spacing={1} sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems:"center"
        }}
            component="form" 
            onSubmit={completeWorkout}>
        <Grid item xs={12} textAlign="center" >
            <h3>{info.name}</h3>
            <hr />
        </Grid>

        <Grid container 
            sx={{
                display: 'flex-wrap',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
            <Grid item textAlign="left" >
                <h3>Description</h3>
                {
                    workoutArray.map((i, index)=> (
                        <p key={index}>{i}</p>))
                }
            </Grid>
            
            <Grid item>
                <h4 >
                    Notes
                </h4>
                <TextareaAutosize
                    minRows={15}
                    width={80}
                    name="notes"
                    id="notes"
                    label="Notes"
                    variant="outlined"
                />
            </Grid>
        </Grid>
        
        <Grid item xs={12} textAlign="center">
            <p>Did you complete this workout? <br /><br />
                Clicking 'Complete Workout' saves it to your Log with your notes & today's date.
            </p>
        </Grid>
        <Button 
            variant="contained" 
            onClick={()=>props.back()} 
            sx={{m: 3}}
            >
            Back
        </Button>
        <Button 
            variant="contained" 
            onClick={completeWorkout} 
            sx={{m: 3
            }}
            >
            Complete Workout
        </Button>
    </Grid>     
  ) 
}
