import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import SearchFilterBar from './adminComponents/SearchFilterBar';
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
    height: '420px', 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    backgroundColor: '#f8f9fa',
    '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        height: '420px', // Fixed height on mobile
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: '200px', // Fixed height for consistent image display
    width: '100%',
    borderRadius : '12px',
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
    const [categories, setCategories] = useState(['All']);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const location = useLocation();
    const initialSearch = location.state?.search || '';
    const initialCategory = location.state?.category || 'All';
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/medicines/');
                if (response.data.success) {
                    const medicineData = response.data.medicines;
                    setMedicines(medicineData);
                    
                    // Extract unique categories
                    const uniqueCategories = ['All', ...new Set(medicineData.map(med => med.category))];
                    setCategories(uniqueCategories);
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

    const handleAddToCart = (medicine, event) => {
        event.stopPropagation();
        addToCart(medicine, 1);
    };

    const filteredMedicines = medicines.filter(medicine => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
        }}>
            <Container maxWidth="xl" sx={{
                padding : {
                    xs : 0,
                    sm : 2
                }
            }}>
                

                <SearchFilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    searchPlaceholder="Search medicines by name or description..."
                />
                
                <Grid container spacing={{ xs: 1, md: 3 }} sx={{
                    display : 'flex',
                    justifyContent : 'center'
                }}>
                    {filteredMedicines.map((medicine, index) => (
                        <Grid item key={medicine._id} xs={10} sm={6} md={4} lg={3} sx={{display : 'flex' , justifyContent : 'space-between'}}>
                            <Grow in={true} timeout={300 + index * 50}>
                                <StyledCard onClick={() => handleViewDetails(medicine._id)}>
                                    <StyledCardMedia
                                        component="img"
                                        image={medicine.imageUrl}
                                        alt={medicine.name}
                                    />
                                    <CardContent >
                                        <Box sx={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            
                                        }}>
                                            <Typography
                                                variant="h6"
                                                component="h2"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    lineHeight: 1.1,
                                                    mr: { sm: 1 },
                                                    mb: { xs: 1, sm: 0 },
                                                    wordBreak: 'break-word',
                                                    whiteSpace: 'normal',
                                                }}
                                            >
                                                {medicine.name}
                                            </Typography>
                                            <PriceChip
                                                label={`₹${medicine.price}`}
                                            />
                                        </Box>
                                        
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ 
                                                mb: 1,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                height: '40px',
                                                
                                            }}
                                        >
                                            {medicine.description}
                                        </Typography>
                                        
                                        <Box sx={{ 
                                            display : 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            

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
                                    
                                    <CardActions 
                                        sx={{ 
                                            px: 2, py: 0, 
                                            display: 'flex',
                                            alignItems : 'end',
                                            flexDirection: { xs: 'column', sm: 'row' }, 
                                            gap: { xs: 1, sm: 0 } 
                                        }}
                                    >
                                        <StyledButton 
                                            variant="outlined" 
                                            color="primary"
                                            fullWidth
                                            onClick={(e) => handleAddToCart(medicine, e)}
                                        >
                                            Add to Cart
                                        </StyledButton>
                                        <StyledButton 
                                            variant="contained" 
                                            color="primary"
                                            fullWidth
                                            onClick={() => handleViewDetails(medicine._id)}
                                        >
                                            View Details
                                        </StyledButton>
                                    </CardActions>
                                </StyledCard>
                            </Grow>
                        </Grid>
                    ))}
                    {filteredMedicines.length === 0 && (
                        <Grid item xs={12}>
                            <Box 
                                sx={{ 
                                    textAlign: 'center', 
                                    py: 8,
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0, 0, 0, 0.08)'
                                }}
                            >
                                <Typography variant="h6" color="text.secondary">
                                    No medicines found matching your search criteria
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}   