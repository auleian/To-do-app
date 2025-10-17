import { NavLink } from 'react-router-dom';
import { navigationConfig } from '../config/navigation';

const Sidebar = () => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
          <span className="fs-5 d-none d-sm-inline sidebar-title">Menu</span>
        </a>
        
        <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          {navigationConfig.map((item, index) => (
            <li key={index} className="nav-item w-100">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link align-middle px-0 ${isActive ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                <span className="ms-1 d-none d-sm-inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;