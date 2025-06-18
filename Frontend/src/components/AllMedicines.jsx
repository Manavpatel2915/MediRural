import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions,
    Box,
    CircularProgress
} from '@mui/material';

export default function AllMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/medicines');
                setMedicines(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching medicines: ' + err.message);
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                All Medicines
            </Typography>
            <Grid container spacing={4}>
                {medicines.map((medicine) => (
                    <Grid item key={medicine._id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ height: '100%', width: 320, display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={medicine.imageUrl}
                                alt={medicine.name}
                                sx={{ objectFit: 'cover', minHeight: 200 }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {medicine.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {medicine.description}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                    ₹{medicine.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Stock: {medicine.stock}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Add to Cart
                                </Button>
                                <Button size="small" color="primary">
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}