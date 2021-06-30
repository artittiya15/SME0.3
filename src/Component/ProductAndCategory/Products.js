import React, { useState, useEffect, useRef } from "react";
import ActionBar from "../Share/ActionBar";
import FilterList from "./../Share/FilterList";
import Grid from "@material-ui/core/Grid";
import BreadcrumbBar from "./../Share/BreadcrumbBar";
import { makeStyles } from "@material-ui/core/styles";
import CardTotal from "./../Share/CardTotal";
import MockDataProduct from "../../MockData/ProductAndCategory/MockDataProduct.json";
import Table from "./../Share/Table";
import { useReactToPrint } from "react-to-print";
import SearchProduct from "./Components/SearchProduct"
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

  Products: {
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

export default function Products(props) {
  const componentRef = useRef();
  const [products, setProducts] = useState();
  const pageName = "Products";

  async function fetchProducts() {
    setProducts(MockDataProduct.data);
  }

  useEffect(() => {
    fetchProducts();
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
      <Grid item xs={12} sm={6} className={classes.Products}>
        <Typography variant="h5" className={classes.Typography}>{pageName}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        className={classes.FilterAction}
      >
         <SearchProduct /> 
        <FilterList filterData={filter} />
        {products && (
          <ActionBar handlePrint={handlePrint} dataExportExcel={products} pageName={pageName} />
        )}
      </Grid>
      <Grid item xs={12} container>
        {products && <CardTotal type="single" value={products.summary} />}
      </Grid>
      <Grid item xs={12} container>
        {products && <Table data={products} />}
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
