import { useDispatch, useSelector } from 'react-redux';
import ColorTabs from './MUIColoredTab';
import { selectIsLoading, selectUsername } from 'redux/Auth/authSelectors';
import { logoutUserThunk } from 'redux/Auth/authOperations';

const Navigation = () => {
  const username = useSelector(selectUsername);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleLogoutBtnClick = () => {
    dispatch(logoutUserThunk());
  };
  return (
    <header className="flex items-center justify-between pr-16 pl-16">
      <ColorTabs />
      {username && (
        <div className="flex min-w-max gap-8 items-center">
          <p className="text-3xl font-bold">
            Welcome,{' '}
            <span className="text-purple-600 animate-pulse">{username}</span>!
          </p>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogoutBtnClick}
            disabled={loading}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;
