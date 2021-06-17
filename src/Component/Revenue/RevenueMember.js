import React, { useState, useEffect, useRef } from "react";
import ActionBar from "./ActionBar";
import FilterList from "./FilterList";
import Navbar from "../Share/Navbar";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./CardTotal";
import MockDataRevenueMember from "../../MockData/Revenue/RevenueMember.json";
import TableRevenue from "./TableRevenue";
import { useReactToPrint } from "react-to-print";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // background: "#E0E0E0"
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
    fontFamily:"MyriadPro",
    lineHeight:"35px"
  },
}));

export default function RevenueMember() {
  const componentRef = useRef();
  const [RevenueMember, setRevenueMember] = useState();

  async function fetchRevenueMember() {
    setRevenueMember(MockDataRevenueMember.data);
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
        <BreadcrumbBar></BreadcrumbBar>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.RevenueByMember}>
        Revenue By Member
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <FilterList />
        {RevenueMember && (
          <ActionBar handlePrint={handlePrint} dataExportCSV={RevenueMember} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {RevenueMember && <CardTotal value={RevenueMember.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {RevenueMember && <TableRevenue data={RevenueMember} />}
      </Grid>
    </Grid>
  ));
  return (
    <React.Fragment>
      <Navbar />

      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
    </React.Fragment>
  );
}
