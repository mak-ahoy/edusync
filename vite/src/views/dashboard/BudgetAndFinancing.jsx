import React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Use a light background color
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.secondary.light} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.secondary.light} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const data = [
  { name: 'Housing', value: 30 },
  { name: 'Utilities', value: 10 },
  { name: 'Food', value: 15 },
  { name: 'Transportation', value: 10 },
  { name: 'Health', value: 5 },
  { name: 'Insurance', value: 15 },
  { name: 'Debt', value: 5 },
  { name: 'Savings', value: 10 },
  { name: 'Personal', value: 5 },
  { name: 'Recreation', value: 5 },
  { name: 'Miscellaneous', value: 5 }
];

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2', 
  '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00', '#D2691E', '#FF7F50'
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black" // Use black text color for better visibility
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${data[index].name}`}
    </text>
  );
};

// ==============================|| DASHBOARD - BUDGET AND FINANCING CARD ||============================== //

const BudgetAndFinancing = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                Budget and Financing
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                Budget Allocation
              </Typography>
              <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={renderCustomLabel}
                    outerRadius="80%"
                    innerRadius="60%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </CardWrapper>
      )}
    </>
  );
};

BudgetAndFinancing.propTypes = {
  isLoading: PropTypes.bool
};

export default BudgetAndFinancing;
