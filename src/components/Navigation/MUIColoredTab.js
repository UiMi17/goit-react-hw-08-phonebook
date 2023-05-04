import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ColorTabs() {
  const [value, setValue] = useState('contacts');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/contacts':
        setValue('contacts');
        break;

      case '/login':
        setValue('login');
        break;

      case '/register':
        setValue('register');
        break;

      default:
        break;
    }
  }, [location.pathname]);

  const handleChange = event => {
    switch (event.target.textContent) {
      case 'Contacts':
        navigate('/contacts');
        break;

      case 'Login':
        navigate('/login');
        break;

      case 'Sign Up':
        navigate('/register');
        break;

      default:
        break;
    }
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="Navigation links"
      >
        <Tab value="contacts" label="Contacts" />
        <Tab value="login" label="Login" />
        <Tab value="register" label="Sign Up" />
      </Tabs>
    </Box>
  );
}
