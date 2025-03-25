import React from 'react';
import { FaHome, FaWallet, FaDiscord, FaTelegram, FaReddit } from 'react-icons/fa';
import { RiArrowLeftSLine } from 'react-icons/ri';

const NewSideNav = () => {
  return (
    <div
      style={{
        width: '250px',
        height: 'calc(100vh - 25px)',
        background: 'linear-gradient(180deg, #141E30, #243B55)', // Gradient background
        borderRadius: '15px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'inset 0 0 30px rgba(20, 30, 48, 0.8), inset 0 0 60px rgba(36, 59, 85, 0.5)',

      }}
    >
      {/* Top Section */}
      <div>
      <div style={{ marginBottom: '30px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img
    style={{ maxWidth: '100%', height: 'auto' }}
    src="https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png"
    alt="Logo"
  />
</div>

        {/* Menu Items */}
        <div>
          <SidebarItem icon={<FaHome />} label="Dashboard" />
          <SidebarItem icon={<FaWallet />} label="Your Wallet" isActive />
          <SidebarItem icon={<FaWallet />} label="Add Liquidity" />
          <SidebarItem icon={<FaWallet />} label="Manage Liquidity" />
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        {/* Social Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <SocialIcon icon={<FaTelegram />} />
          <SocialIcon icon={<FaDiscord />} />
          <SocialIcon icon={<FaReddit />} />
        </div>

        {/* Collapse Button */}
        <div style={{ textAlign: 'center', cursor: 'pointer' }}>
          <RiArrowLeftSLine size={24} color="#fff" />
          <span style={{ color: '#fff', marginLeft: '5px', fontFamily: '"Airbnbcereal", sans-serif' }}>
            Collapse Sidebar
          </span>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isActive ? 'rgba(91, 193, 253, 0.2)' : 'transparent',
      borderRadius: '10px',
      padding: '10px 15px',
      marginBottom: '10px',
      cursor: 'pointer',
      color: isActive ? '#5BC1FD' : '#ffffff',
      fontWeight: isActive ? 'bold' : 'normal',
    }}
  >
    <span style={{ marginRight: '10px', fontSize: '18px' }}>{icon}</span>
    <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>{label}</span>
  </div>
);

const SocialIcon = ({ icon }) => (
  <div
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {icon}
  </div>
);

export default NewSideNav;
