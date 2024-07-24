import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import axios from 'axios';
import BarChart from "./charts/barchart";
import PieChart from "./charts/piechart";

const DashboardContent: React.FC = () => {
  const [customersCount, setCustomersCount] = useState(0);
  const [workOrdersCount, setWorkOrdersCount] = useState(0);

  useEffect(() => {
    const fetchCustomersAndWorkOrders = async () => {
      try {
        const [customersResponse, workOrdersResponse] = await Promise.all([
          axios.get('http://localhost:3003/api/customers'),
          axios.get('http://localhost:3003/api/customers-with-workorders')
        ]);

        setCustomersCount(customersResponse.data.length);
        setWorkOrdersCount(workOrdersResponse.data.length);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchCustomersAndWorkOrders();
  }, []);

  const cardData = [
    {
      image: "/Image5-Dashboard.png",
      title: "Customers",
      text: customersCount,
    },
    {
      image: "/Image2-Dashboard.png",
      title: "Work Orders",
      text: workOrdersCount,
    },
    {
      image: "/Image3-Dashboard.png",
      title: "Completed Orders",
      text: "128",
    },
    {
      image: "/Image1-Dashboard.png",
      title: "Vehicle",
      text: "4",
    },
  ];

  return (
    <div className="p-4 pt-10 max-w-[1400px] mx-auto">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-2xl hover:bg-gray-200 cursor-pointer transition-all h-[120px] w-full flex flex-col md:flex-row items-center justify-start p-4 px-6 shadow-lg rounded-lg"
          >
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

export async function getServerSideProps(context : any) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        context.res.writeHead(302, { Location: "/" });
        context.res.end();
      } else {
        resolve({ props: {} });
      }
    });
  });
}

export default DashboardContent;
