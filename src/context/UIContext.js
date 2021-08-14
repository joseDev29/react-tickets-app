import React, { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [menuHidden, setMenuHidden] = useState(true);

  const showMenu = () => {
    setMenuHidden(false);
  };

  const hideMenu = () => {
    setMenuHidden(true);
  };

  const store = {
    menuHidden,
    showMenu,
    hideMenu,
  };

  return <UIContext.Provider value={store}>{children}</UIContext.Provider>;
};
