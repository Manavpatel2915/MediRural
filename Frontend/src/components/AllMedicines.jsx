import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    CircularProgress,
    Paper,
    Chip,
    Fade,
    Grow
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for enhanced UI
const StyledCard = styled(Card)(({ theme }) => ({
    height: '420px', // Fixed height for consistency
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    backgroundColor: '#ffffff',
    '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        height: '400px', // Fixed height on mobile
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: '200px', // Fixed height for consistent image display
    width: '100%',
    objectFit: 'cover',
    backgroundColor: '#f8f9fa',
    flexShrink: 0, // Prevent image from shrinking
    [theme.breakpoints.down('sm')]: {
        height: '180px', // Fixed height on mobile
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '6px',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    padding: '8px 12px',
    minHeight: '32px',
}));

const PriceChip = styled(Chip)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '0.875rem',
    backgroundColor: '#1976d2',
    color: 'white',
    borderRadius: '6px',
    height: '24px',
}));

const StockChip = styled(Chip)(({ theme }) => ({
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '4px',
    height: '20px',
}));

export default function AllMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/medicines/');
                if (response.data.success) {
                    setMedicines(response.data.medicines);
                } else {
                    setError('Error fetching medicines: ' + (response.data.message || 'Unknown error'));
                }
                setLoading(false);
            } catch (err) {
                setError('Error fetching medicines: ' + (err.response?.data?.message || err.message));
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/medicine/${id}`);
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

    return (
        <Box sx={{ 
            backgroundColor: '#fafbfc', 
            minHeight: '100vh', 
            py: { xs: 3, md: 4 }
        }}>
            <Container maxWidth="xl">
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 2, md: 4 }, 
                        mb: 4, 
                        borderRadius: '20px', 
                        backgroundColor: 'white',
                        textAlign: 'center',
                        border: '1px solid rgba(0, 0, 0, 0.08)'
                    }}
                >
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 700, 
                            color: '#1a365d',
                            mb: 2,
                            fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                    >
                        Medicine Catalog
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            maxWidth: '700px', 
                            mx: 'auto',
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        Browse our complete collection of high-quality medicines
                    </Typography>
                </Paper>
                
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {medicines.map((medicine, index) => (
                        <Grid item key={medicine._id} xs={12} sm={6} md={4} lg={3}>
                            <Grow in={true} timeout={300 + index * 50}>
                                <StyledCard onClick={() => handleViewDetails(medicine._id)}>
                                    <StyledCardMedia
                                        component="img"
                                        image={medicine.imageUrl}
                                        alt={medicine.name}
                                    />
                                    <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'flex-start',
                                            mb: 1.5
                                        }}>
                                            <Typography 
                                                variant="h6" 
                                                component="h2"
                                                sx={{ 
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    lineHeight: 1.2,
                                                    flex: 1,
                                                    mr: 1
                                                }}
                                            >
                                                {medicine.name}
                                            </Typography>
                                            <PriceChip label={`₹${medicine.price}`} />
                                        </Box>
                                        
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ 
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                height: '40px'
                                            }}
                                        >
                                            {medicine.description}
                                        </Typography>
                                        
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            gap: 1,
                                            mt: 'auto'
                                        }}>
                                            <StockChip 
                                                size="small" 
                                                label={medicine.stock > 10 ? 'In Stock' : medicine.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                                color={medicine.stock > 10 ? 'success' : medicine.stock > 0 ? 'warning' : 'error'}
                                            />
                                            <Typography 
                                                variant="caption" 
                                                color="text.secondary"
                                            >
                                                {medicine.stock} left
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    
                                    <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                                        <StyledButton 
                                            variant="contained" 
                                            color="primary"
                                            fullWidth
                                            onClick={() => handleViewDetails(medicine._id)}
                                        >
                                            View Details
                                        </StyledButton>
                                        <StyledButton 
                                            variant="outlined" 
                                            color="primary"
                                            fullWidth
                                        >
                                            Add to Cart
                                        </StyledButton>
                                    </CardActions>
                                </StyledCard>
                            </Grow>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}   