import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardOfEarnPoints from "./Components/CardOfEarnPoints";
import MockDataEarnPoints from "../../MockData/TOTALPoints/MockDataEarnPoints.json";
import Table from "../Share/Table";
import { useReactToPrint } from "react-to-print";

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

  RevenueByMember: {
    fontSize: "30px",
    color: "#FA9917",
    display: "flex",
    alignItems: "flex-end",
    fontFamily: "MyriadPro",
    lineHeight: "35px",
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

export default function EarnPoint() {
  const componentRef = useRef();
  const [earnPoint, setEarnPoint] = useState();

  useEffect(() => {
    async function fetchEarnPoint() {
      setEarnPoint(MockDataEarnPoints.data);
    }
    fetchEarnPoint();
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
      <Grid item xs={12} sm={6} className={classes.RevenueByMember}>
        {props.name}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <FilterList filterData={filter} />
        {earnPoint && (
          <ActionBar handlePrint={handlePrint} dataExportCSV={earnPoint} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {earnPoint && <CardOfEarnPoints type="single" value={earnPoint.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {earnPoint && <Table data={earnPoint} />}
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
