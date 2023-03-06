import logo from '../../assets/shoalLogo.svg';

import './Header.css';

const Header = () => {

    return (
        <div className="container-fluid">
            <div className="header">
                <img src={logo} alt="Shoal - A new sustainable way to save money" className="logo" />
                <a href="https://joinshoal.co.uk/join-our-waitlist/" target="_blank" className="buttonPrimary">
                    Join waitlist
                </a>
            </div>
        </div>
    )
};

export default Header;