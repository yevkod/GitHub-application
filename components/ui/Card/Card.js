import React, {  useState } from 'react';
import compass from '../../../public/compass.png';
import Image from 'next/image';
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRouter } from "next/router";
import Modal from "../Modal/Modal";
import { IconButton } from "@mui/material";



const Card = ({ commits, userInfo }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { avatar_url, login, name, location } = userInfo;

    const handleViewRepositories = () => {
      router.push(`/${login}`);
    };
    const handleShowModal = () => {
        setIsModalOpen(true);
    };
    const handleHideModal = () => {
        setIsModalOpen(false);
    };

    return (
      <>
        <Modal
          hideModal={handleHideModal}
          isModalOpen={isModalOpen}
          location={location}
        />
        <div className="flex flex-col justify-between pt-[30px] pr-[25px] pb-[23px] pl-[30px] w-[320px] h-[251px] bg-[#FFFFFF] rounded-[10px] ">
          <div className="flex">
            <div className="w-[72px] h-[72px] bg-[#ECF2FF] flex items-center justify-center">
              <Image alt="avatar" src={avatar_url} width={62} height={62} />
            </div>
            <div className="flex-1 text-[#545454] ml-[11px] flex items-end font-normal text-[12px]">
              @{login}
            </div>
            <div>
              <IconButton onClick={handleShowModal}>
                <MyLocationIcon
                  sx={{ width: "32px", height: "32px" }}
                  className="cursor-pointer"
                />
              </IconButton>
            </div>
          </div>
          <div>
            <p className="text-[#121212] text-lg font-bold">{name}</p>
            <p className="text-[#545454] text-[16px] leading-6">
              {commits} commits
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleViewRepositories}
              className="uppercase border-[#4474FF] border-2 text-[#4474FF] py-[13px] px-[12px]"
            >
              view repositories
            </button>
          </div>
        </div>
      </>
    );
  };

  export default Card;