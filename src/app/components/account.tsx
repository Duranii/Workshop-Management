import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountContent: React.FC = () => {
  const [customersWithWorkOrders, setCustomersWithWorkOrders] = useState([]);

  useEffect(() => {
    fetchCustomersWithWorkOrders();
  }, []);

  const fetchCustomersWithWorkOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/customers-with-workorders');
      setCustomersWithWorkOrders(response.data);
    } catch (error) {
      console.error('Error fetching customers with work orders', error);
    }
  };

  return (
    <div>
      <h2>Account</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Work Order Code</th>
            <th>Advisory Note</th>
            <th>Work Order Time</th>
          </tr>
        </thead>
        <tbody>
          {customersWithWorkOrders.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.phonenumber}</td>
              <td>{row.email}</td>
              <td>{row.work_order_code}</td>
              <td>{row.advisory_note}</td>
              <td>{row.work_order_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountContent;
