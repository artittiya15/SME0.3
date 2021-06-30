import React, { useState, useEffect } from "react";
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
    textTransform: "none",
  },
  ButtonExit: {
    border: "none",
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: "white",
    color: "white",
  },
  MenuItem: {
    width: "120px",
  },
  ButtonFilter: {
    borderRadius: 50,
    textTransform: "none",
    color: "#FFFFFF",
    background: "#FA9917",
    marginRight: "20px",
  },
  GridContainer: {
    justifyContent: "space-around",
    padding: "10px",
  },
  ButtonNameCancle: { color: "#828282" },
  ButtonNameDone: { backgroundColor: "#FA9917", color: "white" },
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

export default function MemberFilter({ filterData }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dateSelected, setDateSelected] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleClickFilter = (filterName, selected = null) => {
    switch (filterName) {
      case "All":
        break;
      case "Standard":
        break;
      case "Bronze":
        break;
      case "Silver":
        break;
      case "Gold":
        break;
      case "Platinum":
        break;
      case "Custom Date":
        if (selected === false) {
          setOpenCalendar(true);
          return;
        } else if (selected === null) {
          setOpenCalendar(false);
        }
        break;
      default:
        break;
    }

    let nextValue = filter.map((item) => {
      if (item.filterName === filterName) item.selected = !item.selected;
      return item;
    });
    setFilter([...nextValue]);
  };

  const [filter, setFilter] = useState([]);
  useEffect(() => {
    setFilter(filterData);
  }, [filterData]);

  const formatDate = (date) => {
    let format = date.toDateString().split(" ");
    return `${format[2]} ${format[1]} ${format[3]}`;
  };

  return (
    <>
      {filter.map(({ filterName, selected }, index) => {
        return (
          selected && (
            <ButtonGroup
              aria-label="outlined primary button group"
              className={classes.ButtonGroup}
              key={index}
            >
              <Button className={classes.ButtonText}>
                {filterName === "Custom Date"
                  ? `${formatDate(dateSelected[0].startDate)} - ${formatDate(
                      dateSelected[0].endDate
                    )}`
                  : filterName}
              </Button>
              <Button
                className={classes.ButtonExit}
                onClick={() => {
                  handleClickFilter(filterName, selected);
                }}
              >
                x
              </Button>
            </ButtonGroup>
          )
        );
      })}
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        className={classes.ButtonFilter}
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
        {filter.map(({ filterName, selected }, index) => {
          return (
            <MenuItem key={index}>
              <ListItemText
                primary={filterName}
                onClick={() => {
                  handleClickFilter(filterName, selected);
                }}
              />
            </MenuItem>
          );
        })}
      </StyledMenu>
      <Dialog
        local="th"
        open={openCalendar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            setDateSelected([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateSelected}
          rangeColors={["#FA9917"]}
        />
        <Grid container className={classes.GridContainer}>
          <Button
            onClick={() => {
              setOpenCalendar(false);
            }}
            className={classes.ButtonNameCancle}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClickFilter("Custom Date");
            }}
           className={classes.ButtonNameDone}
          >
            Done
          </Button>
        </Grid>
      </Dialog>
    </>
  );
}
