import React from 'react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <h2>Company Admin Panel</h2>
    </header>
  );
};

export default Topbar;