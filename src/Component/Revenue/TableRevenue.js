import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  colors,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    color: "#828282",
  },
  container: {
    maxHeight: window.innerHeight - 350,
    color: "#828282",
  },
  footer: {
    display: "flex",
    height: "50px",
    textAlign: "left",
    // flexDirection: "row",
    // position: "fixed",
    // bottom: 0,
    // left: 0,
    // backgroundColor: "white",
    // zIndex: 999,
  },
  ColorText: {
    color: "#828282",
  },
}));
const StyledTableRow = withStyles((i) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: i.palette.action.hover,
    },
  },
}))(TableRow);

export default function AccessibleTable(props) {
  const [footer, setFooter] = useState([]);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Object.entries(props.data.list[0]).map(([key, _], index) => {
                return (
                  <TableCell
                    ref={(cell) => {
                      console.log(footer);
                      if (cell !== null && footer.length <= index)
                        setFooter((headers) => [...headers, cell.offsetWidth]);
                    }}
                    key={index}
                    align="left"
                  >
                    {key}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.data.list.map((row, index) => (
              <StyledTableRow key={index}>
                {Object.entries(row).map(([_, val], index2) => (
                  <TableCell
                    dangerouslySetInnerHTML={{ __html: val }}
                    key={index2}
                    align="left"
                  />
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.footer}>
        {Object.entries(props.data.summarytier[0]).map(([key, val], index) => (
          <Box
            key={index}
            style={{
              width: footer[index] - 32,
              padding: 16,
            }}
          >
            {val}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
