"use client";
import React, { useState } from "react";
import AuthModal from "../../components/AuthModal";
import { Button } from "@/components/ui/button";

const MainComponent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={handleOpenAuthModal}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
      >
        Đăng nhập / Đăng ký
      </Button>

      {showAuthModal && <AuthModal onClose={handleCloseAuthModal} />}
    </div>
  );
};

export default MainComponent;
