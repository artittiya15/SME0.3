import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { Button } from "@material-ui/core";
// import { CSVLink } from "react-csv";
import ReactExport from "react-export-excel";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
    textAlign: "right",
    display: "contents",
  },
  Icons: {
    color: "#828282",
  },
}));

export default function ActionBar(props) {
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const classes = useStyles();
  const { list, summarytier, pageName } = props.dataExportExcel;

  return (
    <div className={classes.root}>
      <ExcelFile filename={pageName} element={<SaveAltIcon fontSize="large" className={classes.Icons}/>}>
        <ExcelSheet  data={[...list, summarytier[0]]} name="AllRevenue">
          {Object.entries(list[0]).map(([key, val], index) => (
            <ExcelColumn key={index} label={key} value={key} />
          ))}
       </ExcelSheet>
      </ExcelFile>
      <Button onClick={props.handlePrint} style={{ padding: "2px 8px" }}>
        <PrintRoundedIcon fontSize="large" className={classes.Icons} />
      </Button>
    </div>
  );
}
