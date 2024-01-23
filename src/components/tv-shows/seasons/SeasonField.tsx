import { MouseEventHandler } from "react";
import ISeason from "../../../entities/season";
import "../seasons/Seasons.css"

interface SeasonProps{
    season: ISeason;
    open: MouseEventHandler<HTMLDivElement>;
}

function SeasonField(props: SeasonProps) {
  
    return (
      <div onClick={props.open} className="season">
        <div className="season-content">
            №{props.season.number} {props.season.title}
        </div>
      </div>
    );
  }
  
  export default SeasonField;