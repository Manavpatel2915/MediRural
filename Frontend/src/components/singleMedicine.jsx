import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SingleMedicine(props) {
    const { medicine } = props;
    return (
        <Container maxWidth="md" sx={{ py: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 700,
                    boxShadow: 6,
                    borderRadius: 4,
                    p: 2,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: { xs: '100%', md: 320 },
                        height: 320,
                        objectFit: 'cover',
                        borderRadius: 3,
                        m: 2
                    }}
                    image={medicine.image || medicine.imageUrl}
                    alt={medicine.name}
                />
                <CardContent sx={{ flex: 1, p: 3 }}>
                    <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 700 }}>
                        {medicine.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        {medicine.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                        ₹{medicine.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        Stock: {medicine.stock || medicine.quantity}
                    </Typography>
                    {medicine.category && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            Category: {medicine.category}
                        </Typography>
                    )}
                    {medicine.brand && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            Brand: {medicine.brand}
                        </Typography>
                    )}
                    {medicine.manufacturer && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            Manufacturer: {medicine.manufacturer}
                        </Typography>
                    )}
                    {medicine.expiryDate && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            Expiry: {medicine.expiryDate}
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="success" size="large">
                            Add to Cart
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}