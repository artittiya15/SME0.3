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
  const { list, summarytier } = props.dataExportExcel;
  const [mappingList, setMappingList] = React.useState();
  React.useEffect(() => {
    const mapping = [...list, summarytier[0]].map((data) => {
      const entry = Object.entries(data);
      const newEntry = [].concat(
        ...entry.map((item) => {
          if (item[0].includes(" and ")) {
            const [newKey1, newKey2] = item[0].split(" and ");
            const [newVal1, newVal2] = item[1].split("<br>");
            return [
              [newKey1, newVal1 || ""],
              [newKey2, newVal2 || ""],
            ];
          }
          return [item];
        })
      );
      return Object.fromEntries(newEntry);
    });
    setMappingList(mapping);
  }, [list, summarytier, props.list,]);
  
  return (
    <div className={classes.root}>
      <ExcelFile
        filename={"page"}
        element={<SaveAltIcon fontSize="large" className={classes.Icons} />}
      >
        
        {mappingList && (
          <ExcelSheet data={mappingList} name={props.pageName}>
            {Object.entries(mappingList[0]).map(([key, val], index) => (
              
              <ExcelColumn key={index} label={key} value={key} />
            ))}
          </ExcelSheet>
        )}
      </ExcelFile>
    
      <Button onClick={props.handlePrint} style={{ padding: "2px 8px" }}>
        <PrintRoundedIcon fontSize="large" className={classes.Icons} />
      </Button>
    </div>
  );
}
