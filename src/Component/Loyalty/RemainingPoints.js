import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardOfEarnPoints from "./Components/CardOfEarnPoints";
import MockDataRemainingPoints from "../../MockData/TOTALPoints/MockDataRemainingPoints.json";
import Table from "../Share/Table";
import { useReactToPrint } from "react-to-print";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  RemainingPoints: {
    fontSize: "30px",
    color: "#FA9917",
    display: "flex",
    alignItems: "flex-end",
    fontFamily: "MyriadPro",
    lineHeight: "35px",
  },
  Typography: {
    fontWeight: "bold",
    marginLeft: "10px",
  },
  FilterAction: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const filter = [
  {
    filterName: "All Tiers",
    selected: false,
  },
  {
    filterName: "Standard",
    selected: false,
  },
  {
    filterName: "Bronze",
    selected: false,
  },
  {
    filterName: "Silver",
    selected: false,
  },
  {
    filterName: "Gold",
    selected: false,
  },
];

export default function RemainingPoints() {
  const componentRef = useRef();
  const [remainingPoints, setRemainingPoints] = useState();
  const pageName = "RemainingPoints";

  useEffect(() => {
    async function fetchRemainingPoints() {
      setRemainingPoints(MockDataRemainingPoints.data);
    }
    fetchRemainingPoints();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const classes = useStyles();
  const ComponentToPrint = React.forwardRef((props, ref) => (
    <Grid ref={ref} container className={classes.root}>
      <Grid item xs={12}>
        <BreadcrumbBar />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.RemainingPoints}>
        <Typography variant="h5" className={classes.Typography}>
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <FilterList filterData={filter} />
        {remainingPoints && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={remainingPoints}
            pageName={pageName}
          />
        )}
      </Grid>
      <Grid item xs={12} container>
        {remainingPoints && (
          <CardOfEarnPoints type="single" value={remainingPoints.summary} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {remainingPoints && <Table data={remainingPoints} />}
      </Grid>
    </Grid>
  ));
  return (
  
      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
    
  );
}
