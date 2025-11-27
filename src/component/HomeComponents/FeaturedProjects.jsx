import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Gem,
  Sparkles,
  Flame,
  Rocket,
  Timer,
  Grid3X3,
  List as ListIcon,
  ArrowRight,
} from 'lucide-react';
import ProjectCard from './ProjectCard';

const FeaturedProjects = ({
  activeTab,
  handleTabChange,
  viewMode,
  setViewMode,
  filteredProjects,
  savedProperties,
  handleSaveProperty,
  handleInquiry,
}) => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<Gem size={16} />}
            label="Premium Selection"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
            Featured Off-Plan Projects
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Handpicked luxury developments from Dubai's most prestigious developers,
            offering exceptional investment opportunities.
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: '50px',
              p: 0.5,
              bgcolor: 'rgba(0,0,0,0.04)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  borderRadius: '50px',
                  px: 3,
                  py: 1.5,
                  minHeight: 'auto',
                  fontWeight: 600,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'white',
                    bgcolor: 'primary.main',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sparkles size={18} />
                    All Projects
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Flame size={18} />
                    Hot Selling
                    <Chip label="12" size="small" sx={{ bgcolor: '#EF4444', color: 'white', height: 20 }} />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rocket size={18} />
                    New Launch
                    <Chip label="8" size="small" sx={{ bgcolor: '#10B981', color: 'white', height: 20 }} />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Timer size={18} />
                    Upcoming
                    <Chip label="15" size="small" sx={{ bgcolor: '#F59E0B', color: 'white', height: 20 }} />
                  </Box>
                } 
              />
            </Tabs>
          </Paper>
        </Box>

        {/* View Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, v) => v && setViewMode(v)}
            size="small"
          >
            <ToggleButton value="grid">
              <Grid3X3 size={18} />
            </ToggleButton>
            <ToggleButton value="list">
              <ListIcon size={18} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCard
                project={project}
                savedProperties={savedProperties}
                handleSaveProperty={handleSaveProperty}
                handleInquiry={handleInquiry}
              />
            </Grid>
          ))}
        </Grid>

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowRight size={20} />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              px: 5,
              py: 1.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          >
            View All 500+ Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProjects;