import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import PropertyCard from '../../component/Propertycard';
import properties from '../../Data/properties';

const AllProject = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                // bgcolor: '#0F1C2E',
                py: 6
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ textAlign: 'center', mb: 6, mt: 2 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: '#000',
                            fontWeight: 400,
                            mb: 1.5,
                            letterSpacing: 1.5,
                            fontSize: '2.2rem'
                        }}
                    >
                        Explore Our Projects
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'rgba(83, 74, 74, 0.55)',
                            fontSize: '0.95rem',
                            fontWeight: 300,
                            maxWidth: 550,
                            mx: 'auto',
                            lineHeight: 1.6,
                            letterSpacing: 0.3
                        }}
                    >
                        Discover premium residential and commercial properties across Dubai's most prestigious locations
                    </Typography>
                </Box>

                <Grid container spacing={3} justifyContent="center">
                    {properties?.map((property) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={property?.id}>
                            <PropertyCard property={property} />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.45)',
                            fontSize: '0.85rem',
                            letterSpacing: 0.5,
                            cursor: 'pointer',
                            display: 'inline-block',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: '#C39F58',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Showing {properties.length} projects · Load More
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AllProject;