"use client";
import React, { useState } from "react"
import Modal from "./modal";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }

export default function AlertModal(params: AlertModalProps ){
    function handleClose(){
        params.onClose();
    }
    if(!params.isOpen)
        return null;
    return (
        <Modal isOpen={params.isOpen} onClose={handleClose}>{params.children}</Modal>
    )
}