// File: src/component/Propertycard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { MapPin, Calendar, Building2 } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const getLocationString = (location) => {
    if (typeof location === 'string') return location;
    if (location && location.latitude && location.longitude) {
      return 'Dubai, UAE';
    }
    return 'Location not available';
  };

  const getUnitRange = (configurations) => {
    if (!configurations || !Array.isArray(configurations)) return 'Various';
    
    const types = configurations.map(config => config.type) || [];
    const bhkTypes = types.filter(type => type && type.includes('BHK'));
    if (bhkTypes.length === 0) return types[0] || 'Studio';
    
    const bhkNumbers = bhkTypes.map(type => {
      const match = type.match(/(\d+)\s*BHK/);
      return match ? parseInt(match[1]) : null;
    }).filter(num => num !== null);
    
    if (bhkNumbers.length === 0) return 'Various';
    
    const min = Math.min(...bhkNumbers);
    const max = Math.max(...bhkNumbers);
    return min === max ? `${min} BHK` : `${min}-${max} BHK`;
  };

  return (
   <Card
  sx={{
    minWidth: 360,
    borderRadius: 3,
    overflow: "hidden",
    bgcolor: "#0D1A2F",
    border: "1px solid rgba(195, 159, 88, 0.25)",
    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    position: "relative",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
      borderColor: "rgba(195, 159, 88, 0.55)",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: 3,
      padding: "1px",
      background:
        "linear-gradient(135deg, rgba(195, 159, 88,0.18), rgba(255,215,146,0.05))",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      pointerEvents: "none",
    },
  }}
>
  <Box sx={{ position: "relative", height: 220 }}>
    <CardMedia
      component="img"
      height="220"
      image={property?.image}
      alt={property?.title}
      sx={{
        objectFit: "cover",
        transition: "transform 0.8s ease",
        "&:hover": { transform: "scale(1.08)" },
      }}
    />

    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom,rgba(10,22,40,0.4) 0%,rgba(10,22,40,0.9) 100%)",
      }}
    />

    {/* Status */}
    <Chip
      label={property?.status || "Ready to Move"}
      sx={{
        position: "absolute",
        top: 14,
        left: 14,
        bgcolor: "#C39F58",
        color: "#0D1A2F",
        fontWeight: 700,
        fontSize: "0.7rem",
      }}
    />
  </Box>

  <CardContent sx={{ p: 2.3 }}>
    {/* Title */}
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "1.15rem",
        color: "#FFFFFF",
        mb: 1,
        lineHeight: 1.3,
      }}
    >
      {property?.title}
    </Typography>

    {/* Location & Handover */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 2 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <MapPin size={16} color="#E6C178" />
        <Typography sx={{ fontSize: "0.86rem", color: "#B9C8E2" }}>
          {getLocationString(property?.location)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Calendar size={16} color="#E6C178" />
        <Typography sx={{ fontSize: "0.86rem", color: "#B9C8E2" }}>
          Handover: {property?.handover || "TBA"}
        </Typography>
      </Box>
    </Box>

    {/* Price + Button */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 1.5,
        borderTop: "1px solid rgba(195, 159, 88, 0.18)",
      }}
    >
      <Box>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.55)",
            mb: 0.25,
          }}
        >
          Starting From
        </Typography>

        <Typography
          sx={{
            background:
              "linear-gradient(135deg,#EBD9A5,#C39F58,#8E6C33)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            fontSize: "1.15rem",
          }}
        >
          AED {(property?.price || 0)?.toLocaleString()}
        </Typography>
      </Box>

      <Button
        sx={{
          borderColor: "#C39F58",
          color: "#C39F58",
          textTransform: "none",
          fontSize: "0.85rem",
          px: 2,
          py: "6px",
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "rgba(195, 159, 88, 0.18)",
            borderColor: "#EED9A5",
          },
        }}
        variant="outlined"
      >
        View Details
      </Button>
    </Box>
  </CardContent>
</Card>

  );
};

export default PropertyCard;