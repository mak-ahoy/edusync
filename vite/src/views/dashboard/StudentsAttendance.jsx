import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; // Example chart library

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'; // Example icon

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// Example attendance data (replace with your actual data)
const attendanceData = [
  { name: 'Monday', attendance: 85 },
  { name: 'Tuesday', attendance: 90 },
  { name: 'Wednesday', attendance: 92 },
  { name: 'Thursday', attendance: 88 },
  { name: 'Friday', attendance: 86 },
];

// ==============================|| DASHBOARD - ATTENDANCE TRACKER CARD ||============================== //

const AttendanceTrackerCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              Attendance Tracker
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500', mt: 1 }}>
              Monitor student attendance and participation.
            </Typography>
            <Box sx={{ mt: 3 }}>
              {/* Example chart */}
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill={theme.palette.primary.main} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            {/* Example content for the icon and attendance details */}
            <List sx={{ py: 2 }}>
              <ListItem alignItems="center" disableGutters>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: 'warning.light',
                      color: 'warning.dark',
                    }}
                  >
                    <TableChartOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h4">Total Attendance</Typography>}
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.5 }}>
                      Average: 88%
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

AttendanceTrackerCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default AttendanceTrackerCard;
