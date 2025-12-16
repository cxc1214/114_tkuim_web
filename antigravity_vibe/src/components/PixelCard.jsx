import React from 'react';

const PixelCard = ({ children, style }) => {
    return (
        <div style={{
            border: '4px solid var(--pixel-shadow)',
            backgroundColor: '#523354', // Card bg
            padding: '20px',
            margin: '10px 0',
            boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
            ...style
        }}>
            {children}
        </div>
    );
};

export default PixelCard;
