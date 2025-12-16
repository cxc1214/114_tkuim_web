import React from 'react';

const PixelButton = ({ onClick, children, variant = 'primary', style }) => {
    const getColors = () => {
        switch (variant) {
            case 'secondary': return 'var(--pixel-secondary)';
            case 'accent': return 'var(--pixel-accent)';
            default: return 'var(--pixel-primary)';
        }
    };

    const btnStyle = {
        backgroundColor: getColors(),
        color: '#fff',
        border: '4px solid var(--pixel-shadow)',
        padding: '15px 20px',
        fontSize: '1.2rem',
        fontFamily: 'inherit',
        textTransform: 'uppercase',
        boxShadow: '4px 4px 0px var(--pixel-shadow)',
        margin: '10px',
        position: 'relative',
        top: '0px',
        transition: 'all 0.1s',
        ...style
    };

    const handleMouseDown = (e) => {
        e.currentTarget.style.boxShadow = '0px 0px 0px var(--pixel-shadow)';
        e.currentTarget.style.top = '4px';
        e.currentTarget.style.left = '4px';
    };

    const handleMouseUp = (e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px var(--pixel-shadow)';
        e.currentTarget.style.top = '0px';
        e.currentTarget.style.left = '0px';
    };

    return (
        <button
            onClick={onClick}
            style={btnStyle}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {children}
        </button>
    );
};

export default PixelButton;
