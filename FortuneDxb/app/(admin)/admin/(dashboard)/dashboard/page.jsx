'use client';
import { Box, Grid, Card, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  BusinessOutlined,
  ApartmentOutlined,
  ContactPhoneOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';

export default function DashboardPage() {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total Developers',
      value: '24',
      icon: BusinessOutlined,
      color: theme.palette.navy.main,
    },
    {
      title: 'Total Projects',
      value: '156',
      icon: ApartmentOutlined,
      color: theme.palette.gold.main,
    },
    {
      title: 'Total Leads',
      value: '1,240',
      icon: ContactPhoneOutlined,
      color: theme.palette.success.main,
    },
    {
      title: 'This Month',
      value: '+12%',
      icon: TrendingUpOutlined,
      color: theme.palette.info.main,
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 40, sm: 50 },
                    height: { xs: 40, sm: 50 },
                    borderRadius: 2,
                    bgcolor: alpha(stat.color, 0.08),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon sx={{ color: stat.color, fontSize: { xs: 22, sm: 26 } }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: 'secondary.main',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Recent Activity Section */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} lg={8}>
          <Card
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              minHeight: { xs: 250, sm: 350 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              Recent Leads
            </Typography>
            <Typography color="text.secondary">
              Lead data will appear here...
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              minHeight: { xs: 250, sm: 350 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              Quick Actions
            </Typography>
            <Typography color="text.secondary">
              Shortcuts will appear here...
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}