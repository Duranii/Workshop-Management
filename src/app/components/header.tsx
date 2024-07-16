import React from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import filter from "../../../public/filter.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeaderProps {
  activeMenu: string;
}

const Header: React.FC<HeaderProps> = ({ activeMenu }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/");
    } catch (error) {
      toast.error("Logout unsuccessful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="adjust_header flex fixed justify-between p-4 px-10 bg-[#eeeeee] items-center">
        <div>
          <h1 className="text-[30px] font-[800]">
            {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
          </h1>
        </div>
        <div>
          <button className="rounded-xl border-[#FF5701]" onClick={handleLogout}>
            <div className="px-4 flex py-[10px] space-x-2 items-center border-[#FF5701] rounded-lg border-[1px]">
              <div>
                <Image src={filter.src} alt="filter" width={20} height={20} />
              </div>
              <div className="font-Rubik text-[15px] font-[400] text-[#FF5701]">
                Log out
              </div>
            </div>
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Header;