import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// Project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Placeholder data for student progress
const studentProgressData = [
  { name: 'John Doe', grade: 'A', attendance: '95%' },
  { name: 'Jane Smith', grade: 'B+', attendance: '90%' },
  { name: 'Alice Johnson', grade: 'A-', attendance: '92%' },
];

// ==============================|| DASHBOARD - STUDENT PROGRESS CARD ||============================== //

const StudentProgressCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Student Progress</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {studentProgressData.map((student, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="body2">
                  {student.name} - Grade: {student.grade} - Attendance: {student.attendance}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

StudentProgressCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default StudentProgressCard;
