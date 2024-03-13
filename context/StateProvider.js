import React, { useState } from "react";
import { StateContext } from './StateContext';

export default function StateProvider  ({ children })  {
    const [totalPoints, setTotalPoints] = useState(0);

    const incrementPoints = (pointsToAdd) => {
      setTotalPoints(totalPoints + pointsToAdd);
    };

     const resetPoints = () => {
       setTotalPoints(0);
     };
  
    return (
      <StateContext.Provider value={{ totalPoints, incrementPoints ,resetPoints }}>
        {children}
      </StateContext.Provider>
    );
  };