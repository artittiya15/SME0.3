import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "../Share/CardTotal";
import MockTopPaymentMethods from "../../MockData/Ranking/MockTOPPaymentMethods.json";
import TableRevenue from "./../Share/Table";
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

  TopProduct: {
    fontSize: "30px",
    color: "#FA9917",
    display: "flex",
    alignItems: "flex-end",
    fontFamily: "MyriadPro",
    lineHeight: "35px",
  },
  textCard: {
    textAlign: "-webkit-auto",
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
    filterName: "Only Member",
    selected: false,
  },
  {
    filterName: "Only Walk-In",
    selected: false,
  },
  {
    filterName: "Custom Date",
    selected: false,
  },
];

export default function TopPaymentMethods() {
  const componentRef = useRef();
  const [TOPPaymentMethods, setTOPPaymentMethods] = useState();
  const pageName = "TopPaymentMethods";

  async function fetchTOPPaymentMethods() {
    setTOPPaymentMethods(MockTopPaymentMethods.data);
  }

  useEffect(() => {
    fetchTOPPaymentMethods();
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
      <Grid item xs={12} sm={6} className={classes.TopProduct}>
        <Typography variant="h5" className={classes.Typography}>
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <FilterList filterData={filter} />
        {TOPPaymentMethods && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={TOPPaymentMethods}
            pageName={pageName}
          />
        )}
      </Grid>
      <Grid item xs={12} className={classes.textCard} container>
        {TOPPaymentMethods && (
          <CardTotal type="multiple" value={TOPPaymentMethods.summary} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {TOPPaymentMethods && <TableRevenue data={TOPPaymentMethods} />}
      </Grid>
    </Grid>
  ));
  return (
      <Grid>
        <ComponentToPrint ref={componentRef} />
      </Grid>
  );
}
