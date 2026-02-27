const supabase = require('../config/database');

// Get User Dashboard Stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Check if Supabase is configured
    if (process.env.SUPABASE_URL.includes('placeholder')) {
      // Return sample data for demo user
      const demoData = {
        user: {
          id: 'demo-user-id',
          full_name: 'Priya Sharma',
          email: 'demo@volunteerhub.com',
          avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
          total_hours: 45,
          total_opportunities: 8,
          skills: ['Teaching', 'Communication', 'Event Planning', 'Social Media', 'Mentoring'],
          interests: ['Education', 'Environment', 'Child Welfare', 'Youth Development', 'Women Empowerment']
        },
        applicationStats: {
          total: 8,
          pending: 2,
          accepted: 3,
          rejected: 0,
          in_progress: 2,
          completed: 1
        },
        badges: [
          {
            id: '1',
            user_id: 'demo-user-id',
            badge_id: 'badge-1',
            earned_at: new Date().toISOString(),
            badges: {
              id: 'badge-1',
              name: 'First Step',
              description: 'Completed your first volunteer opportunity',
              icon_url: '🎯',
              category: 'milestone',
              requirement_type: 'opportunities',
              requirement_value: 1,
              color: '#10B981',
              is_active: true
            }
          },
          {
            id: '2',
            user_id: 'demo-user-id',
            badge_id: 'badge-2',
            earned_at: new Date().toISOString(),
            badges: {
              id: 'badge-2',
              name: 'Dedicated Volunteer',
              description: 'Completed 5 volunteer opportunities',
              icon_url: '⭐',
              category: 'milestone',
              requirement_type: 'opportunities',
              requirement_value: 5,
              color: '#F59E0B',
              is_active: true
            }
          },
          {
            id: '3',
            user_id: 'demo-user-id',
            badge_id: 'badge-3',
            earned_at: new Date().toISOString(),
            badges: {
              id: 'badge-3',
              name: 'Time Giver',
              description: 'Contributed 10+ hours of volunteering',
              icon_url: '⏰',
              category: 'hours',
              requirement_type: 'hours',
              requirement_value: 10,
              color: '#3B82F6',
              is_active: true
            }
          },
          {
            id: '4',
            user_id: 'demo-user-id',
            badge_id: 'badge-4',
            earned_at: new Date().toISOString(),
            badges: {
              id: 'badge-4',
              name: 'Education Hero',
              description: 'Completed 3 education-related volunteering opportunities',
              icon_url: '📚',
              category: 'category',
              requirement_type: 'education',
              requirement_value: 3,
              color: '#0EA5E9',
              is_active: true
            }
          }
        ],
        recentProgress: [
          {
            id: '1',
            user_id: 'demo-user-id',
            opportunity_id: '1',
            organization_id: '1',
            hours_contributed: 25.5,
            tasks_completed: 15,
            start_date: '2024-01-15',
            end_date: '2024-02-15',
            status: 'completed',
            feedback: 'Excellent dedication and patience with children. The students showed significant improvement under her guidance.',
            rating: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            opportunities: {
              title: 'Literacy Volunteer'
            },
            organizations: {
              name: 'Pratham Education Foundation'
            }
          },
          {
            id: '2',
            user_id: 'demo-user-id',
            opportunity_id: '3',
            organization_id: '3',
            hours_contributed: 12.0,
            tasks_completed: 8,
            start_date: '2024-01-20',
            end_date: null,
            status: 'in_progress',
            feedback: null,
            rating: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            opportunities: {
              title: 'Climate Action Campaigner'
            },
            organizations: {
              name: 'WWF India'
            }
          },
          {
            id: '3',
            user_id: 'demo-user-id',
            opportunity_id: '4',
            organization_id: '4',
            hours_contributed: 7.5,
            tasks_completed: 5,
            start_date: '2024-01-10',
            end_date: '2024-01-25',
            status: 'completed',
            feedback: 'Very compassionate and caring. The elderly residents loved her company.',
            rating: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            opportunities: {
              title: 'Elderly Care Companion'
            },
            organizations: {
              name: 'HelpAge India'
            }
          }
        ],
        upcomingSchedules: [
          {
            id: '1',
            user_id: 'demo-user-id',
            date: '2024-02-01',
            opportunity_id: '3',
            task_title: 'Social Media Campaign Planning',
            task_description: 'Plan and schedule posts for the week',
            start_time: '09:00:00',
            end_time: '11:00:00',
            status: 'completed',
            notes: 'Created content calendar for the week',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            user_id: 'demo-user-id',
            date: '2024-02-02',
            opportunity_id: '3',
            task_title: 'Community Outreach Event',
            task_description: 'Organize awareness event at local college',
            start_time: '14:00:00',
            end_time: '17:00:00',
            status: 'completed',
            notes: 'Successfully engaged 50+ students',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '3',
            user_id: 'demo-user-id',
            date: '2024-02-03',
            opportunity_id: '1',
            task_title: 'Reading Session',
            task_description: 'Conduct reading session with children',
            start_time: '10:00:00',
            end_time: '12:00:00',
            status: 'completed',
            notes: 'Children showed great progress',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '4',
            user_id: 'demo-user-id',
            date: '2024-02-04',
            opportunity_id: null,
            task_title: 'Volunteer Meeting',
            task_description: 'Monthly volunteer coordination meeting',
            start_time: '16:00:00',
            end_time: '17:30:00',
            status: 'scheduled',
            notes: 'Discuss upcoming opportunities',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '5',
            user_id: 'demo-user-id',
            date: '2024-02-05',
            opportunity_id: '3',
            task_title: 'Content Creation',
            task_description: 'Create educational content on climate change',
            start_time: '09:00:00',
            end_time: '12:00:00',
            status: 'scheduled',
            notes: 'Focus on local climate issues',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
      };

      return res.status(200).json({
        success: true,
        data: demoData
      });
    }

    // Get user info
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // Get applications count by status
    const { data: applications } = await supabase
      .from('applications')
      .select('status')
      .eq('user_id', userId);

    const applicationStats = {
      total: applications?.length || 0,
      pending: applications?.filter(a => a.status === 'pending').length || 0,
      accepted: applications?.filter(a => a.status === 'accepted').length || 0,
      rejected: applications?.filter(a => a.status === 'rejected').length || 0,
      in_progress: applications?.filter(a => a.status === 'in_progress').length || 0,
      completed: applications?.filter(a => a.status === 'completed').length || 0
    };

    // Get user badges
    const { data: userBadges } = await supabase
      .from('user_badges')
      .select(`
        *,
        badges:badge_id (*)
      `)
      .eq('user_id', userId);

    // Get recent progress
    const { data: recentProgress } = await supabase
      .from('user_progress')
      .select(`
        *,
        opportunities:opportunity_id (title),
        organizations:organization_id (name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Get upcoming schedules
    const { data: upcomingSchedules } = await supabase
      .from('daily_schedules')
      .select('*')
      .eq('user_id', userId)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          avatar_url: user.avatar_url,
          total_hours: user.total_hours,
          total_opportunities: user.total_opportunities,
          skills: user.skills,
          interests: user.interests
        },
        applicationStats,
        badges: userBadges || [],
        recentProgress: recentProgress || [],
        upcomingSchedules: upcomingSchedules || []
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Badges
exports.getUserBadges = async (req, res, next) => {
  try {
    const { data: userBadges } = await supabase
      .from('user_badges')
      .select(`
        *,
        badges:badge_id (*)
      `)
      .eq('user_id', req.user.userId)
      .order('earned_at', { ascending: false });

    // Get all available badges
    const { data: allBadges } = await supabase
      .from('badges')
      .select('*')
      .eq('is_active', true);

    res.status(200).json({
      success: true,
      data: {
        earnedBadges: userBadges || [],
        availableBadges: allBadges || []
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Progress
exports.getUserProgress = async (req, res, next) => {
  try {
    const { data: progress } = await supabase
      .from('user_progress')
      .select(`
        *,
        opportunities:opportunity_id (title, category, organization_id),
        organizations:organization_id (name, logo_url)
      `)
      .eq('user_id', req.user.userId)
      .order('created_at', { ascending: false });

    // Calculate progress statistics
    const totalHours = progress?.reduce((sum, p) => sum + (p.hours_contributed || 0), 0) || 0;
    const completedOpportunities = progress?.filter(p => p.status === 'completed').length || 0;
    const inProgressOpportunities = progress?.filter(p => p.status === 'in_progress').length || 0;

    res.status(200).json({
      success: true,
      data: {
        progress: progress || [],
        statistics: {
          totalHours,
          completedOpportunities,
          inProgressOpportunities
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Daily Schedule
exports.getUserSchedule = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;

    let query = supabase
      .from('daily_schedules')
      .select(`
        *,
        opportunities:opportunity_id (title, category)
      `)
      .eq('user_id', req.user.userId);

    if (start_date) {
      query = query.gte('date', start_date);
    }
    if (end_date) {
      query = query.lte('date', end_date);
    }

    const { data: schedules } = await query.order('date', { ascending: true });

    res.status(200).json({
      success: true,
      data: { schedules: schedules || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Create Schedule Item
exports.createSchedule = async (req, res, next) => {
  try {
    const { date, opportunity_id, task_title, task_description, start_time, end_time, notes } = req.body;

    const { data: schedule, error } = await supabase
      .from('daily_schedules')
      .insert([{
        user_id: req.user.userId,
        date,
        opportunity_id,
        task_title,
        task_description,
        start_time,
        end_time,
        notes
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: { schedule }
    });
  } catch (error) {
    next(error);
  }
};

// Update Schedule Item
exports.updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, opportunity_id, task_title, task_description, start_time, end_time, status, notes } = req.body;

    const { data: schedule, error } = await supabase
      .from('daily_schedules')
      .update({
        date,
        opportunity_id,
        task_title,
        task_description,
        start_time,
        end_time,
        status,
        notes
      })
      .eq('id', id)
      .eq('user_id', req.user.userId)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Schedule updated successfully',
      data: { schedule }
    });
  } catch (error) {
    next(error);
  }
};

// Delete Schedule Item
exports.deleteSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('daily_schedules')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.userId);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};