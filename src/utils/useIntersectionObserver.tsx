import React, { useState } from "react";

const useIntersectionObserver = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const [page, setPage] = useState(1);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsTriggered(entry.isIntersecting);
        setPage((prevPage) => prevPage + 1);
      }
    },
    { threshold: 0.5, rootMargin: "-50px" }
  );

  return [isTriggered, page, observer] as const;
};

export default useIntersectionObserver;
