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
    color: "#828282",
  },

  ColorsTextBoxSingle: {
    color: "#FA9917",
    fontSize: "24px",
    margin: "10px",
    minHeight: "100px",
    borderRadius: 10,
    border: "4px solid #EBEBEB",
    textAlign: "center",
  },
  TypographyCardKey: { paddingLeft: 25, fontWeight: 500 },
  TypographyCardVal: { fontWeight: 800 },
  CardContent: { textAlign: "center" },
  TypographySingleKey: { fontWeight: 400 },
  TypographySingleVal: { fontWeight: 800 },
});
export default function CardOfTier(props) {
  console.log(props);
  const classes = useStyles();
  const formatNumber = (val) =>
    (+val)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .split(".")[0];

  return (
    <Grid item xs={12} container style={{ textAlign: "left" }}>
      {Object.entries(props.value).map(([key, val], index) => {
        if (index === 0) {
          return (
            <Grid item xs={3} key={index}>
              <Card className={classes.ColorsTextBoxSingle} variant="outlined">
                <CardContent>
                  {Object.entries(val).map(([key2, val2], index2) => {
                    return (
                      <Grid xs={12} item container key={index2}>
                        <Grid item xs={6}>
                          <Typography className={classes.TypographyCardKey}>
                            {key2}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography className={classes.TypographyCardVal}>
                            {formatNumber(val2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={9} key={index}>
              <Card className={classes.root} variant="outlined">
                <CardContent className={classes.CardContent}>
                  <Typography className={classes.TypographySingleKey}>
                    {key}
                  </Typography>
                  <Typography className={classes.TypographySingleVAl}>
                    {formatNumber(val)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}
