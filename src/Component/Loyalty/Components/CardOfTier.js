import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TierIcon from "../../Share/TierIcon";
const useStyles = makeStyles({
  root: {
    margin: "10px",
    minHeight: "100px",
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
    textAlign: "left",
    
    
},
  
  TypographyCardKey: { paddingLeft: 25, fontWeight: 500 },
  TypographyCardVal: { fontWeight: 800 ,textAlign:"right"},
  CardContent: { padding: 0, textAlign: "left" },
  TypographySingleKey: { fontWeight: 400 },
  TypographySingleVal: { fontWeight: 800 },
});
export default function CardOfTier(props) {
  // console.log(props);
  const classes = useStyles();
  const formatNumber = (val) =>
    (+val)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .split(".")[0];

  return (
    <Grid item xs={12} container >
      <Grid item xs={3}>
        <Card className={classes.ColorsTextBoxSingle} variant="outlined">
          <CardContent style={{padding:0,marginLeft: "-8px"}}>
            {Object.entries(props.value.Member).map(([key, val], index2) => {
              return (
                <Grid xs={12} item container key={index2}>
                  <Grid item xs={6}>
                    <Typography className={classes.TypographyCardKey}>
                      {key}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.TypographyCardVal}>
                      {formatNumber(val)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={9}>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.CardContent} style={{padding:0}}>
            <Grid item xs={12} container>
              <Grid item xs={2}>
                <Typography style={{ height: 20 }} />
                {Object.entries(props.value.Tier[0]).map(([key, _], index) => (
                  <React.Fragment key={index}>
                    {index > 1 && (
                      <Typography
                        style={{ fontSize: 14 }}
                        // className={classes.TypographySingleKey}
                        key={index}
                      >
                        {key}
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
              {props.value.Tier.map((item, index) => {
                return (
                  <Grid item xs={2} key={index}>
                    {Object.entries(item).map(([_, val], index2, original) => (
                      <React.Fragment key={index2}>
                        {index2 === 0 ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              fontSize: 16,
                              columnGap: 4,
                              marginLeft: -24,
                              fontWeight: "800"
                            }}
                          >
                            <TierIcon width={20} height={20} level={val} />
                            {val} : {original[index2 + 1][1]}
                          </div>
                        ) : index2 > 1 ? (
                          <Typography style={{fontWeight: "800", fontSize: 14}}>
                            {formatNumber(val)}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
