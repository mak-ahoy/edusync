import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Placeholder data for tasks
const taskList = [
  { id: 1, task: 'Grade Math Homework', completed: false },
  { id: 2, task: 'Prepare Science Lessons', completed: false },
  { id: 3, task: 'Administrative Meeting at 2 PM', completed: false },
  { id: 4, task: 'Review Budget Proposals', completed: false },
];

// ==============================|| DASHBOARD - TASK LIST CARD ||============================== //

const TaskListCard = ({ isLoading }) => {
  const theme = useTheme();
  const [tasks, setTasks] = React.useState(taskList);
  const [newTask, setNewTask] = React.useState('');
  const [filter, setFilter] = React.useState('today');

  // Handle task completion toggle
  const handleTaskToggle = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle new task addition
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: tasks.length + 1,
        task: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Task List</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', p: '2px 4px', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              variant="outlined"
              size="small"
            />
            <IconButton color="primary" onClick={handleAddTask}>
              <AddIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => handleTaskToggle(task.id)}
                  />
                </ListItemIcon>
                <ListItemText primary={task.task} className={task.completed ? 'text-decoration-line-through' : ''} />
                <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
            <Divider />
          </List>
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Filter"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variant="outlined"
            size="small"
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </MainCard>
  );
};

TaskListCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TaskListCard;
