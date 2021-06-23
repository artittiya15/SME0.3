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
import MockDataContact from "../../../MockData/ProductAndCategory/MockDataContact.json";
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
}));

export default function SearchCategories(props) {
  const classes = useStyles();
  const [Search, setSearch] = useState();
  const [selectedCategories, setSelectedCategories] = React.useState();

  useEffect(() => {
    async function fetchSearchCategories() {
      setSearch(MockDataContact.data);
    }
    fetchSearchCategories();
  }, []);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ButtonGroup aria-label="split button" className={classes.ButtonGroup}>
        <Button style={{ border: "none" }}>
          {selectedCategories && selectedCategories.CategoriesName}
        </Button>
        <Button
          style={{ border: "none" }}
          size="small"
          onClick={handleClickOpenDialog}
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
        <DialogTitle
          id="alert-dialog-title"
          style={{
            textAlign: "center",
            color: "#FA9917",
            fontFamily: "MyriadPro",
            fontSize: " 40px",
          }}
        >
          {"Select Category"}
        </DialogTitle>
        <DialogActions style={{ justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              paddingLeft: 10,
              alignItems: "center",
              width: "100%",
              marginLeft: 80,
              marginRight: 80,
              borderColor: "rgb(0 0 0 / 14%)",
              borderRadius: 20,
              borderStyle: "inset",
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              style={{ paddingLeft: 10, width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
            <Button
              style={{
                borderRadius: 0,
                backgroundColor: "orange",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                fontSize: 12,
              }}
            >
              Search
            </Button>
          </div>
        </DialogActions>
        <DialogContent style={{ width: 600, padding: 0 }}>
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
                      setSelectedCategories(item);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <img src={Botoxallergan} alt="avatar" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.CategoryName}
                      secondary={item.CategoryNumber}
                    />
                  </ListItem>
                );
              })}
            <Divider variant="inset" component="li" />
          </List>
        </DialogContent>

        <DialogActions style={{ justifyContent: "space-around", margin: 0 }}>
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
            onClick={handleCloseDialog}
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
