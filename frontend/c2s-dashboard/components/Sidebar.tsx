import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div style={{
      width: '200px',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
    }}>
      <h2>Menu</h2>
      <ul>
        <li style={{ marginBottom: '10px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
            Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link href="/ai-pipeline" style={{ textDecoration: 'none', color: 'black' }}>
            AI Pipeline
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link href="/process-history" style={{ textDecoration: 'none', color: 'black' }}>
            Process History
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
