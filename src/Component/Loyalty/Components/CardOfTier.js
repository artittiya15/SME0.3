import React from 'react'
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
}})
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
                            <Typography
                              style={{ paddingLeft: 25, fontWeight: 500 }}
                            >
                              {key2}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 800 }}>
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
                    <CardContent style={{ textAlign: "center" }}>
                      <Typography style={{ fontWeight: 400 }}>{key}</Typography>
                      <Typography style={{ fontWeight: 800 }}>
                        {formatNumber(val)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })}
       </Grid>
    )
}
