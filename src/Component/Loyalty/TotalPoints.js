import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./../Share/CardTotal";
import MockDataTotalPoints from "../../MockData/TOTALPoints/MockDataTotalPoints.json";
import Table from "./../Share/Table";
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

  TotalPoints: {
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

export default function TotalPoints() {
  const componentRef = useRef();
  const [totalPoints, setTotalPoints] = useState();
  const pageName = "TotalPoints";

  useEffect(() => {
    async function fetchTotalPoints() {
      setTotalPoints(MockDataTotalPoints.data);
    }
    fetchTotalPoints();
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
      <Grid item xs={12} sm={6} className={classes.TotalPoints}>
        <Typography variant="h5" className={classes.Typography}>
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <FilterList filterData={filter} />
        {totalPoints && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={totalPoints}
            pageName={pageName}
          />
        )}
      </Grid>
      <Grid item xs={12} container>
        {totalPoints && <CardTotal type="single" value={totalPoints.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {totalPoints && <Table data={totalPoints} />}
      </Grid>
    </Grid>
  ));
  return (
    <React.Fragment>
      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
    </React.Fragment>
  );
}
