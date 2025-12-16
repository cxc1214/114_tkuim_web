import React from 'react';

const Layout = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: '600px', // Mobile-focused constraint
            margin: '0 auto',
            padding: '20px',
            justifyContent: 'center',
            borderLeft: '4px solid var(--pixel-shadow)',
            borderRight: '4px solid var(--pixel-shadow)',
            backgroundColor: '#3b213c' // Slightly lighter than bg
        }}>
            {children}
        </div>
    );
};

export default Layout;
