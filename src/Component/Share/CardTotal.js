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

  ColorsTextBox: {
    color: "#FA9917",
    fontSize: "24px",
    margin: "10px",
    minHeight: "100px",
    borderRadius: 10,
    border: "4px solid #EBEBEB",
    textAlign: "left",
  },
  ColorTextBoxSecond: {
    color: "#828282",
    fontSize: "24px",
    margin: "10px",
    minHeight: "100px",
    borderRadius: 10,
    border: "4px solid #EBEBEB",
  },
  CardContentMixed: {
    display: "flex",
    flexDirection: "column",
    minHeight: "99px",
    justifyContent: "center",
    padding: 6,
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
  typography: {
    fontFamily: ["Myriad Pro", "sans-serif"].join(","),
  },
  GridMultiple: { textAlign: "left" },
  TypographyKey: {
    fontSize: "14px",
  },
  TypographyVal: {
    fontWeight: 800,
    fontSize: "14px",
  },
  TypographyMultiple: { fontWeight: 600, fontSize: 16 },
  TypographySingle: {
    fontWeight: 800,
  },
  CardContentSingle: { textAlign: "center" },
});

export default function CardTotal(props) {
  const xs =
    12 /
    (Array.isArray(props.value)
      ? props.value.length
      : Object.keys(props.value).length);
  const classes = useStyles();
  const formatNumber = (val) =>
    (+val)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .split(".")[0];
  return (
    <Grid item xs={12} container className={classes.GridMultiple}>
      {props.type === "multiple" ? (
        <>
          {Object.entries(props.value).map(([key, val], index) => {
            return (
              <Grid item xs={xs} key={index}>
                <Card
                  className={
                    index === 0
                      ? classes.ColorsTextBox
                      : classes.ColorTextBoxSecond
                  }
                  variant="outlined"
                >
                  <CardContent className={classes.text}>
                    <Grid xs={12} item container>
                      <Grid item xs={12}>
                        <Typography className={classes.TypographyMultiple}>
                          {key}
                        </Typography>
                      </Grid>
                    </Grid>
                    {Object.entries(val).map(([key2, val2], index2) => {
                      return (
                        <Grid xs={12} item container key={index2}>
                          <Grid item xs={7}>
                            <Typography className={classes.TypographyKey}>
                              {key2}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography className={classes.TypographyVal}>
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
          })}
        </>
      ) : props.type === "single" ? (
        <>
          {Object.entries(props.value).map(([key, val], index) => {
            return (
              <Grid item xs={xs} key={index}>
                <Card
                  className={
                    index === 0 ? classes.ColorsTextBoxSingle : classes.root
                  }
                  variant="outlined"
                >
                  <CardContent className={classes.CardContentSingle}>
                    <Typography>{key}</Typography>
                    <Typography className={classes.TypographySingle}>
                      {formatNumber(val)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </>
      ) : props.type === "mixed" ? (
        <>
          {props.value.map((val, index) => {
            return (
              <Grid item xs={xs} key={index}>
                <Card
                  className={
                    index === 0
                      ? classes.ColorsTextBox
                      : classes.ColorTextBoxSecond
                  }
                  variant="outlined"
                >
                  <CardContent className={classes.CardContentMixed}>
                    {Object.entries(val).map(([key2, val2], index2) => {
                      return (
                        <React.Fragment key={index2}>
                          {Object.entries(val).length === 1 ? (
                            <>
                              <Grid
                                item
                                xs={12}
                                style={{ textAlign: "center" }}
                                container
                              >
                                <Grid item xs={12}>
                                  <Typography className={classes.TypographyKey}>
                                    {key2}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                style={{ textAlign: "center" }}
                                container
                              >
                                <Grid item xs={12}>
                                  <Typography className={classes.TypographyVal}>
                                    {val2}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </>
                          ) : (
                            <Grid item xs={12} container>
                              <Grid item xs={6}>
                                <Typography className={classes.TypographyKey}>
                                  {key2}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography className={classes.TypographyVal}>
                                  {formatNumber(val2)}
                                </Typography>
                              </Grid>
                            </Grid>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
}
