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
    CircularProgress,
    Paper,
    Chip,
    Fade
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
                <CircularProgress size={40} />
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
            py: { xs: 2, md: 3 }
        }}>
            <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 1.5, sm: 2, md: 3 }, 
                        mb: { xs: 2, md: 3 }, 
                        mx: { xs: 0.5, sm: 0 },
                        borderRadius: '12px', 
                        backgroundColor: 'white',
                        textAlign: 'center',
                        border: '1px solid rgba(0, 0, 0, 0.06)'
                    }}
                >
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 600, 
                            color: '#1a202c',
                            mb: 0.5,
                            fontSize: { xs: '1.75rem', md: '2.125rem' }
                        }}
                    >
                        Medicine Catalog
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ maxWidth: '500px', mx: 'auto' }}
                    >
                        Browse our complete collection of quality medicines
                    </Typography>
                </Paper>
                
                <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
                    {medicines.map((medicine, index) => (
                        <Grid item key={medicine._id} xs={12} sm={6} md={4} lg={3}>
                            <Fade in={true} timeout={300 + index * 50}>
                                <StyledCard>
                                    <StyledCardMedia
                                        component="img"
                                        image={medicine.imageUrl}
                                        alt={medicine.name}
                                    />
                                    
                                    <CardContent sx={{ 
                                        p: { xs: 1, sm: 1.5 }, 
                                        pb: { xs: 0.5, sm: 1 },
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: 0 // Allow content to shrink
                                    }}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'flex-start',
                                            mb: 1
                                        }}>
                                            <Typography 
                                                variant="h6" 
                                                component="h3"
                                                sx={{ 
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    lineHeight: 1.3,
                                                    color: '#1a202c',
                                                    flex: 1,
                                                    mr: 1,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textAlign: 'left'
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
                                                mb: 1,
                                                fontSize: '0.875rem',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textAlign: 'left',
                                                minHeight: '2.5rem' // Fixed height for description
                                            }}
                                        >
                                            {medicine.description}
                                        </Typography>
                                        
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            gap: 1,
                                            mt: 'auto' // Push to bottom of content area
                                        }}>
                                            <StockChip 
                                                size="small" 
                                                label={medicine.stock > 10 ? 'In Stock' : medicine.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                                color={medicine.stock > 10 ? 'success' : medicine.stock > 0 ? 'warning' : 'error'}
                                            />
                                            <Typography 
                                                variant="caption" 
                                                color="text.secondary"
                                                sx={{ fontSize: '0.75rem' }}
                                            >
                                                {medicine.stock} available
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    
                                    <CardActions sx={{ 
                                        p: { xs: 1, sm: 1.5 }, 
                                        pt: 0,
                                        gap: { xs: 0.5, sm: 1 },
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        flexShrink: 0 // Prevent buttons from shrinking
                                    }}>
                                        <StyledButton 
                                            variant="contained" 
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            disableElevation
                                            sx={{ 
                                                minHeight: { xs: '36px', sm: '32px' },
                                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                            }}
                                        >
                                            Add to Cart
                                        </StyledButton>
                                        <StyledButton 
                                            variant="outlined" 
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            sx={{ 
                                                minHeight: { xs: '36px', sm: '32px' },
                                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                            }}
                                        >
                                            View Details
                                        </StyledButton>
                                    </CardActions>
                                </StyledCard>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}   