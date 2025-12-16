import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import { generateQuestion } from '../utils/mathGenerator';

const Game = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [bossImage, setBossImage] = useState('');
    const [shake, setShake] = useState(false); // Visual feedback

    const TOTAL_ROUNDS = 10;

    useEffect(() => {
        // Initial Load
        nextRound();
    }, []);

    const nextRound = () => {
        if (round > TOTAL_ROUNDS) {
            endGame();
            return;
        }
        // New Boss
        const seed = Math.random().toString(36).substring(7);
        setBossImage(`https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`);
        // New Question
        setQuestion(generateQuestion());
    };

    const handleAnswer = (selectedOption) => {
        if (selectedOption === question.answer) {
            setScore(prev => prev + 100);
            // Visual feedback success?
            setRound(prev => prev + 1);
            nextRound();
        } else {
            // Wrong answer
            setShake(true);
            setTimeout(() => setShake(false), 500);
            // Maybe penalty?
            setRound(prev => prev + 1);
            nextRound();
        }
    };

    const endGame = () => {
        navigate('/result', { state: { score, totalRounds: TOTAL_ROUNDS } });
    };

    if (!question) return <div style={{ textAlign: 'center' }}>LOADING...</div>;

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                fontSize: '0.8rem'
            }}>
                <span>SCORE: {score}</span>
                <span>ROUND: {round}/{TOTAL_ROUNDS}</span>
            </div>

            <PixelCard style={{
                marginBottom: '20px',
                backgroundColor: '#7a444a',
                transform: shake ? 'translate(5px, 0)' : 'none',
                transition: 'transform 0.1s'
            }}>
                <img
                    src={bossImage}
                    alt="Boss"
                    style={{ width: '120px', height: '120px', imageRendering: 'pixelated' }}
                />
                <div style={{ marginTop: '20px', fontSize: '1.5rem' }}>
                    {question.text}
                </div>
            </PixelCard>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
            }}>
                {question.options.map((opt, idx) => (
                    <PixelButton
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        variant={idx % 2 === 0 ? 'primary' : 'secondary'}
                    >
                        {opt}
                    </PixelButton>
                ))}
            </div>
        </div>
    );
};

export default Game;
