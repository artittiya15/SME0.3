import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "../Share/CardTotal"
import MockDataRankingTopProduct from "../../MockData/Ranking/MockDataRankingTopProduct .json";
import TableRevenue from "./../Share/TableRevenue";
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
  
  TopProduct: {
    fontSize: "30px",
    color: "#FA9917",
    display: "flex",
    alignItems: "flex-end",
    fontFamily:"MyriadPro",
    lineHeight:"35px"
  },
  textCard:{
    textAlign:"start",
    paddingTop: "inherit"
  }
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

export default function TopProduct() {
  const componentRef = useRef();
  const [RankingTopProduct, setRankingTopProduct] = useState();

  async function fetchRankingTopProduct() {
    setRankingTopProduct(MockDataRankingTopProduct.data);
  }

  useEffect(() => {
    fetchRankingTopProduct();
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
        {RankingTopProduct && (
          <ActionBar handlePrint={handlePrint} dataExportCSV={RankingTopProduct} />
        )}
      </Grid>
      <Grid item xs={12} container  className={classes.textCard}>
        {RankingTopProduct && <CardTotal type="multiple" value={RankingTopProduct.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {RankingTopProduct && <TableRevenue  data={RankingTopProduct} />}
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