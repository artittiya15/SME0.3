import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./../Share/CardTotal";
import MockDataRevenueWalkIn from "../../MockData/Revenue/MockDataRevenueWalkIn.json";
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

  RevenueByWalkIn: {
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
    filterName: "All",
    selected: false,
  },
  {
    filterName: "Day",
    selected: false,
  },
  {
    filterName: "Month",
    selected: false,
  },
  {
    filterName: "Year",
    selected: false,
  },
  {
    filterName: "Custom Date",
    selected: false,
  },
];

export default function RevenueWalkIn() {
  const componentRef = useRef();
  const [RevenueWalkIn, setRevenueWalkIn] = useState();
  const pageName = "RevenueWalkIn";

  async function fetchRevenueMember() {
    setRevenueWalkIn(MockDataRevenueWalkIn.data);
  }

  useEffect(() => {
    fetchRevenueMember();
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
      <Grid item xs={12} sm={6} className={classes.RevenueByWalkIn}>
        <Typography variant="h5" className={classes.Typography}>
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <FilterList filterData={filter} />
        {RevenueWalkIn && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={RevenueWalkIn}
            pageName={pageName}
          />
        )}
      </Grid>
      <Grid item xs={12} container>
        {RevenueWalkIn && (
          <CardTotal type="single" value={RevenueWalkIn.summary} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {RevenueWalkIn && <Table data={RevenueWalkIn} />}
      </Grid>
    </Grid>
  ));
  return (
      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
  );
}
