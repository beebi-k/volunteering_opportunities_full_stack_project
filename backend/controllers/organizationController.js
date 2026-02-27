const supabase = require('../config/database');

// Get All Organizations
exports.getAllOrganizations = async (req, res, next) => {
  try {
    const { category, city, state, search } = req.query;
    
    // Check if Supabase is configured
    if (process.env.SUPABASE_URL.includes('placeholder')) {
      // Return sample data if Supabase is not configured
      const sampleOrganizations = [
        {
          id: '1',
          name: 'Teach For India',
          description: 'A movement of leaders working to eliminate educational inequity in India by placing fellows in low-income schools.',
          logo_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150',
          banner_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
          website: 'https://www.teachforindia.org',
          email: 'info@teachforindia.org',
          phone: '+91-22-61546000',
          address: 'Teach For India, 402, A-Wing, Solitaire Corporate Park, Chakala, Andheri (Kurla Road)',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          latitude: 19.1156,
          longitude: 72.8845,
          category: 'Education',
          subcategories: ['Teaching', 'Mentoring', 'Youth Development'],
          founded_year: 2009,
          team_size: 500,
          mission: 'To create a movement of leaders who will eliminate educational inequity.',
          vision: 'An India where all children get an excellent education.',
          is_verified: true,
          rating: 4.8,
          total_reviews: 1250,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'CRY - Child Rights and You',
          description: 'An Indian non-profit that believes in every child\'s right to a childhood - to live, learn, grow and play.',
          logo_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150',
          banner_url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
          website: 'https://www.cry.org',
          email: 'info@crymail.org',
          phone: '+91-33-22894000',
          address: 'CRY, 15A, Dr. Rajendra Prasad Sarani, 1st Floor',
          city: 'Kolkata',
          state: 'West Bengal',
          country: 'India',
          latitude: 22.5726,
          longitude: 88.3639,
          category: 'Child Welfare',
          subcategories: ['Child Rights', 'Education', 'Healthcare'],
          founded_year: 1979,
          team_size: 300,
          mission: 'To enable people to take responsibility for the situation of the deprived Indian child.',
          vision: 'A happy, healthy, and creative child whose rights are protected and honored.',
          is_verified: true,
          rating: 4.7,
          total_reviews: 980,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'WWF India',
          description: 'The Indian part of the World Wide Fund for Nature, working on wildlife conservation and environmental protection.',
          logo_url: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=150',
          banner_url: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?w=800',
          website: 'https://www.wwfindia.org',
          email: 'contact@wwfindia.net',
          phone: '+91-11-41504700',
          address: 'WWF-India, 172 B, Lodhi Estate, New Delhi',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          latitude: 28.6139,
          longitude: 77.2090,
          category: 'Environment',
          subcategories: ['Wildlife Conservation', 'Environmental Protection', 'Climate Change'],
          founded_year: 1969,
          team_size: 400,
          mission: 'To stop the degradation of the planet\'s natural environment and build a future in which humans live in harmony with nature.',
          vision: 'A world where people and nature thrive.',
          is_verified: true,
          rating: 4.6,
          total_reviews: 850,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'HelpAge India',
          description: 'Working for the cause and care of disadvantaged older persons to improve their quality of life.',
          logo_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150',
          banner_url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800',
          website: 'https://www.helpageindia.org',
          email: 'info@helpageindia.org',
          phone: '+91-11-41688000',
          address: 'HelpAge India, C-14, Qutab Institutional Area, New Delhi',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          latitude: 28.5450,
          longitude: 77.1630,
          category: 'Elderly Care',
          subcategories: ['Elderly Care', 'Healthcare', 'Social Support'],
          founded_year: 1978,
          team_size: 250,
          mission: 'To work for the cause and care of disadvantaged older persons and improve their quality of life.',
          vision: 'A society where elderly people live with dignity and respect.',
          is_verified: true,
          rating: 4.5,
          total_reviews: 720,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Make A Difference (MAD)',
          description: 'A youth volunteer network that works with children in orphanages and street shelters.',
          logo_url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=150',
          banner_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
          website: 'https://www.makeadiff.in',
          email: 'info@makeadiff.in',
          phone: '+91-484-2388222',
          address: 'Make A Difference, 3rd Floor, Kavitha Building, Kaloor',
          city: 'Kochi',
          state: 'Kerala',
          country: 'India',
          latitude: 9.9312,
          longitude: 76.2673,
          category: 'Youth Development',
          subcategories: ['Youth Mentoring', 'Education', 'Child Welfare'],
          founded_year: 2006,
          team_size: 200,
          mission: 'To ensure that children living in shelter homes get the support and care they need.',
          vision: 'A world where every child has equal opportunities.',
          is_verified: true,
          rating: 4.7,
          total_reviews: 640,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Goonj',
          description: 'An award-winning social enterprise working on clothing as a basic but unaddressed need.',
          logo_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150',
          banner_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
          website: 'https://www.goonj.org',
          email: 'info@goonj.org',
          phone: '+91-11-41415575',
          address: 'Goonj, J-93, Sarita Vihar, New Delhi',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          latitude: 28.5355,
          longitude: 77.2890,
          category: 'Social Welfare',
          subcategories: ['Clothing', 'Disaster Relief', 'Rural Development'],
          founded_year: 1999,
          team_size: 350,
          mission: 'To address the basic but ignored needs of people.',
          vision: 'A world where everyone\'s basic needs are met with dignity.',
          is_verified: true,
          rating: 4.8,
          total_reviews: 890,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '7',
          name: 'Samarthanam Trust',
          description: 'Working for the empowerment of persons with disabilities and the underprivileged.',
          logo_url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=150',
          banner_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
          website: 'https://www.samarthanam.org',
          email: 'info@samarthanam.org',
          phone: '+91-80-26592999',
          address: 'Samarthanam Trust, #112, 2nd Floor, 100ft Road, Indiranagar',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          latitude: 12.9716,
          longitude: 77.5946,
          category: 'Disability Support',
          subcategories: ['Disability Rights', 'Education', 'Employment'],
          founded_year: 1997,
          team_size: 180,
          mission: 'To empower persons with disabilities and the underprivileged through education, training, and employment.',
          vision: 'An inclusive society where everyone has equal opportunities.',
          is_verified: true,
          rating: 4.6,
          total_reviews: 560,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '8',
          name: 'Pratham Education Foundation',
          description: 'One of India\'s largest education NGOs, working to provide quality education to underprivileged children.',
          logo_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150',
          banner_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
          website: 'https://www.pratham.org',
          email: 'info@pratham.org',
          phone: '+91-22-22824444',
          address: 'Pratham, 4th Floor, Pratham Centre, Juhu Tara Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          latitude: 19.1156,
          longitude: 72.8296,
          category: 'Education',
          subcategories: ['Primary Education', 'Literacy', 'Child Development'],
          founded_year: 1995,
          team_size: 600,
          mission: 'Every child in school and learning well.',
          vision: 'All children achieve basic reading, writing, and arithmetic skills.',
          is_verified: true,
          rating: 4.9,
          total_reviews: 1420,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '9',
          name: 'Snehalaya',
          description: 'Working for the rehabilitation and empowerment of women, children, and LGBTQ+ communities.',
          logo_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
          banner_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
          website: 'https://www.snehalaya.org',
          email: 'info@snehalaya.org',
          phone: '+91-724-2250000',
          address: 'Snehalaya, Ahmednagar, Maharashtra',
          city: 'Ahmednagar',
          state: 'Maharashtra',
          country: 'India',
          latitude: 19.0948,
          longitude: 74.7479,
          category: 'Social Welfare',
          subcategories: ['Women Empowerment', 'Child Welfare', 'LGBTQ+ Rights'],
          founded_year: 1989,
          team_size: 220,
          mission: 'To provide shelter, care, and education to women, children, and LGBTQ+ communities in need.',
          vision: 'A society free from discrimination and violence.',
          is_verified: true,
          rating: 4.7,
          total_reviews: 670,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '10',
          name: 'Akshaya Patra Foundation',
          description: 'Implementing the Mid-Day Meal Scheme in government schools to fight classroom hunger.',
          logo_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150',
          banner_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
          website: 'https://www.akshayapatra.org',
          email: 'info@akshayapatra.org',
          phone: '+91-80-30143400',
          address: 'Akshaya Patra, 18th Cross, 7th Main, ISRO Layout',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          latitude: 12.9716,
          longitude: 77.5946,
          category: 'Child Welfare',
          subcategories: ['Child Nutrition', 'Education', 'Food Security'],
          founded_year: 2000,
          team_size: 5000,
          mission: 'No child in India shall be deprived of education because of hunger.',
          vision: 'A hunger-free and educated India.',
          is_verified: true,
          rating: 4.8,
          total_reviews: 2100,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      let filtered = sampleOrganizations;

      // Apply filters
      if (category) {
        filtered = filtered.filter(org => org.category === category);
      }
      if (city) {
        filtered = filtered.filter(org => org.city === city);
      }
      if (state) {
        filtered = filtered.filter(org => org.state === state);
      }
      if (search) {
        filtered = filtered.filter(org => 
          org.name.toLowerCase().includes(search.toLowerCase()) ||
          org.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: { organizations: filtered }
      });
    }
    
    let query = supabase
      .from('organizations')
      .select('*')
      .eq('is_verified', true);

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    if (city) {
      query = query.eq('city', city);
    }
    if (state) {
      query = query.eq('state', state);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: organizations, error } = await query;

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: organizations.length,
      data: { organizations }
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Organization
exports.getOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: organization, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }

    // Get opportunities for this organization
    const { data: opportunities } = await supabase
      .from('opportunities')
      .select('*')
      .eq('organization_id', id)
      .eq('status', 'active');

    // Get reviews for this organization
    const { data: reviews } = await supabase
      .from('reviews')
      .select(`
        *,
        users:user_id (full_name, avatar_url)
      `)
      .eq('organization_id', id);

    res.status(200).json({
      success: true,
      data: {
        organization: {
          ...organization,
          opportunities: opportunities || [],
          reviews: reviews || []
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get Organization Categories
exports.getCategories = async (req, res, next) => {
  try {
    const { data: organizations } = await supabase
      .from('organizations')
      .select('category');

    const categories = [...new Set(organizations.map(org => org.category))];

    res.status(200).json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    next(error);
  }
};