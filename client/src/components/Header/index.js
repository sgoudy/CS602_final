import {
    Button,
    Grid,
    Typography,
    } from '@mui/material/';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react'
import dbIcon from '../../images/db192.png'


export default function Header(props) {
   
    const [user, setNull] = useState('')
    const navigate = useNavigate();

    const logOut = ()=>{
        axios.get('/api/logout')
        .then((res) => {
            if(res.status !== 200){
                console.log('Error: ' + res.message)
                return
            } else {
                setNull(null)
                navigate(res.data.redirectUrl)
            }})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response);
            }
        })     
    }

    return (
        <Grid container component="header">
            <Grid item xs={12} 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    width: '100%',
                    top: 0,
                    zIndex: 1100,
                    backgroundColor: '#2d424a',
                    padding: 2
                }}
                >
                <img src={dbIcon} alt="dumbbell icon" height="30px" />

                <Grid item xs={12}>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{
                            margin: 'auto', 
                            color: 'white',
                            textAlign: 'center'
                            }}
                        >
                        GET SWEATY
                    </Typography>
                </Grid>

                {/* Login & Logout Button */}

                {
                    props.user && user !== null
                    ? <Button 
                        onClick={()=>{logOut()}} 
                        > 
                            LogOut
                        </Button>  
                    : <Link to="/login">
                        <Typography sx={{color: 'white'}}>
                            LogIn
                        </Typography>
                    </Link> 
                }
        </Grid>
    </Grid>
    )
}
