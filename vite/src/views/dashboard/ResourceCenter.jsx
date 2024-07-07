import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import BookIcon from '@mui/icons-material/Book';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const ResourceItem = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  margin: theme.spacing(1),
}));

// ==============================|| DASHBOARD - RESOURCE CENTER CARD ||============================== //

const ResourceCenterCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              Resource Center
            </Typography>
            <Typography variant="body1" sx={{ color: 'primary.light', mt: 1 }}>
              Access teaching materials, lesson plans, and resources.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6} lg={4}>
                <ResourceItem>
                  <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Lesson Planner</Typography>
                    <Typography variant="body2">
                      Create and organize your lesson plans.
                    </Typography>
                  </Box>
                </ResourceItem>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ResourceItem>
                  <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                    <GradeIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Auto Grader</Typography>
                    <Typography variant="body2">
                      Automatically grade assignments and quizzes.
                    </Typography>
                  </Box>
                </ResourceItem>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ResourceItem>
                  <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                    <BookIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Reading Material</Typography>
                    <Typography variant="body2">
                      Provide reading materials for students.
                    </Typography>
                  </Box>
                </ResourceItem>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

ResourceCenterCard.propTypes = {
  isLoading: PropTypes.bool
};

export default ResourceCenterCard;
