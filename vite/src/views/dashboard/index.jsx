import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import LessonReminder from './LessonReminder';
import RightBar from './RightBar';
import StudentPerformance from './StudentPerformance';
import ResourceCenter from './ResourceCenter';
import StudentsAttendance from './StudentsAttendance';
import TaskList from './TaskList';
import BudgetAndFinancing from './BudgetAndFinancing';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      {/* Left Side */}
      <Grid item xs={12} lg={8}>
        <Grid container spacing={gridSpacing}>
          {/* Lesson Reminder */}
          <Grid item lg={6} md={6} sm={12} xs={12} style={{ display: 'flex' }}>
            <LessonReminder isLoading={isLoading} style={{ width: '100%', height: '100%' }} />
          </Grid>
          {/* Student Performance */}
          <Grid item lg={6} md={6} sm={12} xs={12} style={{ display: 'flex' }}>
            <StudentPerformance isLoading={isLoading} style={{ width: '100%', height: '100%' }} />
          </Grid>
          {/* Resource Center */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ResourceCenter isLoading={isLoading} />
          </Grid>
          {/* Task List */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TaskList isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} lg={4}>
        <Grid container spacing={gridSpacing}>
          {/* Calender */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <RightBar isLoading={isLoading} />
          </Grid>
          {/* Students Attendance */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <StudentsAttendance isLoading={isLoading} />
          </Grid>
          {/* Budget And Financing */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <BudgetAndFinancing isLoading={isLoading} />
          </Grid>
   
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
