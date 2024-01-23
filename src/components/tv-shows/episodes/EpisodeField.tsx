
import { MouseEventHandler } from "react";
import IEpisode from "../../../entities/episode";

interface IEpisodeFieldProps{
  episode: IEpisode | undefined;
  open: MouseEventHandler<HTMLDivElement>;
}

function EpisodeField(props: IEpisodeFieldProps) {

    return (  
      <div className="episode" onClick={props.open}>
        <div className="episode-content">
        №{props.episode?.number} {props.episode?.title}
        </div>
        
      </div>
    );
  }
  
  export default EpisodeField;