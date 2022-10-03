import React, { useState } from "react";

const useIntersectionObserver = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const [page, setPage] = useState(1);

  const resetPage = () => {
    setPage(1);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // console.log("true");
        setIsTriggered(entry.isIntersecting);
        setPage((prevPage) => prevPage + 1);
      }
    },
    { threshold: 0.2, rootMargin: "-10px" }
  );

  return { isTriggered, page, resetPage, observer } as const;
};

export default useIntersectionObserver;
