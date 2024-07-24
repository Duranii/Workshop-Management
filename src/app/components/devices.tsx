import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DevicesContent: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', phonenumber: '', email: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer.customer_id);
    setFormData({ name: customer.name, phonenumber: customer.phonenumber, email: customer.email });
  };

  const handleDelete = async (customer_id: any) => {
    try {
      await axios.delete(`http://localhost:3003/api/customers/${customer_id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3003/api/customers/${editingCustomer}`, formData);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between border-b-2 border-gray-300 pb-2 font-bold">
        <p className="w-1/5">Name</p>
        <p className="w-1/5">Phone Number</p>
        <p className="w-1/5">Email</p>
        <p className="w-1/5 pl-28">Actions</p>
      </div>
      {customers.map((customer: any) => (
        <div className="flex justify-between border-b border-gray-200 py-2" key={customer.customer_id}>
          <p className="w-1/5">{customer.name}</p>
          <p className="w-1/5">{customer.phonenumber}</p>
          <p className="w-1/5">{customer.email}</p>
          <div className="w-1/5 flex justify-end">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleEdit(customer)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(customer.customer_id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingCustomer && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-lg font-bold mb-2">Edit Customer</h3>
          <form onSubmit={handleUpdate}>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Phone Number:
              <input
                type="text"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </label>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DevicesContent;
