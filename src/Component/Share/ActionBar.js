import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { Button } from "@material-ui/core";
import { CSVLink } from "react-csv";
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
  const dataExport = [];
  const classes = useStyles();
  const { list, summary, summarytier } = props.dataExportCSV;
  Object.entries(summary).forEach((item) => {
    dataExport.push(item);
  });
  let header = []
  Object.entries(list[0]).forEach(([key, _]) => {
    header.push(key);
  });
  dataExport.push(header);
  list.forEach((row) => {
    let record = [];
    Object.entries(row).forEach(([_, val]) => {
      record.push(val);
    });
    dataExport.push(record);
  });
  let footer = []
  Object.entries(summarytier[0]).forEach(([_, val]) => {
    footer.push(val);
  });
  dataExport.push(footer);

  return (
    <div className={classes.root}>
      <CSVLink data={dataExport}>
        <SaveAltIcon fontSize="large" className={classes.Icons} />
      </CSVLink>
      <Button onClick={props.handlePrint} style={{ padding: "2px 8px" }}>
        <PrintRoundedIcon fontSize="large" className={classes.Icons} />
      </Button>
    </div>
  );
}
