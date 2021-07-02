import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import MockDataTiers from "../../MockData/TOTALPoints/MockDataTiers.json";
import Table from "../Share/Table";
import { useReactToPrint } from "react-to-print";
import CardOfTier from "./Components/CardOfTier";
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

  Tiers: {
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
    filterName: "All ",
    selected: false, 
  },
  {
    filterName: "TopLTV",
    selected: false,
  },
  {
    filterName: "Top Revenue",
    selected: false,
  },
  {
    filterName: "Top Big Spender",
    selected: false,
  },
 
];

export default function Tiers(props) {
  const componentRef = useRef();
  const [tiers, setTiers] = useState();
  const pageName = "Tiers";

  useEffect(() => {
    async function fetchTiers() {
      setTiers(MockDataTiers.data);
    }
    fetchTiers();
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
      <Grid item xs={12} sm={6} className={classes.Tiers}>
        <Typography variant="h5" className={classes.Typography}>
          {pageName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container className={classes.FilterAction}>
        <FilterList filterData={filter} />
        {tiers && (
          <ActionBar
            handlePrint={handlePrint}
            dataExportExcel={tiers}
            pageName={pageName}
          />
        )}
      </Grid>
      <Grid item xs={12} container>
        {tiers && <CardOfTier value={tiers.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {tiers && <Table data={tiers} />}
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
