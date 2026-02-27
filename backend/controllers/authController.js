// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/database');
require('dotenv').config();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register User
exports.register = async (req, res, next) => {
  try {
    const { email, password, full_name, phone, bio, location, skills, interests } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()
      .catch(() => ({ data: null }));

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Registration attempt for:', email);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([{
        email,
        password_hash: hashedPassword, // corrected column
        full_name,
        phone,
        bio,
        location,
        skills: skills || [],
        interests: interests || []
      }])
      .select()
      .single();

    if (error) throw error;

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          bio: user.bio,
          location: user.location,
          skills: user.skills,
          interests: user.interests,
          avatar_url: user.avatar_url,
          total_hours: user.total_hours,
          total_opportunities: user.total_opportunities,
          is_verified: user.is_verified
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Demo login for development without DB
    if (process.env.SUPABASE_URL.includes('placeholder')) {
      if (email === 'demo@volunteerhub.com' && password === 'demo123') {
        const demoUser = {
          id: 'demo-user-id',
          email: 'demo@volunteerhub.com',
          full_name: 'Priya Sharma',
          phone: '+91-9876543210',
          bio: 'Passionate about making a difference in my community.',
          location: 'Mumbai, Maharashtra',
          skills: ['Teaching', 'Communication', 'Event Planning', 'Social Media', 'Mentoring'],
          interests: ['Education', 'Environment', 'Child Welfare', 'Youth Development', 'Women Empowerment'],
          avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
          total_hours: 45,
          total_opportunities: 8,
          is_verified: true
        };

        const token = generateToken(demoUser.id);

        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: { user: demoUser, token }
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Use demo@volunteerhub.com / demo123'
      });
    }

    // Check if user exists
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      console.log('Supabase query error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database error'
      });
    }

    if (!data || data.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = data[0]; // first row

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash); // corrected field
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          bio: user.bio,
          location: user.location,
          skills: user.skills,
          interests: user.interests,
          avatar_url: user.avatar_url,
          total_hours: user.total_hours,
          total_opportunities: user.total_opportunities,
          is_verified: user.is_verified
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// Get Current User
exports.getMe = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update User Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { full_name, phone, bio, location, skills, interests } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({
        full_name,
        phone,
        bio,
        location,
        skills,
        interests
      })
      .eq('id', req.user.userId)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};