import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from '@material-ui/core';
import Meal from '../Meal/Meal';
import useStyles from './useStyles';
import { v4 as uuidv4 } from 'uuid';
function TableMeal({ week }) {
  console.log(week, '<------------week');
  const classes = useStyles();
  return (
    <Box className={classes.table}>
      <Paper elevation={5} variant="outlined" className={classes.paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.textForTable}>Date:</TableCell>
              <TableCell className={classes.textForTable}>Name:</TableCell>
              <TableCell className={classes.textForTable}>Proteins:</TableCell>
              <TableCell className={classes.textForTable}>Fats:</TableCell>
              <TableCell className={classes.textForTable}>
                Carbohydrates:
              </TableCell>
              <TableCell className={classes.textForTable}>Kcal:</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          {week.length ? (
            [...week].reverse().map((el) => (
              <TableBody key={uuidv4()}>
                <TableRow >
                    <Meal
                      key={uuidv4()}
                      date={el.date}
                      items={el.items}
                      id={el._id}
                    />
                </TableRow>
              </TableBody>
            ))
          ) : (
            <> </>
          )}
        </Table>
      </Paper>
    </Box>
  );
}

export default TableMeal;
