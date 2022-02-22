import React from 'react';
import image from '../../images/404.png'
import {Link} from 'react-router-dom'

import {Grid} from '@mui/material/';

export default function NotFound() {
  return (
    <Grid container justifyContent="center">
        <Link to="/">
            <img src={image} alt="funny caveman 404" />
        </Link>
    </Grid>
  );
}
