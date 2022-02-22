import {useState, useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddWorkoutForm from '../AddWorkoutForm'
import EditWorkoutAdmin from '../EditWorkoutAdmin'
import Header from '../Header'
import SearchForm from '../SearchForm'
import {
    Button,
    Grid,
    Paper,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Table,
    TextField,
    Typography
} from '@mui/material/';


export default function AdminView() {

    const [info, setInfo] = useState([]);
    const [user, setUser] = useState(false)
    const [userData, setUserData] = useState('')
    const [update, setUpdate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [workout, selectWorkout] = useState('')
    const [showScreen, setDisplay] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let mergedList =[];

    const navigate = useNavigate();

     /** Add Workout Modal Open/Close */
    const [openAddWorkout, setAddWorkout] = useState(false)
    const handleOpenAddWorkout = () => setAddWorkout(true)


    // GET Workouts
    useEffect(()=> {
        axios.get('/api/workouts')
            .then(res => {
                if(res.status !== 200){
                    console.log('Oops! There was an error: ' + res.message)
                    navigate(res.data.redirectUrl)
                    return
                } else {
                    // if not an administrator
                    if (res.data.user_role !== 'admin'){
                        navigate(res.data.redirectUrl)
                        return;
                    } else {
                        setDisplay(true)
                        setInfo(res.data.data)
                        setUser(true)
                    }
                }
            })
            .catch((err) => {
                navigate('/')
                console.log(err)
            })
        }, 
        [update, openEdit, navigate]
    )
    

    // Deletes Workout 
    const deleteWorkout = (id)=>{
        const answer = window.confirm( 'Are you sure you want to delete this workout? This action cannot be undone')

        if (answer) {
            axios.delete(`/api/workout/delete/${id}`)
            .then(res =>{
                if (res.status !== 200){
                    console.log(res.message);
                    return;
                } else {
                    window.alert('Workout deleted.')
                    setUpdate(true)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        setUpdate(false)
    }


    // Go Edit
    const goEdit = (workout)=>{
        selectWorkout(workout)
        setOpenEdit(true)
    }
    

    // Data gathering and sort for workout log
    useMemo(()=>{
        let userLog=[]
        info.map((i)=>
            userLog.push([i.name, i.users])
            )
        for (let x of userLog){
            for (let i of x[1]){
                mergedList.push([x[0], i.user_id, i.date])
            }
        }
        mergedList.sort((a,b)=>{
            return new Date(b[2]) - new Date(a[2]);
        });
        }
        ,[info, mergedList]);


    const handleRedirect = ()=>{
        navigate('/workouts')
    }

    const setSearchInfo = (data)=>{
        setInfo(data)
    }


    // User Search
    const searchUsers = (e)=>{
        e.preventDefault();
        const id = document.getElementById('search_id').value;
        axios.get(`/api/users/${id}`)
            .then((res)=>{
                if (res.status !== 200){
                    console.log(res.message)
                } else {
                    setUserData(res.data.data)
                }
            })
            .catch((err)=>{
                console.log(err)
                setUserData('')
            })
    }

    return (
        <>
        { showScreen && 
            <Grid container>
                <Header user={user}/>
                    { openEdit 
                    ? <EditWorkoutAdmin 
                        data={workout}
                        back={()=>setOpenEdit(false)}
                        />
                    : 
                    <>

                    {/* Workout Library */}

                    <Grid item xs={12} textAlign="right">
                        <Button
                            onClick={handleRedirect}>
                            User View
                        </Button>
                    </Grid>

                    <Grid container sx={{
                        mx: 'auto',
                        my: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                        }}>
                        <Typography variant="h4" textAlign="center" sx={{my: 2}}>WORKOUT LIBRARY</Typography>  
                        {
                            openAddWorkout
                            ? <Typography variant="h5" sx={{my: 2}} >Add Workout</Typography>
                            : 
                            <Grid container 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                    }}>
                                <Button
                                    sx={{mx: 3}}
                                    variant="contained"
                                    onClick={handleOpenAddWorkout}
                                    >
                                    Add
                                </Button>

                                <SearchForm setSearchInfo={setSearchInfo}/>
                                
                            </Grid>
                        }
                    </Grid>

                    {/* Add Workout  */}

                    <Grid item xs={12}>
                        {openAddWorkout &&
                        <AddWorkoutForm
                            open={openAddWorkout}
                            closeAddWorkout={()=>setAddWorkout(false)}
                        />}
                    </Grid>

                    {/* Library Table */}

                    <TableContainer component={Paper} elevation={12} sx={{maxWidth: '90%', mx: 'auto', marginTop: 3, maxHeight: '800px'}}>
                        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                            <TableHead sx={{fontSize: 20}}>
                                <TableRow key="header">
                                    <TableCell key="h_name">Name</TableCell>
                                    <TableCell key="h_description" align="center">Description</TableCell>
                                    <TableCell key="h_modify" align="right">Modify</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {info.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell key="name">
                                        {row.name}
                                    </TableCell>
                                    <TableCell key="desc" align="center">
                                        {row.description}
                                    </TableCell>
                                    <TableCell key="mod" align="right" >
                                        <p>
                                            <Button 
                                                onClick={()=>goEdit(row)}
                                            >
                                                Edit
                                            </Button>
                                        </p>
                                        <p>
                                            <Button
                                                onClick={()=>deleteWorkout(row._id)}
                                                variant="contained"
                                                sx={{backgroundColor: '#612a11'}}
                                            >
                                                Delete
                                            </Button>
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Workout Log */}

                    <Grid item sx={{my: 3, mx: 'auto'}} xs={12} textAlign="center">
                        <Typography sx={{marginTop: 3}} variant="h4">WORKOUT LOG</Typography>  
                    </Grid>

                    <TableContainer component={Paper} elevation={12} sx={{marginTop: 2, marginBottom: 5, maxWidth: '90%', mx: 'auto', maxHeight: '200px'}}>
                        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                            <TableHead sx={{fontSize: 20}}>
                                <TableRow key="headers">
                                    <TableCell key="h_date">Date</TableCell>
                                    <TableCell key="h_id">Workout</TableCell>
                                    <TableCell key="h_user">User ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {mergedList?.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell key="date">
                                        {row[2]}
                                    </TableCell>
                                    <TableCell key="id">
                                        {row[0]}
                                    </TableCell>
                                    <TableCell key="user">
                                        {row[1]}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* User Search */}

                    <Grid item sx={{my: 3, mx: 'auto'}} xs={12} textAlign="center">
                        <Typography variant="h4">USER SEARCH</Typography>  
                    </Grid>

                    <Grid container
                        component="form" 
                        sx={{
                            mx: 3,
                            marginBottom: 3,
                            justifyContent: 'center'
                        }}
                        onSubmit={searchUsers}
                        >
                        <TextField 
                            sx={{m: 1}}
                            size="small"
                            id="search_id"
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

                        {/* User Search Result Table */}

                    {
                        userData !== '' &&
                        <TableContainer component={Paper} elevation={12} sx={{marginTop: 2, marginBottom: 5, maxWidth: '90%', mx: 'auto', maxHeight: '200px'}}>
                        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                            <TableHead sx={{fontSize: 20}}>
                                <TableRow key="headers">
                                    <TableCell key="h_date">Date</TableCell>
                                    <TableCell key="h_name">Workout</TableCell>
                                    <TableCell key="h_notes">Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {userData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell key="date">
                                        {row.date}
                                    </TableCell>
                                    <TableCell key="name">
                                        {row.name}
                                    </TableCell>
                                    <TableCell key="notes">
                                        {row.notes}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                    
                </>
                }
            </Grid>
            }
       </> 
    )
}
