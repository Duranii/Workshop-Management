const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'WorkshopManagement',
    port: 8889
  });

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Fetch customers
app.get('/api/customers', (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update customer
app.put('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const { name, phonenumber, email } = req.body;
  const sql = 'UPDATE customer SET name = ?, phonenumber = ?, email = ? WHERE customer_id = ?';
  db.query(sql, [name, phonenumber, email, id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Customer updated' });
  });
});

// Delete customer
app.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM customer WHERE customer_id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Customer deleted' });
  });
});

// Fetch customers with their work orders
app.get('/api/customers-with-workorders', (req, res) => {
    const sql = `
      SELECT 
        c.customer_id, c.name, c.phonenumber, c.email, 
        w.work_order_code, w.advisory_note, w.work_order_time
      FROM customer c
      INNER JOIN work_order w ON c.customer_id = w.customer_id
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching customers with work orders:', err);
        res.status(500).send('Error fetching customers with work orders');
        return;
      }
      res.json(results);
    });
  });
  

  // Add customer
app.post('/api/customers', (req, res) => {
    const { firstName, lastName, phoneNo, address, state, country } = req.body;
    const sql = `
      INSERT INTO customer (name, phonenumber, email) 
      VALUES (?, ?, ?)
    `;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`; // Generate email for simplicity
  
    db.query(sql, [`${firstName} ${lastName}`, phoneNo, email], (err, results) => {
      if (err) {
        console.error('Error adding customer:', err);
        res.status(500).send('Error adding customer');
        return;
      }
      res.status(201).send('Customer added');
    });
  });

  app.post('/api/vehicles', (req, res) => {
    const { registrationNo, year, make, model, fuel, mileage, customerId } = req.body;
    const sql = `
      INSERT INTO vehicle (registration_number, year, make, model, fuel, mileage, customer_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [registrationNo, year, make, model, fuel, mileage, customerId], (err, results) => {
      if (err) {
        console.error('Error inserting data', err);
        return res.status(500).json({ error: 'Failed to add vehicle' });
      }
      res.status(201).json({ message: 'Vehicle added successfully' });
    });
  });

app.post('/api/workorders', (req, res) => {
  const { vehicleId, advisoryNote, workOrderTime, customerId } = req.body;
  const sql = `
    INSERT INTO work_order (vehicle_id, advisory_note, work_order_time, customer_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [vehicleId, advisoryNote, workOrderTime, customerId], (err, results) => {
    if (err) {
      console.error('Error inserting work order:', err);
      return res.status(500).json({ error: 'Failed to add work order' });
    }
    res.status(201).json({ message: 'Work order added successfully' });
  });
});

  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
