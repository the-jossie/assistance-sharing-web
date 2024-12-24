/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from "react";
import { motion } from "framer-motion";

interface PropTypes {
  children?: ReactElement;
  handleClose: () => void;
}

const Modal = ({ children, handleClose = () => {} }: PropTypes) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-40 w-full h-full flex justify-center items-center inset-0 backdrop-blur-md backdrop-brightness-50"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropIn}
        className="rounded-[30px] z-50 w-full mx-auto"
      >
        <div className="bg-white w-[90%] md:w-3/5 mx-auto p-3 max-h-[800px] overflow-y-auto border rounded-md">
          <div className="flex items-center justify-end">
            <button onClick={() => handleClose()}>
              <img src="/close.svg" alt="close" />
            </button>
          </div>
          {children && children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Modal };

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
