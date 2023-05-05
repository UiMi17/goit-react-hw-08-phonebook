import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsOnline } from 'redux/Auth/authSelectors';
import { nanoid } from 'nanoid';

export default function ColorTabs() {
  const [value, setValue] = useState('login');
  const [navButtons, setNavButtons] = useState([]);
  const navigate = useNavigate();
  const isOnline = useSelector(selectIsOnline);

  useEffect(() => {
    if (isOnline) {
      setNavButtons([{ value: 'contacts', label: 'Contacts' }]);
      setValue('contacts');
    } else {
      setNavButtons([
        { value: 'login', label: 'Login' },
        { value: 'register', label: 'Sign Up' },
      ]);
      setValue('login');
    }
  }, [isOnline]);

  const handleChange = event => {
    switch (event.target.textContent) {
      case 'Contacts':
        setValue('contacts');
        navigate('/contacts');
        break;

      case 'Login':
        setValue('login');
        navigate('/login');
        break;

      case 'Sign Up':
        setValue('register');
        navigate('/register');
        break;

      default:
        setValue('login');
        navigate('/login');
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
        {navButtons.map(({ value, label }) => {
          return <Tab key={nanoid()} value={value} label={label} />;
        })}
      </Tabs>
    </Box>
  );
}
