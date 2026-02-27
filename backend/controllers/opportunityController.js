const supabase = require('../config/database');

// Get All Opportunities
exports.getAllOpportunities = async (req, res, next) => {
  try {
    const { category, city, state, is_remote, search } = req.query;
    
    // Check if Supabase is configured
    if (process.env.SUPABASE_URL.includes('placeholder')) {
      // Return sample data if Supabase is not configured
      const sampleOpportunities = [
        {
          id: '1',
          organization_id: '1',
          title: 'Teaching Fellow',
          description: 'Teach underprivileged children in low-income schools and make a real impact on their lives.',
          requirements: ['Bachelor\'s degree', 'Fluency in English and local language', 'Commitment to 2 years'],
          responsibilities: ['Plan and deliver lessons', 'Assess student progress', 'Engage with parents', 'Participate in training programs'],
          skills_required: ['Teaching', 'Communication', 'Leadership', 'Patience'],
          category: 'Education',
          subcategory: 'Teaching',
          location: 'Multiple locations across India',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          is_remote: false,
          latitude: 19.1156,
          longitude: 72.8845,
          time_commitment: 'Full-time',
          duration: '2 years',
          start_date: '2024-03-01',
          end_date: '2026-03-01',
          deadline: '2024-02-15',
          positions_available: 50,
          positions_filled: 25,
          min_age: 21,
          benefits: ['Stipend of ₹30,000/month', 'Professional development', 'Leadership training', 'Networking opportunities'],
          status: 'active',
          views: 150,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Teach For India',
            logo_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150',
            city: 'Mumbai',
            state: 'Maharashtra',
            rating: 4.8
          }
        },
        {
          id: '2',
          organization_id: '2',
          title: 'Child Rights Advocate',
          description: 'Advocate for children\'s rights and help implement child protection programs.',
          requirements: ['Background in social work', 'Understanding of child rights', 'Good communication skills'],
          responsibilities: ['Conduct awareness programs', 'Document cases', 'Liaise with authorities', 'Support families'],
          skills_required: ['Advocacy', 'Communication', 'Social Work'],
          category: 'Child Welfare',
          subcategory: 'Child Rights',
          location: 'Kolkata and surrounding areas',
          city: 'Kolkata',
          state: 'West Bengal',
          country: 'India',
          is_remote: false,
          latitude: 22.5726,
          longitude: 88.3639,
          time_commitment: '20 hours/week',
          duration: '1 year',
          start_date: '2024-03-01',
          end_date: '2025-03-01',
          deadline: '2024-02-20',
          positions_available: 10,
          positions_filled: 4,
          min_age: 21,
          benefits: ['Training in child rights', 'Field experience', 'Certificate'],
          status: 'active',
          views: 120,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'CRY - Child Rights and You',
            logo_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150',
            city: 'Kolkata',
            state: 'West Bengal',
            rating: 4.7
          }
        },
        {
          id: '3',
          organization_id: '3',
          title: 'Wildlife Conservation Volunteer',
          description: 'Participate in wildlife conservation projects and awareness campaigns across India.',
          requirements: ['Interest in wildlife conservation', 'Physical fitness', 'Willingness to travel'],
          responsibilities: ['Field surveys', 'Data collection', 'Community awareness', 'Report writing'],
          skills_required: ['Research', 'Communication', 'Field work'],
          category: 'Environment',
          subcategory: 'Wildlife Conservation',
          location: 'Various national parks and sanctuaries',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          is_remote: false,
          latitude: 28.6139,
          longitude: 77.2090,
          time_commitment: 'Flexible',
          duration: '3 months',
          start_date: '2024-02-15',
          end_date: '2024-05-15',
          deadline: '2024-02-01',
          positions_available: 20,
          positions_filled: 8,
          min_age: 20,
          benefits: ['Field experience', 'Conservation training', 'Networking with experts'],
          status: 'active',
          views: 200,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'WWF India',
            logo_url: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=150',
            city: 'New Delhi',
            state: 'Delhi',
            rating: 4.6
          }
        },
        {
          id: '4',
          organization_id: '4',
          title: 'Elderly Care Companion',
          description: 'Spend time with elderly citizens, help them with daily tasks, and provide companionship.',
          requirements: ['Patience and empathy', 'Respect for elders', 'Basic first aid knowledge'],
          responsibilities: ['Visit elderly at home', 'Assist with daily tasks', 'Provide companionship', 'Organize activities'],
          skills_required: ['Empathy', 'Communication', 'Patience'],
          category: 'Elderly Care',
          subcategory: 'Companionship',
          location: 'Senior citizen homes in Delhi',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          is_remote: false,
          latitude: 28.5450,
          longitude: 77.1630,
          time_commitment: '5 hours/week',
          duration: '6 months',
          start_date: '2024-02-01',
          end_date: '2024-08-01',
          deadline: '2024-01-20',
          positions_available: 40,
          positions_filled: 18,
          min_age: 18,
          benefits: ['Training in elderly care', 'Certificate', 'Community service'],
          status: 'active',
          views: 180,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'HelpAge India',
            logo_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150',
            city: 'New Delhi',
            state: 'Delhi',
            rating: 4.5
          }
        },
        {
          id: '5',
          organization_id: '5',
          title: 'Youth Mentor',
          description: 'Mentor children living in shelter homes and help them with education and life skills.',
          requirements: ['Patience and empathy', 'Weekend availability', 'Background check clearance'],
          responsibilities: ['Weekly mentoring sessions', 'Academic support', 'Life skills training', 'Emotional support'],
          skills_required: ['Mentoring', 'Communication', 'Empathy'],
          category: 'Youth Development',
          subcategory: 'Mentoring',
          location: 'Shelter homes in Kochi',
          city: 'Kochi',
          state: 'Kerala',
          country: 'India',
          is_remote: false,
          latitude: 9.9312,
          longitude: 76.2673,
          time_commitment: '4 hours/weekend',
          duration: '1 year',
          start_date: '2024-02-01',
          end_date: '2025-02-01',
          deadline: '2024-01-25',
          positions_available: 25,
          positions_filled: 12,
          min_age: 20,
          benefits: ['Mentorship training', 'Personal growth', 'Making a difference'],
          status: 'active',
          views: 160,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Make A Difference (MAD)',
            logo_url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=150',
            city: 'Kochi',
            state: 'Kerala',
            rating: 4.7
          }
        },
        {
          id: '6',
          organization_id: '6',
          title: 'Clothing Drive Volunteer',
          description: 'Organize clothing collection drives and help sort and distribute clothes to those in need.',
          requirements: ['Organizational skills', 'Physical ability to lift boxes', 'Team player'],
          responsibilities: ['Organize collection drives', 'Sort and pack clothes', 'Coordinate distribution', 'Maintain records'],
          skills_required: ['Organization', 'Teamwork', 'Communication'],
          category: 'Social Welfare',
          subcategory: 'Clothing',
          location: 'Delhi NCR',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          is_remote: false,
          latitude: 28.5355,
          longitude: 77.2890,
          time_commitment: '8 hours/week',
          duration: '3 months',
          start_date: '2024-02-01',
          end_date: '2024-05-01',
          deadline: '2024-01-25',
          positions_available: 30,
          positions_filled: 10,
          min_age: 18,
          benefits: ['Community service experience', 'Certificate', 'Networking'],
          status: 'active',
          views: 140,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Goonj',
            logo_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150',
            city: 'New Delhi',
            state: 'Delhi',
            rating: 4.8
          }
        },
        {
          id: '7',
          organization_id: '7',
          title: 'Disability Support Volunteer',
          description: 'Assist persons with disabilities in their daily activities and help them access resources.',
          requirements: ['Understanding of disability issues', 'Patience and empathy', 'Basic sign language (preferred)'],
          responsibilities: ['Assist with daily activities', 'Help access resources', 'Provide companionship', 'Organize events'],
          skills_required: ['Empathy', 'Communication', 'Patience'],
          category: 'Disability Support',
          subcategory: 'Daily Living Support',
          location: 'Bangalore',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          is_remote: false,
          latitude: 12.9716,
          longitude: 77.5946,
          time_commitment: '6 hours/week',
          duration: '6 months',
          start_date: '2024-02-15',
          end_date: '2024-08-15',
          deadline: '2024-02-01',
          positions_available: 20,
          positions_filled: 7,
          min_age: 20,
          benefits: ['Disability awareness training', 'Certificate', 'Meaningful work'],
          status: 'active',
          views: 130,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Samarthanam Trust',
            logo_url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=150',
            city: 'Bangalore',
            state: 'Karnataka',
            rating: 4.6
          }
        },
        {
          id: '8',
          organization_id: '8',
          title: 'Literacy Volunteer',
          description: 'Help children improve their reading and writing skills through one-on-one tutoring sessions.',
          requirements: ['Basic education', 'Patience with children', 'Weekend availability'],
          responsibilities: ['Conduct reading sessions', 'Assess literacy levels', 'Track progress', 'Prepare learning materials'],
          skills_required: ['Teaching', 'Patience', 'Communication'],
          category: 'Education',
          subcategory: 'Literacy',
          location: 'Community centers in Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          is_remote: false,
          latitude: 19.1156,
          longitude: 72.8296,
          time_commitment: '4 hours/week',
          duration: '6 months',
          start_date: '2024-02-01',
          end_date: '2024-08-01',
          deadline: '2024-01-25',
          positions_available: 30,
          positions_filled: 15,
          min_age: 18,
          benefits: ['Certificate of appreciation', 'Teaching experience', 'Community impact'],
          status: 'active',
          views: 170,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Pratham Education Foundation',
            logo_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150',
            city: 'Mumbai',
            state: 'Maharashtra',
            rating: 4.9
          }
        },
        {
          id: '9',
          organization_id: '9',
          title: 'Women Empowerment Volunteer',
          description: 'Support women in need through counseling, skill development, and legal assistance.',
          requirements: ['Understanding of women\'s issues', 'Counseling skills (preferred)', 'Empathy and patience'],
          responsibilities: ['Counseling sessions', 'Skill development workshops', 'Legal assistance support', 'Awareness programs'],
          skills_required: ['Counseling', 'Communication', 'Empathy'],
          category: 'Social Welfare',
          subcategory: 'Women Empowerment',
          location: 'Ahmednagar',
          city: 'Ahmednagar',
          state: 'Maharashtra',
          country: 'India',
          is_remote: false,
          latitude: 19.0948,
          longitude: 74.7479,
          time_commitment: '15 hours/week',
          duration: '1 year',
          start_date: '2024-02-01',
          end_date: '2025-02-01',
          deadline: '2024-01-20',
          positions_available: 12,
          positions_filled: 5,
          min_age: 21,
          benefits: ['Counseling training', 'Social work experience', 'Certificate'],
          status: 'active',
          views: 150,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Snehalaya',
            logo_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
            city: 'Ahmednagar',
            state: 'Maharashtra',
            rating: 4.7
          }
        },
        {
          id: '10',
          organization_id: '10',
          title: 'Mid-Day Meal Volunteer',
          description: 'Help serve nutritious meals to school children and support the mid-day meal program.',
          requirements: ['Passion for child welfare', 'Physical fitness', 'Team player'],
          responsibilities: ['Assist in meal preparation', 'Serve meals to children', 'Maintain hygiene standards', 'Track meal distribution'],
          skills_required: ['Teamwork', 'Communication', 'Food Safety'],
          category: 'Child Welfare',
          subcategory: 'Child Nutrition',
          location: 'Government schools in Bangalore',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          is_remote: false,
          latitude: 12.9716,
          longitude: 77.5946,
          time_commitment: '4 hours/day',
          duration: '6 months',
          start_date: '2024-02-01',
          end_date: '2024-08-01',
          deadline: '2024-01-20',
          positions_available: 40,
          positions_filled: 20,
          min_age: 18,
          benefits: ['Certificate', 'Community service', 'Making a difference'],
          status: 'active',
          views: 190,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organizations: {
            name: 'Akshaya Patra Foundation',
            logo_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150',
            city: 'Bangalore',
            state: 'Karnataka',
            rating: 4.8
          }
        }
      ];

      let filtered = sampleOpportunities;

      // Apply filters
      if (category) {
        filtered = filtered.filter(opp => opp.category === category);
      }
      if (city) {
        filtered = filtered.filter(opp => opp.city === city);
      }
      if (state) {
        filtered = filtered.filter(opp => opp.state === state);
      }
      if (is_remote !== undefined) {
        filtered = filtered.filter(opp => opp.is_remote === (is_remote === 'true'));
      }
      if (search) {
        filtered = filtered.filter(opp => 
          opp.title.toLowerCase().includes(search.toLowerCase()) ||
          opp.description.toLowerCase().includes(search.toLowerCase()) ||
          opp.organizations?.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: { opportunities: filtered }
      });
    }
    
    let query = supabase
      .from('opportunities')
      .select(`
        *,
        organizations:organization_id (name, logo_url, city, state, rating)
      `)
      .eq('status', 'active');

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
    if (is_remote !== undefined) {
      query = query.eq('is_remote', is_remote === 'true');
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: opportunities, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: opportunities.length,
      data: { opportunities }
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Opportunity
exports.getOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .select(`
        *,
        organizations:organization_id (*)
      `)
      .eq('id', id)
      .single();

    if (error || !opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    // Increment view count
    await supabase
      .from('opportunities')
      .update({ views: opportunity.views + 1 })
      .eq('id', id);

    res.status(200).json({
      success: true,
      data: { opportunity }
    });
  } catch (error) {
    next(error);
  }
};

// Apply for Opportunity
exports.applyForOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cover_letter, motivation, availability } = req.body;

    // Check if opportunity exists
    const { data: opportunity, error: oppError } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (oppError || !opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    // Check if already applied
    const { data: existingApplication } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', req.user.userId)
      .eq('opportunity_id', id)
      .single();

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this opportunity'
      });
    }

    // Create application
    const { data: application, error } = await supabase
      .from('applications')
      .insert([{
        user_id: req.user.userId,
        opportunity_id: id,
        organization_id: opportunity.organization_id,
        cover_letter,
        motivation,
        availability
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Applications
exports.getUserApplications = async (req, res, next) => {
  try {
    const { status } = req.query;

    let query = supabase
      .from('applications')
      .select(`
        *,
        opportunities:opportunity_id (*),
        organizations:organization_id (name, logo_url)
      `)
      .eq('user_id', req.user.userId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: applications, error } = await query.order('applied_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: applications.length,
      data: { applications }
    });
  } catch (error) {
    next(error);
  }
};