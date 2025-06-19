import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Container,
    CircularProgress,
    Chip,
    IconButton,
    Divider,
    Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 1200,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    width: '100%',
    height: 400,
    objectFit: 'cover',
    borderRadius: '20px',
    backgroundColor: '#f8f9fa',
    [theme.breakpoints.up('md')]: {
        width: '45%',
        height: '400px',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    padding: {
        xs: '8px 16px',
        md: '12px 24px',
    },
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none',
    },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
    borderRadius: '8px',
    fontWeight: 500,
    fontSize: '0.875rem',
}));

export default function SingleMedicine() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/medicines/${id}`);
                setMedicine(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching medicine details: ' + err.message);
                setLoading(false);
            }
        };

        fetchMedicine();
    }, [id]);

    const handleBack = () => {
        navigate('/medicines');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress size={40} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error" variant="h6">{error}</Typography>
            </Box>
        );
    }

    if (!medicine) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant="h6">Medicine not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#fafbfc', minHeight: '90vh', py: { xs: 1, md: 3 } }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: { xs: 1, md: 2 }, display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                        onClick={handleBack}
                        sx={{ 
                            mr: 2,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: 'white',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h4" sx={{ fontWeight: 700, color: '#1a365d' }}>
                        Medicine Details
                    </Typography>
                </Box>

                <StyledCard>
                    <StyledCardMedia
                        component="img"
                        image={medicine.imageUrl}
                        alt={medicine.name}
                    />
                    <Box sx={{ flex: 1, p: { xs: 2, md:2 } }}>
                        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                                    {medicine.name}
                                </Typography>
                                <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                                    ₹{medicine.price}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                                    {medicine.description}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <InfoChip 
                                        label={medicine.stock > 10 ? 'In Stock' : medicine.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                        color={medicine.stock > 10 ? 'success' : medicine.stock > 0 ? 'warning' : 'error'}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {medicine.stock} units available
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc', borderRadius: '12px', flex: '1 1 100px' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Category
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {medicine.category}
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc', borderRadius: '12px', flex: '1 1 100px' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Manufacturer
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {medicine.manufacturer}
                                        </Typography>
                                    </Paper>
                                </Box>

                                {medicine.expiryDate && (
                                   <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8fafc', borderRadius: '12px', flex: '1 1 100px' }}>
                                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                       Expiry Date
                                   </Typography>
                                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                       {new Date(medicine.expiryDate).toLocaleDateString()}
                                   </Typography>
                               </Paper>
                                )}
                            </Box>

                            <Box sx={{ mt: 'auto', pt: 4, display: 'flex', gap: 2 }}>
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    disabled={medicine.stock === 0}
                                    
                                >
                                    Add to Cart
                                </StyledButton>
                                <StyledButton
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleBack}
                                >
                                    Back to Catalog
                                </StyledButton>
                            </Box>
                        </CardContent>
                    </Box>
                </StyledCard>
            </Container>
        </Box>
    );
}