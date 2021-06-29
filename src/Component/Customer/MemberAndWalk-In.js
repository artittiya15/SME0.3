import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./../Share/CardTotal";
import MockDataMemberWalkIn from"../../MockData/Customer/MockDataMemberWalkIn.json";
import Table from "./../Share/Table";
import { useReactToPrint } from "react-to-print";
import Typography from "@material-ui/core/Typography";
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
    fontFamily:"MyriadPro",
    lineHeight:"35px"
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

export default function MemberAndWalkIn() {
  const componentRef = useRef();
  const [memberAndWalkIn, setMemberAndWalkIn] = useState();
  const pageName = "MemberAndWalkIn";
  async function fetchMemberAndWalkIn() {
    setMemberAndWalkIn(MockDataMemberWalkIn.data);
  }

  useEffect(() => {
    fetchMemberAndWalkIn();
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
        <Typography variant="h5" style={{fontWeight:"bold",marginLeft: "10px"}}>All Customer Report</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <FilterList filterData={filter} />
        {memberAndWalkIn && (
          <ActionBar handlePrint={handlePrint} dataExportExcel={memberAndWalkIn} pageName={pageName} />
        )}
      </Grid>
      <Grid item xs={12}  container>
        {memberAndWalkIn && <CardTotal   type="single" value={memberAndWalkIn.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {memberAndWalkIn && <Table data={memberAndWalkIn} />}
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
