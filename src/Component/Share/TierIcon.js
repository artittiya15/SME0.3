import React from "react";
import { ReactComponent as Gold } from "../../Assets/Images/Icons/gold.svg";
import { ReactComponent as Platinum } from "../../Assets/Images/Icons/platinum.svg";
import { ReactComponent as Silver } from "../../Assets/Images/Icons/silver.svg";
import { ReactComponent as Bronze } from "../../Assets/Images/Icons/bronze.svg";
import { ReactComponent as Standard } from"../../Assets/Images/Icons/standard.svg";
export default function TierIcon(props) {
  return (
    <>
      {props.level === "platinum" ? (
        <Platinum width={props.width} height={props.height} />
      ) : props.level === "gold" ? (
        <Gold width={props.width} height={props.height} />
      ) : props.level === "silver" ? (
        <Silver width={props.width} height={props.height} />
      ) : props.level === "bronze" ? (
        <Bronze width={props.width} height={props.height} />
      ) : props.level === "standard" ? (
        <Standard width={props.width} height={props.height} />
      ) :(
        <> </>
      )}
    </>
  );
}
