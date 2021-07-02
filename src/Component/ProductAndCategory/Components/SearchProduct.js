import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, fade } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Botoxallergan from "../../../Assets/Images/Icons/Botoxallergan.png";
import MockDataDialog from "../../../MockData/ProductAndCategory/MockDataDialog.json";
const useStyles = makeStyles((theme) => ({
  root: { width: "100%", backgroundColor: theme.palette.background.paper },
  ButtonGroup: {
    border: "1px solid #EBEBEB",
    textTransform: "none",
    color: "#FFFFFF",
    background: "white",
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "700px",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   // width: "auto",
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  ButtonByButtonGroup: {
    border: "none",
    textTransform: "none",
    color: "#828282"
  },
  SearchOnIcon: {
    display: "flex",
    paddingLeft: 10,
    alignItems: "center",
    width: "100%",
    marginLeft: 80,
    marginRight: 80,
    borderColor: "rgb(63 81 181 / 4%)",
    borderRadius: 20,
    borderStyle: "inset",
    color: "#787885",
    background: "#EDEDF0",
  },
  DialogTitle: {
    textAlign: "center",
    color: "#FA9917",
    fontFamily: "MyriadPro",
    fontSize: " 40px",
  },
  InputBase: {
    paddingLeft: 10,
    width: "100%",
  },
  DialogActionsSearchIcon: {
    justifyContent: "center",
  },
  ButtonSearch: {
    borderRadius: 0,
    backgroundColor: "orange",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    fontSize: 12,
  },
  DialogContent: {
    width: 600,
    padding: 0,
  },
  SearchByList: { cursor: "pointer" },
  DialogActions: {
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
}));

export default function SearchProduct(props) {
  const classes = useStyles();
  const [Search, setSearch] = useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState({
    image: "",
    productName: "default top1 product name",
    productNumber: ""
  });

  useEffect(() => {
    async function fetchSearchProduct() {
      setSearch(MockDataDialog.data);
    }
    fetchSearchProduct();
  }, []);

 

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [confirm,setConfirm]= React.useState(selectedProduct)
  return (
    <>
      <ButtonGroup aria-label="split button" className={classes.ButtonGroup} onClick={handleClickOpenDialog}>
        <Button className={classes.ButtonByButtonGroup}>
          {confirm && confirm.productName}
        </Button>
        
        <Button
          className={classes.ButtonByButtonGroup}
          size="small"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.DialogTitle}>
          {"Select Product"}
        </DialogTitle>
        <DialogActions
          // className={classes.searchIcon}
          className={classes.DialogActionsSearchIcon}
        >
          <div className={classes.SearchOnIcon}>
            <SearchIcon />
            <InputBase
              placeholder="SearchProduct"
              className={classes.InputBase}
              inputProps={{ "aria-label": "search" }}
            />
            <Button className={classes.ButtonSearch}>Search</Button>
          </div>
        </DialogActions>
        <DialogContent
          className={classes.DialogContent}
          // className={classes.search}
        >
          <List
            component="nav"
            className={classes.root}
            aria-label="mailbox folders"
          >
            {Search &&
              Search.list.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setSelectedProduct(item);
                    }}
                    className={classes.SearchByList}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <img src={Botoxallergan} alt="avatar" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.productName}
                      secondary={item.productNumber}
                    />
                  </ListItem>
                );
              })}
            <Divider variant="inset" component="li" />
          </List>
        </DialogContent>

        <DialogActions className={classes.DialogActions}>
          <Button
            onClick={handleCloseDialog}
            style={{
              borderRadius: 0,
              backgroundColor: "#C4C4C4",
              width: "-webkit-fill-available",
              margin: 0,
              color: "#eff2f7",
            }}
          >
            Cancel
          </Button>
          <Button
             onClick={() => {
              setConfirm(selectedProduct);
              setOpenDialog(false);
            }} //
            style={{
              borderRadius: 0,
              backgroundColor: "#FA9917",
              width: "-webkit-fill-available",
              color: "#eff2f7",
              margin: 0,
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
