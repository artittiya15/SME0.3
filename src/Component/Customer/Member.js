import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import MemberFilter from "./FilterMember/MemberFilter";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./../Share/CardTotal";
import  MockDataMember from "../../MockData/Customer/MockDataMember.json"
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
  {
    filterName: "Platinum",
    selected: false,
  },
  {
    filterName: "Custom Date",
    selected: false,
  },
];

export default function Member() {
  const componentRef = useRef();
  const [member, setMember] = useState();

  useEffect(() => {
    async function fetchMember() {
      setMember(MockDataMember.data);
    }
    fetchMember();
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
      <Typography variant="h5" style={{fontWeight:"bold",marginLeft: "10px"}}>Member Report</Typography>
        
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <MemberFilter filterData={filter} />
        {member && (
          <ActionBar handlePrint={handlePrint} dataExportCSV={member} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {member && <CardTotal type="single" value={member.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {member && <Table data={member} />}
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
