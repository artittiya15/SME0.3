import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import { Box, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";
import Logo from "./../../Assets/Images/Logo.png";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FA9917",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bg: {
    background: "#FA9917",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bg}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <ChevronLeftIcon />
          <Box className={classes.title}>
            <img
              src={Logo}
              alt=""
              width="103px"
              height="50px"
            />
          </Box>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="persistent"
        anchor="left"
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={() => {
              setDrawer(false);
            }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Typography>Revenue</Typography>
        <List>
          {[
            "all-revenue",
            "revenue-member",
            "revenue-walk-in",
            "transaction",
            "void",
          ].map((text, index) => (
            <ListItem button key={index}>
              <Link to={"/" + text}>{text}</Link>
              {/* <ListItemText primary={text} /> */}
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography>Ranking</Typography>
        <List>
          {[
            "TopBigSpender",
            "TopFrequentMembers",
            "TopPaymentMethods",
            "TopProductCategory",
            "TopProduct",
          ].map((text, index) => (
            <ListItem button key={index}>
              <Link to={"/" + text}>{text}</Link>
            </ListItem>
          ))}
        </List>
        <Typography>Customer</Typography>
        <List>
          {[
            "BigSpender",
            "Frequency",
            "Member",
            "MemberAndWalkIn",
            "WalkIn",
          ].map((text, index) => (
            <ListItem button key={index}>
              <Link to={"/" + text}>{text}</Link>
            </ListItem>
          ))}
        </List>
        <Typography>ProductAndCategory</Typography>
        <List>
          {["Categories", "Products"].map((text, index) => (
            <ListItem button key={index}>
              <Link to={"/" + text}>{text}</Link>
            </ListItem>
          ))}
        </List>
        <Typography>Loyalty</Typography>
        <List>
          {[
            "TotalPoints",
            "EarnPoints",
            "RedeemPoints",
            "RemainingPoints",
            "Tiers",
            
          ].map((text, index) => (
            <ListItem button key={index}>
              <Link to={"/" + text}>{text}</Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
