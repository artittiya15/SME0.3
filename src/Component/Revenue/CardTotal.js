import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    height: "100px",
    borderRadius: 10,
    border: "4px solid #EBEBEB",
  },
 
  TypographyKey: {
    fontWeight: "600",
  },
  ColorsTextBox: {
    color: "#FA9917",
    fontWeight: "600",
    fontSize: "24px",
    margin: "10px",
    height: "100px",
    borderRadius: 10,
    border: "4px solid #EBEBEB",
  },
});

export default function CardTotal(props) {
  const xs = 12 / Object.keys(props.value).length;
  const classes = useStyles();
  const formatNumber = (val) => (+val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,").split(".")[0];
  return (
    <Grid item xs={12} container>
      {Object.entries(props.value).map(([key, val], index) => {
        if (index === 0) {
          return (
            <Grid item xs={xs} key={index}>
              <Card className={classes.ColorsTextBox} variant="outlined">
                <CardContent>
                  <Typography className={classes.TypographyKey}>
                    {key}
                  </Typography>
                  <Typography>{formatNumber(val)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={xs} key={index}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.TypographyKey}>
                    {key}
                  </Typography>
                  <Typography>{formatNumber(val)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}
