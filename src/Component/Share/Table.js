import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TierIcon from "./TierIcon";

import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "hidden",
    
  },
  container: {
    maxHeight: window.innerHeight - 350,
    color: "#828282",
    boxShadow: "0px 5px 5px #ebebeb"
  },
  footer: {
    display: "flex",
    height: "50px",
    textAlign: "left",
    flexDirection: "row",
    // position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    zIndex: 999,
    fontWeight: 600,
    position: "absolute"
  },
  ColorText: {
    color: "#828282",
    
  },
  TextTableBody: {
    textAlign: "left",
  },
  TableHeader:{boxShadow: "0px 5px 5px #ebebeb"

  }
  
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
          <TableHead className={classes.TableHeader}>
            <TableRow>
              {Object.entries(props.data.list[0]).map(([key, _], index) => {
                return (
                  <TableCell
                    className={classes.ColorText}
                    ref={(cell) => {
                      if (cell !== null && footer.length <= index)
                        setFooter((headers) => [...headers, cell.offsetWidth]);
                    }}
                    key={index}
                    align="left"
                  >
                    <Typography noWrap>{key}</Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.data.list.map((row, index) => (
              <StyledTableRow key={index}>
                {Object.entries(row).map(([key, val], index2) => (
                  <React.Fragment key={index2}>
                    {key === "Tier" ? (
                      <TableCell>
                        <TierIcon level={val} />
                      </TableCell>
                    ) : (
                      <TableCell
                        dangerouslySetInnerHTML={{ __html: val }}
                        align="left"
                        className={classes.ColorText}
                      />
                    )}
                  </React.Fragment>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Box className={classes.footer}>
          {Object.entries(props.data.summarytier[0]).map(
            ([_, val], index) => (
              <Box
                key={index}
                style={{
                  width: footer[index] ? footer[index] - 32 : 100,
                  padding: 16,
                  fontFamily: "sans-serif",
                }}
              >
                {val}
              </Box>
            )
          )}
        </Box>
      </TableContainer>
    </Paper>
  );
}
