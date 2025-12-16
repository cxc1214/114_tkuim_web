import React from 'react';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', color: 'var(--pixel-text)' }}>
            <h1 style={{
                textShadow: '4px 4px var(--pixel-primary)',
                fontSize: '3rem',
                marginBottom: '40px'
            }}>
                MATH QUEST
            </h1>

            <PixelCard>
                <p style={{ lineHeight: '2' }}>
                    DEFEAT THE BOSSES BY SOLVING MATH PROBLEMS!
                </p>
                <br />
                <PixelButton
                    onClick={() => navigate('/game')}
                    style={{ width: '100%', fontSize: '1.5rem' }}
                >
                    PRESS START
                </PixelButton>
            </PixelCard>
        </div>
    );
};

export default Home;
