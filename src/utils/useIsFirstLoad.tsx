import React, { useState } from "react";

const useIsFirstLoad = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  return [isFirstLoad, setIsFirstLoad] as const;
};

export default useIsFirstLoad;
