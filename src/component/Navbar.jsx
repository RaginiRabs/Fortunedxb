import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Container,
    Button,
    Slide,
    IconButton // Added for animation
} from '@mui/material';
import { Globe } from 'lucide-react';
import { ThemeToggleButton } from '../context/ThemeProvider'; // Correct import path
import Logo from "../assets/logo.PNG"; // Assuming this path is correct

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        // { label: 'Home', path: '/home' },
        { label: 'Projects', path: '/projects' },
        { label: 'Developers', path: '/developers' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Changed minHeight to 100vh */}
            <Slide direction="down" in={true} timeout={500}>
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        bgcolor: 'rgba(10, 22, 40, 0.8)', // Darker with opacity for blur
                        color: 'text.primary',
                        backdropFilter: 'blur(10px)', // Glass effect
                        borderBottom: '1px solid rgba(195, 159, 88, 0.15)',
                        zIndex: 1100, // Ensure it's above other content
                    }}
                >
                    <Container maxWidth="xl" disableGutters>
                        <Toolbar sx={{ py: { xs: 1, md: 1.5 }, justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                                <img
                                    src={Logo}
                                    alt="Fortune Logo"
                                    style={{ height: 36, cursor: 'pointer' }}
                                    onClick={() => navigate('/home')}
                                />
                            </Box>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, justifyContent: 'center', flex: 1 }}>
                                {navItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            textTransform: 'none',
                                            color: isActive(item.path) ? 'primary.main' : 'rgba(255, 255, 255, 0.85)',
                                            fontWeight: isActive(item.path) ? 600 : 400,
                                            fontSize: '0.95rem',
                                            px: 3,
                                            py: 1,
                                            position: 'relative',
                                            transition: 'all 0.3s ease',
                                            '&::after': isActive(item.path) ? {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '60%',
                                                height: 2,
                                                bgcolor: 'primary.main',
                                                borderRadius: 1
                                            } : {},
                                            '&:hover': {
                                                color: 'primary.main',
                                                bgcolor: 'rgba(195, 159, 88, 0.08)',
                                                transform: 'scale(1.05)' // Hover scale animation
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100, justifyContent: 'flex-end' }}>
                                <Button 
                                    variant="outlined"
                                    size="small"
                                    sx={{ 
                                        display: { xs: 'none', sm: 'block' },
                                        borderColor: 'primary.main', 
                                        color: 'primary.main', 
                                        px: 2, 
                                        py: 0.8, 
                                        mr: 1,
                                        '&:hover': { 
                                            bgcolor: 'rgba(195, 159, 88, 0.1)',
                                            transform: 'scale(1.05)'
                                        } 
                                    }}
                                >
                                    Enquire Now
                                </Button>
                                <IconButton 
                                    sx={{ 
                                        color: 'primary.main',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(195, 159, 88, 0.12)',
                                            transform: 'rotate(15deg)'
                                        }
                                    }}
                                >
                                    <Globe size={20} />
                                </IconButton>
                                {/* Theme Toggle Switch */}
                                <ThemeToggleButton />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Slide>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    // Removed Container around Outlet, as Home.jsx now handles its own containers for full-width sections
                }}
            >
                <Outlet />
            </Box>

            {/* Note: The Footer component defined in the Home.jsx file will render here via Outlet */}
        </Box>
    );
};

export default Navbar;