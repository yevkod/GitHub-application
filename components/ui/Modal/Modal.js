import { IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Map from "../Map/Map";


const Modal = ({ isModalOpen, hideModal, location }) => {


    return (
      <>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute bg-black bg-opacity-50 inset-0 z-10"
              onClick={hideModal}
            ></div>
            <div className="absolute bg-white  w-2/3 h-2/3 z-20">
              <div className=" p-4 flex items-center justify-between">
                <h2 className="text-2xl h-[100%] ">Map:</h2>
                <IconButton onClick={hideModal}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="w-full h-full ">
                <Map location={location} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  export default Modal;
