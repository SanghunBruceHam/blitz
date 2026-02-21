import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Dices } from 'lucide-react';

export const VibeVote = ({ onBack }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const [consequence, setConsequence] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);

    const startGame = () => {
        setIsPlaying(true);
        nextQuestion();
    };

    const nextQuestion = () => {
        const prompts = t('vibevote.prompts', { returnObjects: true });
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setCurrentPrompt(randomPrompt);
        setShowSpinner(false);
        setIsSpinning(false);
    };

    const spinWheel = () => {
        setIsSpinning(true);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        // Simulate spinning delay
        setTimeout(() => {
            const consequences = t('vibevote.consequences', { returnObjects: true });
            const randomConsequence = consequences[Math.floor(Math.random() * consequences.length)];
            setConsequence(randomConsequence);
            setIsSpinning(false);
            setShowSpinner(true);
            if (navigator.vibrate) navigator.vibrate([500]);
        }, 2000); // 2 second spin
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="container flex-center" style={{ padding: '1rem', height: '100dvh' }}>
            <AnimatePresence mode="wait">
                {!isPlaying ? (
                    <motion.div
                        key="start"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="flex-center glass-card"
                        style={{ flex: 1, justifyContent: 'center' }}
                    >
                        <Users size={64} className="text-gradient-primary" style={{ marginBottom: '1rem' }} />
                        <h2 className="title-main" style={{ fontSize: '3rem' }}>{t('menu.game_vibevote')}</h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                            {t('vibevote.rules')}
                        </p>
                        <button onClick={startGame} style={{ background: 'var(--accent-warn)', color: '#000', border: 'none' }}>
                            {t('common.start')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : !showSpinner && !isSpinning ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex-center"
                        style={{ flex: 1, width: '100%' }}
                    >
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                            <h2 style={{
                                fontSize: '3rem',
                                textAlign: 'center',
                                color: 'var(--accent-warn)',
                                fontWeight: 900,
                                textShadow: '0 0 20px rgba(255, 204, 0, 0.3)',
                                lineHeight: 1.2
                            }}>
                                "{currentPrompt}"
                            </h2>
                        </div>

                        <button
                            onClick={spinWheel}
                            style={{ background: 'var(--glass-highlight)' }}
                        >
                            <Dices size={24} color="var(--accent-warn)" />
                            {t('vibevote.spin_wheel')}
                        </button>
                        <button onClick={nextQuestion} style={{ background: 'transparent', borderBottom: '2px solid var(--accent-warn)' }}>
                            {t('vibevote.next_question')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : isSpinning ? (
                    <motion.div
                        key="spinning"
                        className="flex-center"
                        style={{ flex: 1, width: '100%' }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                        >
                            <Dices size={100} color="var(--accent-warn)" />
                        </motion.div>
                        <h2 style={{ marginTop: '2rem', color: 'var(--accent-warn)', letterSpacing: '4px' }}>
                            SPINNING...
                        </h2>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                        className="flex-center glass-card"
                        style={{ flex: 1, width: '100%', borderColor: 'var(--accent-warn)' }}
                    >
                        <h2 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            LOSER MUST...
                        </h2>
                        <h1 style={{
                            fontSize: '4rem',
                            textAlign: 'center',
                            color: 'var(--accent-warn)',
                            fontWeight: 900,
                            marginBottom: '3rem',
                            lineHeight: 1.1
                        }}>
                            {consequence}
                        </h1>

                        <button onClick={nextQuestion} style={{ background: 'var(--accent-warn)', color: 'black' }}>
                            {t('vibevote.next_question')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
