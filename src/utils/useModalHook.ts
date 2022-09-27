import React, { useState } from "react";

const useModalHook = () => {
  const [isModalOpen, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return { isModalOpen, handleOpenModal, handleCloseModal } as const;
};

export default useModalHook;
