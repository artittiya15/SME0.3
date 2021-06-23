import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, fade } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { ReactComponent as Botoxallergan } from "../../../Assets/Images/Icons/Botoxallergan.svg";
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
}));

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];
export default function SearchProduct(props) {
  const classes = useStyles();
  const [Search, setSearch] = useState();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  useEffect(() => {
    async function fetchSearchProduct() {
      setSearch(MockDataDialog.data);
    }
    fetchSearchProduct();
  }, []);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ButtonGroup
        ref={anchorRef}
        aria-label="split button"
        className={classes.ButtonGroup}
      >
        <Button style={{ border: "none" }} onClick={handleClick}>
          {options[selectedIndex]}
        </Button>
        <Button
          style={{ border: "none" }}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleClickOpenDialog(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

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
          {"Select Product"}
        </DialogTitle>
        <DialogActions
          // className={classes.searchIcon}
          style={{ justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              paddingLeft: 10,
              alignItems: "center",
              width: "100%",
              marginLeft: 80,
              marginRight: 80,
              borderColor: "black",
              borderRadius: 20,
              borderStyle: "inset",
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              style={{ paddingLeft: 10, width: "100%"}}
              // classes={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
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
        <DialogContent
          style={{ width: 600, padding: 0 }}
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
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <Botoxallergan />
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
