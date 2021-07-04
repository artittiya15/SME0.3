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

  Frequency: {
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

export default function Frequency() {
  const componentRef = useRef();
  const [frequency, setFrequency] = useState();
  const pageName = "Frequency";
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
      <Grid item xs={12} sm={6} className={classes.Frequency}>
        <Typography variant="h5" className={classes.Typography}>
          {" "}
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <MemberFilter filterData={filter} />
        {frequency && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={frequency}
            pageName={pageName}
          />
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
    
      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
    
  );
}
