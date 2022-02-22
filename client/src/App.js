import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import ViewWorkouts from './components/ViewWorkouts';
import Login from './components/Login';
import AdminView from './components/AdminView'
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary:{
            main: '#5f6468'
        },
        secondary: {
            main: '#b4786b'
        }
    }
  });

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" exact element={<Login/>}/> 
                <Route path ="/login" exact element={<Login/>}/>
                <Route path ="/workouts" element={<ViewWorkouts />}/>
                <Route path= "/admin/workouts" exact element={<AdminView />}/>
                <Route path="*" element={<Login/>} />
            </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
