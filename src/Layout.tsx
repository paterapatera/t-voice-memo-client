import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { ReactNode, useState, SyntheticEvent } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArticleIcon from '@mui/icons-material/Article';
import {
  Link as RouterLink,
} from 'react-router-dom';

export function Layout({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('edit');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return <Box sx={{ pb: 7 }}>
    <Box sx={{ p: 1 }}>
      {children}
    </Box>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction component={RouterLink} to="/" label="Edit" value="edit" icon={<EditNoteIcon />} />
        <BottomNavigationAction component={RouterLink} to="/viewer" label="View" value="view" icon={<ArticleIcon />} />
      </BottomNavigation>
    </Paper>
  </Box>
}

