import React, { createContext, useContext, useEffect, useRef,useCallback } from "react";
import { useLocation } from "react-router-dom";

export const LocationContext = createContext(null);

// 监听路由的变化
export function LocationWatcher({ children }) {
  const location = useLocation();
  const locationState = useRef({
    from: {},
    to: {},
  });

  useEffect(() => {
    locationState.current.from = locationState.current.to;
    locationState.current.to = location;
  }, [location]);


  return (
    <LocationContext.Provider value={locationState}>
      { children }
    </LocationContext.Provider>
  );
}

export function useLocationWatcher() {
  const ref = useContext(LocationContext);
  return ref.current;
}
