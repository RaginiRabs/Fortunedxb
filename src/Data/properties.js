const properties = [
  {
    id: 1,
    title: 'BINGHATTI IVORY',
    location: 'Al Jaddaf, Dubai',
    developer: 'Binghatti Developers',
    handover: 'Dec 2025',
    floors: '25 Storey',
    status: 'NEW PROJECT',
    price: 888888,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    
    builder: {
      name: 'Binghatti Developers',
      completedProjects: 12,
      ongoingProjects: 8,
      totalProjects: 20,
      experienceYears: 8,
      rating: 4.3,
      awards: ['Best Luxury Developer 2023', 'Dubai Quality Award 2022'],
      about: 'Leading luxury real estate developer in Dubai with 15+ years of excellence in creating iconic residential and commercial properties.',
      featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      socialMedia: {
        facebook: 'https://facebook.com/binghatti',
        instagram: 'https://instagram.com/binghatti'
      },
      projects: [
        { title: 'Binghatti Crescent' },
        { title: 'Binghatti Onyx' },
        { title: 'Binghatti Pearl' },
        { title: 'Binghatti Residences' },
        { title: 'Binghatti Heights' }
      ],
      specializations: ['Luxury Residential', 'Commercial', 'Waterfront Properties'],
      location: 'Dubai, UAE'
    },
    
    category: 'Residential',
    specialTags: ['Pre-launch', 'RERA Approved', 'Limited Units', 'Sea Facing'],
    
    about: 'Luxury waterfront residences offering panoramic views of Dubai Creek. Premium finishes with smart home technology.',
    
    configurations: [
      {
        type: '1 BHK',
        area: '750 sq.ft.',
        price: 888888,
        bedrooms: 1,
        bathrooms: 2,
        tower: 'Tower A',
        totalUnits: 50,
        balcony: 'Sea Facing'
      },
      {
        type: '2 BHK',
        area: '1250 sq.ft.',
        price: 1500000,
        bedrooms: 2,
        bathrooms: 3,
        tower: 'Tower A',
        totalUnits: 30,
        balcony: 'Sea Facing'
      }
    ],
    
    amenities: [
      'Infinity Pool', 'Kids Pool', 'Gym & Fitness Center', 'Spa & Sauna',
      'Children\'s Play Area', 'Barbecue Area', 'Landscaped Gardens',
      '24/7 Security', 'Concierge Service', 'Underground Parking'
    ],
    
    propertyHighlights: [
      'Waterfront Location', 'Smart Home Technology', 'Premium German Finishes',
      'Panoramic Dubai Creek Views', 'Walking Distance to Metro'
    ],
    
    nearbyLocations: [
      { name: 'Dubai Creek', distance: '0.5 km', type: 'Waterfront' },
      { name: 'Al Jaddaf Metro Station', distance: '0.8 km', type: 'Transport' },
      { name: 'Dubai Festival City Mall', distance: '2.1 km', type: 'Shopping' },
      { name: 'Dubai Frame', distance: '3.5 km', type: 'Landmark' },
      { name: 'Business Bay', distance: '4.2 km', type: 'Business District' },
      { name: 'Burj Khalifa', distance: '6.8 km', type: 'Landmark' },
      { name: 'Dubai Mall', distance: '7.2 km', type: 'Shopping' },
      { name: 'Dubai International Airport', distance: '8.5 km', type: 'Transport' }
    ],
    
    paymentPlan: {
      description: 'Flexible 80/20 Payment Plan',
      milestones: [
        { phase: 'Booking', percentage: 10, amount: 88888 },
        { phase: 'Construction', percentage: 60, amount: 533332 },
        { phase: 'Handover', percentage: 20, amount: 177777 },
        { phase: 'Post Handover', percentage: 10, amount: 88889 }
      ]
    },
    
    documents: {
      reraCertificate: '/documents/binghatti-rera.pdf',
      floorPlans: ['/documents/1bhk-plan.pdf', '/documents/2bhk-plan.pdf'],
      paymentPlan: '/documents/payment-plan.pdf',
      priceSheet: '/documents/price-sheet.pdf'
    },
    
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop'
    ],
    
    video: 'https://www.youtube.com/embed/sample-video-1',
   
    socialMedia: {
      facebook: 'https://facebook.com/binghatti',
      instagram: 'https://instagram.com/binghatti'
    },
    
    offer: {
      title: 'Early Bird Offer',
      description: 'Free Registration & 2 Years Service Charge Waiver',
      validUntil: '2024-12-31'
    }
  },
  {
    id: 2,
    title: 'AZURE HEIGHTS',
    location: 'Dubai Marina, Dubai',
    developer: 'Emaar Properties',
    handover: 'Mar 2026',
    floors: '32 Storey',
    status: 'UPCOMING',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    
    builder: {
      name: 'Emaar Properties',
      completedProjects: 45,
      ongoingProjects: 15,
      totalProjects: 60,
      experienceYears: 25,
      rating: 4.8,
      awards: ['World\'s Best Developer 2023', 'Dubai Excellence Award', 'Global Real Estate Leader'],
      about: 'Pioneering visionary developments including Burj Khalifa and Dubai Mall. Transforming city skylines with iconic structures.',
      featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
      socialMedia: {
        facebook: 'https://facebook.com/emaar',
        instagram: 'https://instagram.com/emaar',
        twitter: 'https://twitter.com/emaar'
      },
      projects: [
        { title: 'Burj Khalifa' },
        { title: 'Dubai Mall' },
        { title: 'Downtown Dubai' },
        { title: 'Dubai Marina' },
        { title: 'Emaar Beachfront' },
        { title: 'Arabian Ranches' }
      ],
      specializations: ['Iconic Skyscrapers', 'Mixed Use', 'Luxury Residential', 'Shopping Malls'],
      location: 'Dubai, UAE'
    },
    
    category: 'Residential',
    specialTags: ['Marina View', 'Premium Tower', 'OC Ready', 'Loan Approved'],
    
    about: 'Iconic skyscraper in Dubai Marina offering breathtaking sea and city views. Ultra-luxury living with world-class amenities.',
    
    configurations: [
      {
        type: 'Studio',
        area: '550 sq.ft.',
        price: 1200000,
        bedrooms: 0,
        bathrooms: 1,
        tower: 'Azure Tower',
        totalUnits: 40,
        balcony: 'Marina View'
      },
      {
        type: '1 BHK',
        area: '850 sq.ft.',
        price: 1800000,
        bedrooms: 1,
        bathrooms: 2,
        tower: 'Azure Tower',
        totalUnits: 35,
        balcony: 'Sea Facing'
      }
    ],
    
    amenities: [
      'Infinity Pool with Marina View', 'State-of-the-art Gym', 'Yoga Studio',
      'Private Cinema', 'Business Center', 'Sky Lounge'
    ],
    
    propertyHighlights: [
      'Direct Marina Views', 'Walking Distance to Beach', 'Premium Emaar Quality',
      'Smart Home Automation', 'Private Beach Access'
    ],
    
    nearbyLocations: [
      { name: 'Dubai Marina Mall', distance: '0.3 km', type: 'Shopping' },
      { name: 'JBR Beach', distance: '0.5 km', type: 'Beach' },
      { name: 'The Walk JBR', distance: '0.6 km', type: 'Entertainment' },
      { name: 'Marina Walk', distance: '0.2 km', type: 'Waterfront' },
      { name: 'Bluewaters Island', distance: '1.8 km', type: 'Entertainment' },
      { name: 'Ain Dubai', distance: '2.1 km', type: 'Landmark' },
      { name: 'Palm Jumeirah', distance: '3.5 km', type: 'Landmark' },
      { name: 'Dubai Media City', distance: '2.8 km', type: 'Business District' },
      { name: 'Internet City Metro', distance: '1.2 km', type: 'Transport' }
    ],
    
    paymentPlan: {
      description: '90/10 Easy Payment Plan',
      milestones: [
        { phase: 'Booking', percentage: 15, amount: 180000 },
        { phase: 'Construction', percentage: 65, amount: 780000 },
        { phase: 'Handover', percentage: 10, amount: 120000 },
        { phase: 'Post Handover', percentage: 10, amount: 120000 }
      ]
    },
    
    documents: {
      reraCertificate: '/documents/azure-rera.pdf',
      floorPlans: ['/documents/studio-plan.pdf', '/documents/1bhk-plan.pdf'],
      paymentPlan: '/documents/azure-payment.pdf'
    },
    
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop'
    ],
    
    video: 'https://www.youtube.com/embed/sample-video-2',
    
    
    socialMedia: {
      facebook: 'https://facebook.com/emaar',
      instagram: 'https://instagram.com/emaar'
    },
    
    offer: {
      title: 'Foundation Offer',
      description: 'Free DEWA Connection & 1 Year Free Maintenance',
      validUntil: '2024-11-30'
    }
  },
  {
    id: 3,
    title: 'PALM RESIDENCES',
    location: 'Palm Jumeirah, Dubai',
    developer: 'Nakheel Properties',
    handover: 'Jun 2025',
    floors: '18 Storey',
    status: 'READY TO MOVE',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    
    builder: {
      name: 'Nakheel Properties',
      completedProjects: 35,
      ongoingProjects: 12,
      totalProjects: 47,
      experienceYears: 20,
      rating: 4.6,
      awards: ['Palm Jumeirah Excellence', 'Best Waterfront Developer', 'Innovation in Real Estate'],
      about: 'Creator of iconic landmarks including Palm Jumeirah and The World Islands. Master developer of waterfront communities.',
      featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
      socialMedia: {
        facebook: 'https://facebook.com/nakheel',
        instagram: 'https://instagram.com/nakheel',
        linkedin: 'https://linkedin.com/company/nakheel'
      },
      projects: [
        { title: 'Palm Jumeirah' },
        { title: 'The World Islands' },
        { title: 'Deira Islands' },
        { title: 'Nakheel Mall' },
        { title: 'Palm Tower' }
      ],
      specializations: ['Waterfront Communities', 'Island Development', 'Mixed Use', 'Retail'],
      location: 'Dubai, UAE'
    },
    
    category: 'Residential',
    specialTags: ['Beach Front', 'Ready Property', 'OC Received', 'Immediate Access'],
    
    about: 'Exclusive beachfront residences on Palm Jumeirah offering private beach access and panoramic Arabian Gulf views.',
    
    configurations: [
      {
        type: '2 BHK',
        area: '1450 sq.ft.',
        price: 2500000,
        bedrooms: 2,
        bathrooms: 3,
        tower: 'Crescent Tower',
        totalUnits: 15,
        balcony: 'Beach Front'
      },
      {
        type: '3 BHK',
        area: '1950 sq.ft.',
        price: 3500000,
        bedrooms: 3,
        bathrooms: 4,
        tower: 'Crescent Tower',
        totalUnits: 12,
        balcony: 'Sea Facing'
      }
    ],
    
    amenities: [
      'Private Beach Access', 'Temperature Controlled Pool', 'Beach Club',
      'Water Sports Facilities', 'Fine Dining Restaurant', 'Spa & Wellness Center'
    ],
    
    propertyHighlights: [
      'Direct Beach Access', 'Palm Jumeirah Location', 'Ready to Move In',
      'Private Marina', 'OC Certificate Received'
    ],
    
    nearbyLocations: [
      { name: 'Atlantis The Palm', distance: '1.2 km', type: 'Entertainment' },
      { name: 'The Pointe', distance: '0.8 km', type: 'Shopping' },
      { name: 'Nakheel Mall', distance: '2.1 km', type: 'Shopping' },
      { name: 'Palm West Beach', distance: '0.3 km', type: 'Beach' },
      { name: 'Aquaventure Waterpark', distance: '1.5 km', type: 'Entertainment' },
      { name: 'The Lost Chambers Aquarium', distance: '1.3 km', type: 'Entertainment' },
      { name: 'Dubai Marina', distance: '4.2 km', type: 'Area' },
      { name: 'Jumeirah Beach Residence', distance: '3.8 km', type: 'Area' },
      { name: 'Burj Al Arab', distance: '6.5 km', type: 'Landmark' }
    ],
    
    paymentPlan: {
      description: 'Immediate Payment Plan',
      milestones: [
        { phase: 'Booking', percentage: 20, amount: 500000 },
        { phase: 'Balance on Handover', percentage: 80, amount: 2000000 }
      ]
    },
    
    documents: {
      reraCertificate: '/documents/palm-rera.pdf',
      floorPlans: ['/documents/2bhk-palm.pdf', '/documents/3bhk-palm.pdf'],
      paymentPlan: '/documents/palm-payment.pdf',
      ocCertificate: '/documents/palm-oc.pdf'
    },
    
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop'
    ],
    
    video: 'https://www.youtube.com/embed/sample-video-3',
   
    socialMedia: {
      facebook: 'https://facebook.com/nakheel',
      instagram: 'https://instagram.com/nakheel'
    },
    
    offer: {
      title: 'Ready Possession Offer',
      description: 'Free Furniture Package & No Bank Processing Fee',
      validUntil: '2024-10-15'
    }
  },
  {
    id: 4,
    title: 'SKYLINE TOWERS',
    location: 'Business Bay, Dubai',
    developer: 'Damac Properties',
    handover: 'Sep 2025',
    floors: '40 Storey',
    status: 'UNDER CONSTRUCTION',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop',
    
    builder: {
      name: 'Damac Properties',
      completedProjects: 28,
      ongoingProjects: 18,
      totalProjects: 46,
      experienceYears: 18,
      rating: 4.2,
      awards: ['Middle East Developer of the Year', 'Luxury Lifestyle Awards', 'Best International Developer'],
      about: 'Leading luxury real estate developer with international presence and premium partnerships with brands like Versace and Paramount.',
      featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
      socialMedia: {
        facebook: 'https://facebook.com/damac',
        instagram: 'https://instagram.com/damac',
        youtube: 'https://youtube.com/damac'
      },
      projects: [
        { title: 'Damac Hills' },
        { title: 'Aykon City' },
        { title: 'Cavalli Tower' },
        { title: 'Versace Residences' },
        { title: 'Paramount Hotels' }
      ],
      specializations: ['Branded Residences', 'Luxury Hotels', 'Commercial', 'Golf Communities'],
      location: 'Dubai, UAE'
    },
    
    category: 'Commercial & Residential',
    specialTags: ['Downtown View', 'Mixed Use', 'High ROI', 'Business District'],
    
    about: 'Mixed-use skyscraper in Business Bay offering commercial spaces and luxury residences with stunning Downtown views.',
    
    configurations: [
      {
        type: 'Office Space',
        area: '800 sq.ft.',
        price: 950000,
        bedrooms: 0,
        bathrooms: 1,
        tower: 'Commercial Tower',
        totalUnits: 60,
        balcony: 'City View'
      },
      {
        type: '1 BHK Residential',
        area: '780 sq.ft.',
        price: 1200000,
        bedrooms: 1,
        bathrooms: 2,
        tower: 'Residential Tower',
        totalUnits: 45,
        balcony: 'Burj Khalifa View'
      }
    ],
    
    amenities: [
      'Executive Business Center', 'Conference Rooms', 'High Speed Internet',
      'Multiple Elevators', 'Underground Parking', 'Retail Arcade'
    ],
    
    propertyHighlights: [
      'Burj Khalifa Views', 'Business Bay Location', 'High Rental Yield',
      'Mixed Use Development', 'Walking Distance to Metro'
    ],
    
    nearbyLocations: [
      { name: 'Burj Khalifa', distance: '1.8 km', type: 'Landmark' },
      { name: 'Dubai Mall', distance: '2.1 km', type: 'Shopping' },
      { name: 'Business Bay Metro Station', distance: '0.4 km', type: 'Transport' },
      { name: 'Dubai Canal', distance: '0.6 km', type: 'Waterfront' },
      { name: 'Downtown Dubai', distance: '1.5 km', type: 'Area' },
      { name: 'Dubai Opera', distance: '2.3 km', type: 'Entertainment' },
      { name: 'Dubai Fountain', distance: '2.0 km', type: 'Entertainment' },
      { name: 'Financial Centre Metro', distance: '1.2 km', type: 'Transport' },
      { name: 'DIFC', distance: '2.8 km', type: 'Business District' },
      { name: 'World Trade Centre', distance: '3.2 km', type: 'Business District' }
    ],
    
    paymentPlan: {
      description: 'Construction Linked Plan',
      milestones: [
        { phase: 'Booking', percentage: 10, amount: 95000 },
        { phase: 'Foundation', percentage: 15, amount: 142500 },
        { phase: 'Super Structure', percentage: 35, amount: 332500 },
        { phase: 'Finishing', percentage: 25, amount: 237500 },
        { phase: 'Handover', percentage: 15, amount: 142500 }
      ]
    },
    
    documents: {
      reraCertificate: '/documents/skyline-rera.pdf',
      floorPlans: ['/documents/office-plan.pdf', '/documents/residential-plan.pdf'],
      paymentPlan: '/documents/skyline-payment.pdf'
    },
    
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
    ],
    
    video: 'https://www.youtube.com/embed/sample-video-4',
    
    
    socialMedia: {
      facebook: 'https://facebook.com/damac',
      instagram: 'https://instagram.com/damac'
    },
    
    offer: {
      title: 'Commercial Launch Offer',
      description: '2 Years Service Charge Free & Free Legal Fees',
      validUntil: '2024-09-30'
    }
  },
  {
    id: 5,
    title: 'EMERALD GARDENS',
    location: 'Dubai Hills Estate, Dubai',
    developer: 'Meraas',
    handover: 'Nov 2025',
    floors: '15 Storey',
    status: 'NEW PROJECT',
    price: 780000,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop',
    
    builder: {
      name: 'Meraas',
      completedProjects: 22,
      ongoingProjects: 10,
      totalProjects: 32,
      experienceYears: 12,
      rating: 4.4,
      awards: ['Sustainable Development Award', 'Community Excellence Award', 'Innovation in Urban Planning'],
      about: 'Innovative developer creating vibrant destinations and sustainable communities in Dubai with focus on lifestyle experiences.',
      featuredImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop',
      socialMedia: {
        facebook: 'https://facebook.com/meraas',
        instagram: 'https://instagram.com/meraas',
        twitter: 'https://twitter.com/meraas'
      },
      projects: [
        { title: 'City Walk' },
        { title: 'La Mer' },
        { title: 'The Beach' },
        { title: 'Al Seef' },
        { title: 'Bluewaters Island' }
      ],
      specializations: ['Lifestyle Destinations', 'Waterfront', 'Community Living', 'Retail & Entertainment'],
      location: 'Dubai, UAE'
    },
    
    category: 'Residential',
    specialTags: ['Golf View', 'Family Community', 'Park Facing', 'Eco Friendly'],
    
    about: 'Family-oriented low-rise community in Dubai Hills Estate offering golf course views and extensive green spaces.',
    
    configurations: [
      {
        type: '1 BHK',
        area: '720 sq.ft.',
        price: 780000,
        bedrooms: 1,
        bathrooms: 2,
        tower: 'Garden Towers',
        totalUnits: 35,
        balcony: 'Golf Course View'
      },
      {
        type: '2 BHK',
        area: '1150 sq.ft.',
        price: 1250000,
        bedrooms: 2,
        bathrooms: 3,
        tower: 'Garden Towers',
        totalUnits: 28,
        balcony: 'Park Facing'
      }
    ],
    
    amenities: [
      'Swimming Pools', 'Children\'s Splash Park', 'Tennis Courts',
      'Basketball Court', 'Cycling Track', 'Jogging Trails'
    ],
    
    propertyHighlights: [
      'Golf Course Views', 'Family Community', 'Low Rise Buildings',
      'Extensive Green Spaces', 'Dubai Hills Location'
    ],
    
    nearbyLocations: [
      { name: 'Dubai Hills Mall', distance: '0.8 km', type: 'Shopping' },
      { name: 'Dubai Hills Golf Club', distance: '0.3 km', type: 'Golf' },
      { name: 'Meydan Racecourse', distance: '2.5 km', type: 'Entertainment' },
      { name: 'Al Khail Road', distance: '1.2 km', type: 'Transport' },
      { name: 'Mirdif', distance: '4.8 km', type: 'Area' },
      { name: 'Dubai Sports City', distance: '5.2 km', type: 'Entertainment' },
      { name: 'Dubai Miracle Garden', distance: '6.1 km', type: 'Entertainment' },
      { name: 'Global Village', distance: '8.3 km', type: 'Entertainment' },
      { name: 'Dubai International Airport', distance: '12.5 km', type: 'Transport' },
      { name: 'Downtown Dubai', distance: '9.8 km', type: 'Area' }
    ],
    
    paymentPlan: {
      description: 'Family Friendly Payment Plan',
      milestones: [
        { phase: 'Booking', percentage: 5, amount: 39000 },
        { phase: 'Construction', percentage: 70, amount: 546000 },
        { phase: 'Handover', percentage: 15, amount: 117000 },
        { phase: 'Post Handover', percentage: 10, amount: 78000 }
      ]
    },
    
    documents: {
      reraCertificate: '/documents/emerald-rera.pdf',
      floorPlans: ['/documents/1bhk-emerald.pdf', '/documents/2bhk-emerald.pdf'],
      paymentPlan: '/documents/emerald-payment.pdf'
    },
    
    gallery: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop'
    ],
    
    video: 'https://www.youtube.com/embed/sample-video-5',
    
    socialMedia: {
      facebook: 'https://facebook.com/meraas',
      instagram: 'https://instagram.com/meraas'
    },
    
    offer: {
      title: 'Family Package',
      description: 'Free Kids Education Fund & Community Membership',
      validUntil: '2024-08-31'
    }
  }
];

export default properties;