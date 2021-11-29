import {makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    flexGrow: 1,
  },
  changeTheme: {
    marginLeft: theme.spacing(2),
  },
  linkStyle: {
    width: "700px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  colorPrimary: {
    background: "#427276",
    padding: 8,
    borderRadius: 10
  },
  modal: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "inherit",
  },
  logger:{
    marginLeft: 60,
    
  }
}));


export default useStyles
