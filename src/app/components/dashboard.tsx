import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import BarChart from "./charts/barchart";
import PieChart from "./charts/piechart";

const DashboardContent: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const cardData = [
    {
      image: "/Image1-Dashboard.png",
      title: "Drivers on job",
      text: "7"
    },
    {
      image: "/Image2-Dashboard.png",
      title: "Active Orders",
      text: "8"
    },
    {
      image: "/Image3-Dashboard.png",
      title: "Completed Orders",
      text: "128"
    },
    {
      image: "/Image4-Dashboard.png",
      title: "Active Drivers",
      text: "12"
    },
    {
      image: "/Image5-Dashboard.png",
      title: "Available Drivers",
      text: "16"
    },
    {
      image: "/Image6-Dashboard.png",
      title: "Inactive Drivers",
      text: "4"
    }
  ];

  return (
    <div className="p-4 pt-10 max-w-[1400px] mx-auto">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-2xl hover:bg-gray-200 cursor-pointer transition-all h-[120px] w-full flex flex-col md:flex-row items-center justify-start p-4 px-6 shadow-lg rounded-lg">
            <Image
              src={card.image}
              alt={card.title}
              width={100}
              height={100}
              className="w-16 h-16 rounded-none object-cover"
            />
            <div className="ml-4">
              <h3 className="font-[400] text-[20px] leading-[24px] text-[#28252C]">{card.title}</h3>
              <p className="text-[#28252C] mt-2 font-inter font-[700] text-[28px] leading-[30px]">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 gap-5 flex w-[100%] items-center">
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardContent;
