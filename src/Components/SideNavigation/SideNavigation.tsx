import { useDispatch } from "react-redux";
import { logout } from "../../features/Login/LoginSlice";
import { useNavigate } from "react-router";
import dashboard from '../../assets/dashboard.svg';
import logoutImage from '../../assets/logout.svg';
import burger from '../../assets/burger.svg';

import './SideNavigation.css';

const SideNavigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate('/');
    }

    return (
        <div className='sideBar'>
            <img src={burger} alt='Menu' className='burger-menu' />
            <ul className='sideBarUl'>
                <li> <a href={void(0)}> <img src={dashboard} alt='dashboard' /> <span>Dashboard</span>  </a></li>
                <li onClick={handleLogout}> <a href={void(0)}> <img src={logoutImage} alt='logout' /> <span>Logout</span>  </a></li>
                
            </ul>
        </div>
    )
};

export default SideNavigation;