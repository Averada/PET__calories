import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    padding: "20px",
    margin: "0, 20px",
    background: "#427276",
    color: "white",
  },
  avatar: {
    width: "150px",
    height: "150px",
  },
  classForText: {
    marginLeft: "12px",
    padding: "8px",
  },
  input: {
    display: "none",
  },
  button: {
    position: "absolute",
    padding: "2px 8px",
    fontSize: "12px",
    right: "2vw",
  },
}));

export default useStyles
