
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import ChatApp from './pages/ChatApp';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Registration from './pages/Registration';
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/explore" element={<Explore />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/cart" element={<Cart />} /> 
            {/* <Route path="/chat" element={<ChatPage />} /> */}
            <Route path="/chat" element={<ChatApp />} />
        </Routes>
    );
};

export default App;