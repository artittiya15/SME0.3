import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import MemberFilter from "./FilterMember/MemberFilter";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./../Share/CardTotal";
import MockDataBigSpender from "../../MockData/Customer/MockDataBigSpender.json";
import Table from "./../Share/Table";
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

export default function Frequency() {
  const componentRef = useRef();
  const [frequency, setFrequency] = useState();

  useEffect(() => {
    async function fetchFrequency() {
      setFrequency(MockDataBigSpender.data);
    }
    fetchFrequency();
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
        <MemberFilter filterData={filter}  />
        {frequency && (
          <ActionBar handlePrint={handlePrint} dataExportCSV={frequency} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {frequency && <CardTotal type="mixed" value={frequency.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {frequency && <Table data={frequency} />}
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
