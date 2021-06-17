import React, { useState } from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { DateRange } from "react-date-range";
import Dialog from "@material-ui/core/Dialog";
import { Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  FilterListIcon: {
    color: "#FFFFFF",
  },
  root: {
    textAlign: "right",
    paddingRight: theme.spacing(3),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  ButtonGroup: {
    borderRadius: 50,
    textTransform: "none",
    color: "#FFFFFF",
    background: "#FA9917",
    marginRight: theme.spacing(2),
  },
  ButtonText: {
    border: "none",
    color: "white",
  },
  ButtonExit: {
    border: "none",
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: "white",
    color: "white",
  },
  MenuItem:{
    width: "120px" 
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function FilterList() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
    
      <ButtonGroup
        open={openFilter}
        aria-label="outlined primary button group"
        className={classes.ButtonGroup}
        onClose={handleCloseFilter} 
      >
        <Button className={classes.ButtonText}>Member</Button>
        <Button  className={classes.ButtonExit}>
          x
        </Button>
      </ButtonGroup>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{
          borderRadius: 50,
          textTransform: "none",
          color: "#FFFFFF",
          background: "#FA9917",
        }}
      >
        <FilterListIcon className={classes.FilterListIcon}></FilterListIcon>
        Filter
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary="All" />
        </MenuItem>
        <MenuItem>
          <ListItemText onClick={handleOpenFilter} primary="Only Member" />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Only Walk-In" />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={handleClickOpen}>
          <ListItemText primary=" Custom Date" />
        </MenuItem>
      </StyledMenu>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          rangeColors={["#FA9917"]}
        />
        <Grid
          container
          style={{ justifyContent: "space-around", padding: "10px" }}
        >
          <Button style={{ color: "#828282" }}>Cancel</Button>
          <Button style={{ backgroundColor: "#FA9917", color: "white" }}>
            Done
          </Button>
        </Grid>
      </Dialog>
    </>
  );
}
