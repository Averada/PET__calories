import React from 'react';
import { Box,Container,Typography,CssBaseline,Link } from '@material-ui/core';
import useStyles from './useStyles'

function Copyright() {
  return (
    <Typography style={{display:"flex" , flexDirection:'column' , alignItems:'center'}}variant="body2" color="textSecondary" component={'div'} >
      {'Taking care of your health '}
      <Box>
      <Link color="inherit" href="https://github.com/nikolaedorosh/PPP" >
      <img style={{width:30 , height:30}} src='github_PNG40.png' alt='git'></img>
      </Link>{' '}
      <Link color="inherit" href="https://github.com/SBernaldo" >
      <img style={{width:30 , height: "auto"}} src='spain.jpg' alt='spain'></img>
      </Link>{' '}
       <Link color="inherit" href="https://github.com/qxift" >
      <img style={{width:30 , height: "auto"}} src='usa.jpg' alt='usa'></img>
      </Link>{' '}
      <Link color="inherit" href="https://github.com/nikolaedorosh" >
      <img style={{width:30 , height: "auto"}} src='moldova.png' alt='moldova'></img>
      </Link>{' '}
      <Link color="inherit" href="https://github.com/belovinho" >
      <img style={{width:30 , height: "auto"}} src='rus.jpg' alt='rus'></img>
      </Link>{' '}
      </Box>

    </Typography>
  );
}



export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box  className={classes.main} maxWidth="sm">
      </Box>
      <footer className={classes.footer}>
        <Box maxWidth="sm">
          <Copyright />
        </Box>
      </footer>
    </div>
  );
}
