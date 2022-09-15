import React, { useState } from "react";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggleDrawer] as const;
};

export default useDrawer;
