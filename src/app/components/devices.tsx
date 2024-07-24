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

  const handleEdit = (customer) => {
    setEditingCustomer(customer.customer_id);
    setFormData({ name: customer.name, phonenumber: customer.phonenumber, email: customer.email });
  };

  const handleDelete = async (customer_id) => {
    try {
      await axios.delete(`http://localhost:3003/api/customers/${customer_id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.name}</td>
              <td>{customer.phonenumber}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => handleEdit(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.customer_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCustomer && (
        <div>
          <h3>Edit Customer</h3>
          <form onSubmit={handleUpdate}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Phone Number:
              <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <button type="button" onClick={handleUpdate}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DevicesContent;
