import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    Grid
} from '@mui/material/';
import Header from '../Header'
import Workout from '../Workout'
import WorkoutLog from '../WorkoutLog'
import SearchForm from '../SearchForm'

export default function ViewWorkouts() {
    const [info, setInfo] = useState([]);
    const [user, setUser] = useState(false)
    const [log, setLog] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [message, setMessage] = useState('')
    const [showWorkout, setShowWorkout] = useState(false)
    const [singleWorkout, setSingleWorkout] = useState('')
    const [history, setHistory] = useState([])
    const [showScreen, setDisplay]= useState(false)
    const [role, setRole] = useState('')

    const navigate = useNavigate();
   
    const getWorkout = (data) =>{
        setShowWorkout(true)
        setSingleWorkout(data)
        axios.get(`/api/workout/${data._id}`)
        .then((res) => {
            if(res.status !== 200){
                console.log('Error: ' + res.message)
                return
            }})
        .catch((err)=>{
            console.log(err);
            navigate('/')
            })     
    }

    
    // GET Workouts
    useEffect(()=> 
        axios.get('/api/workouts')
        .then(res => {
            if(res.status !== 200){
                console.log('Error: ' + res.message)
                setHasError(true)
                setMessage(res.message)
                return
            } else {
                setDisplay(true)
                setInfo(res.data.data)
                setUser(true)
                setRole(res.data.user_role)
                let revHistory = res.data.user_history.reverse();
                setHistory(revHistory)
            }
        })
        .catch((err) => {
            navigate('/')
            console.log(err);
        }), [setLog, navigate])


    // Get user history and reverse data so newest is at top of table
    const viewLog = ()=>{
        setLog(true)
    }

    const handleCloseLog = ()=> setLog(false)
   
    const setSearchInfo = (data)=>{
        setInfo(data)
    }

    return (
        <>
        { showScreen &&
        <Grid container 
            sx={{
            margin: 'auto',
            display: 'flex-wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly'
            }}
            >
            
            <Header user={user}/>

            {/* Workout Log Button */}
            
            {
                role === 'admin' &&
                <Grid item xs={12} textAlign="right">
                    <Button onClick={()=>{
                        navigate('/admin/workouts')
                    }}>
                        Admin View
                    </Button>
                </Grid>
            }
            {
                log
                ? <WorkoutLog data={history} close={handleCloseLog} /> 
                
                : <Grid item xs={12} textAlign="center" sx={{m:1}}>
                    <Button 
                        onClick={()=>{viewLog()}}
                        >
                            View Workout Log
                    </Button>  
                </Grid>
            }
            
            
            {/* Logic to display Workouts, single Workout, or Database depending on user "role" */}

            {
                showWorkout 
                ? <Workout 
                    data={singleWorkout} 
                    back={()=>setShowWorkout(false)}
                    />
                :  
                <Grid item sx={{textAlign: 'center'}}>
                    {
                    hasError && message !== null 
                    ?   <div>
                            {message}
                        </div>
                    : <Grid container sx={{justifyContent: 'center'}}>
                        <SearchForm setSearchInfo={setSearchInfo}/>
                        {/* <Grid item
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
                        </Grid> */}


                        {/* // Clickable workout boxes */}
                        <Grid container sx={{justifyContent: 'center'}}>
                            {info?.map(data => 
        
                            <Button
                                sx={{
                                    height: 200,
                                    width: 200,
                                    m: 2,
                                    color: 'white',
                                    backgroundColor: '#131917',
                                    ':hover': {
                                        backgroundColor: '#5f6468',
                                        color: 'white',
                                    },
                                    }} 
                                onClick={()=>getWorkout(data)}
                                key={data._id}
                                >
                                {data.name}
                            </Button>
                            
                            )}
                            </Grid>
                        </Grid>
                    }
                </Grid>
            }
        </Grid>
        }
        </>
    );
}