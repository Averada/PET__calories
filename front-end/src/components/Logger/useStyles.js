import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxes: {
    marginTop: 40,
  },
  typolog: {
    marginLeft: 78,
    color: '#34575B',
    marginBottom:15
  },
  typolog2: {
    marginLeft: 76,
    color: '#34575B',
    marginBottom:15,
  },
  styleForContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: -40,
  },
  forBox1: {
    marginRight: 10,
  },
  legend: {
    paddingTop: 83,
  },
  text: {
    fontSize: 15,
    fontWeight:'bold'
  },
  forBoxes:{
    margin: '0 , 20'
  }, 
  graphics: {
    width: "300",
    ['@media (max-width:1400px)']: { // eslint-disable-line no-useless-computed-key
      width: '200'
    }
  }
}));

export default useStyles
