import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './404.module.css'
const PageNotFound = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <br></br>
        <h1>404</h1>
        <br />
        <h3>Page Not Found</h3>


        <h3>This page isn't part of ours!</h3>
        <br />

        <Link to="/logger">
          <Button className={styles.glow}>Go Back to Main</Button>
        </Link>

        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt='gif' />
      </Box>


      <Box>
      </Box>
    </>
  );
};

export default PageNotFound;
