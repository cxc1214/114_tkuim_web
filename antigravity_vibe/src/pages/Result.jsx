import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, totalRounds } = location.state || { score: 0, totalRounds: 10 };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--pixel-accent)', textShadow: '4px 4px var(--pixel-shadow)' }}>
                GAME OVER
            </h1>

            <PixelCard>
                <p>FINAL SCORE</p>
                <h2 style={{ fontSize: '3rem', margin: '20px 0', color: 'var(--pixel-primary)' }}>
                    {score}
                </h2>
                <p>MAX POSSIBLE: {totalRounds * 100}</p>
            </PixelCard>

            <div style={{ marginTop: '40px' }}>
                <PixelButton onClick={() => navigate('/')} variant="accent">
                    TRY AGAIN
                </PixelButton>
            </div>
        </div>
    );
};

export default Result;
