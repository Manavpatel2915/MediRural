import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function UpdateMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    manufacturer: '',
    expiryDate: '',
    imageUrl: '',
    prescriptionRequired: false,
    isActive: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`https://medirural.onrender.com/api/medicines/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          const med = response.data.medicine;
          setFormData({
            name: med.name,
            description: med.description,
            price: med.price,
            stock: med.stock,
            category: med.category,
            manufacturer: med.manufacturer,
            expiryDate: med.expiryDate.slice(0, 10), // for input type="date"
            imageUrl: med.imageUrl,
            prescriptionRequired: med.prescriptionRequired || false,
            isActive: med.isActive ?? true
          });
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load medicine details');
      }
    };

    fetchMedicine();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updated = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      const res = await axios.put(
        `https://medirural.onrender.com/api/medicines/${id}`,
        { medicine: updated },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        alert('Medicine updated successfully!');
        navigate('/admin/medicines'); // change as per your admin routes
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Medicine
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth multiline rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required fullWidth label="Price"
              name="price" type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required fullWidth label="Stock"
              name="stock" type="number"
              value={formData.stock}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Expiry Date"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? 'Saving...' : 'Update Medicine'}
        </Button>
      </Box>
    </Container>
  );
}
