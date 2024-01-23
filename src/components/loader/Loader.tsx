import React from 'react';
import { BeatLoader, BounceLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <BeatLoader color="#b5bac1" size={15} />
    </div>
  );
};

export default Loader;