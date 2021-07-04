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

  BigSpender: {
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

export default function BigSpender() {
  const componentRef = useRef();
  const [bigSpender, setBigSpender] = useState();
  const pageName = "BigSpender";

  useEffect(() => {
    async function fetchBigSpender() {
      setBigSpender(MockDataBigSpender.data);
    }
    fetchBigSpender();
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
      <Grid item xs={12} sm={6} className={classes.BigSpender}>
        <Typography variant="h5" className={classes.Typography}>
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <MemberFilter filterData={filter} />
        {bigSpender && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={bigSpender}
            pageName={pageName}
          />
        )}
      </Grid>
      <Grid item xs={12} container>
        {bigSpender && <CardTotal type="mixed" value={bigSpender.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {bigSpender && <Table data={bigSpender} />}
      </Grid>
    </Grid>
  ));
  return (
    
      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
    
  );
}
