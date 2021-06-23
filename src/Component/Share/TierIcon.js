import React from "react";
import { ReactComponent as Gold } from "../../Assets/Images/Icons/gold.svg";
import { ReactComponent as Platinum } from "../../Assets/Images/Icons/platinum.svg";
import { ReactComponent as Silver } from "../../Assets/Images/Icons/silver.svg";
export default function TierIcon(props) {
  return (
    <>
      {props.level === "platinum" ? (
        <Platinum />
      ) : props.level === "gold" ? (
        <Gold />
      ) : props.level === "silver" ? (
        <Silver />
      ) : (
        <> </>
      )}
    </>
  );
}
