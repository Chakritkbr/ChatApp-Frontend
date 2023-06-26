import { UserContextProvider } from './UserContext.jsx';
import Routes from './Routes.jsx';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_API}`;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
