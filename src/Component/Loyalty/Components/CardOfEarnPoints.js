import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TierIcon from "./../../Share/TierIcon";

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
    minHeight: "88px",
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
});

export default function CardOfEarnPoints(props) {
  const xs =
    12 /
      (Array.isArray(props.value)
        ? props.value.length
        : Object.keys(props.value).length) -
    1;
  const classes = useStyles();
  const formatNumber = (val) =>
    (+val)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .split(".")[0];
  return (
    <Grid item xs={12} container style={{ textAlign: "left" }}>
      {Object.entries(props.value).map(([key, val], index) => {
        if (index === 2) {
          // การ์ดที่ 3
          return (
            <Grid
              item
              xs={
                xs * 2 // ยาว 2 เท่า ของ 2 การ์ดแรก
              }
              key={index}
            >
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography style={{ fontWeight: 600, textAlign: "center" }}>{key}</Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {Object.entries(val).map(([key2, val2], index2) => (
                      <div
                        key={index2}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          
                        }}
                      >
                        <TierIcon level={key2} />
                        <Typography style={{ paddingLeft: 10 }}>
                          {val2}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        } else {
          // 2 การ์ดแรก
          return (
            <Grid item xs={xs} key={index}>
              <Card
                className={
                  index === 0 ? classes.ColorsTextBoxSingle : classes.root // index = 0 คือการ์ดแรก ให้เป็นสีส้ม
                }
                variant="outlined"
              >
                <CardContent style={{ textAlign: "center" }}>
                  <Typography style={{ fontWeight: 600 }}>{key}</Typography>
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
  );
}
