import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

export const Bomb31 = ({ onBack }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNum, setCurrentNum] = useState(0);
    const [exploded, setExploded] = useState(false);

    const startGame = () => {
        setCurrentNum(0);
        setIsPlaying(true);
        setExploded(false);
    };

    const handleTap = (amount) => {
        const nextNum = currentNum + amount;
        if (nextNum >= 31) {
            setCurrentNum(31);
            setExploded(true);
            if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
        } else {
            setCurrentNum(nextNum);
            if (navigator.vibrate) navigator.vibrate(50);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className={`container flex-center`} style={{ padding: '1rem', height: '100dvh' }}>
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
                        <Flame size={64} className="text-gradient-primary" style={{ marginBottom: '1rem' }} />
                        <h2 className="title-main" style={{ fontSize: '3rem' }}>{t('menu.game_31bomb')}</h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                            {t('bomb31.rules')}
                        </p>
                        <button onClick={startGame} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none' }}>
                            {t('common.start')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : exploded ? (
                    <motion.div
                        key="boom"
                        initial={{ scale: 0, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        className="flex-center"
                        style={{ flex: 1, width: '100%', background: 'rgba(255,51,102,0.2)', borderRadius: '32px', border: '2px solid var(--accent-primary)' }}
                    >
                        <h1 style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--accent-primary)', textShadow: '0 0 20px var(--accent-primary)' }}>
                            {t('bomb31.boom')}
                        </h1>
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
                            {t('bomb31.fail_message')}
                        </h2>
                        <button onClick={startGame} style={{ background: 'white', color: 'var(--accent-primary)' }}>
                            {t('common.start')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="play"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="flex-center"
                        style={{ flex: 1, width: '100%' }}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '4px' }}>
                                {t('bomb31.current_number')}
                            </p>
                            <motion.h1
                                key={currentNum}
                                initial={{ scale: 1.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    fontSize: '8rem',
                                    fontWeight: 900,
                                    margin: 0,
                                    color: currentNum > 25 ? 'var(--accent-primary)' : 'white'
                                }}
                            >
                                {currentNum}
                            </motion.h1>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => handleTap(1)} style={{ fontSize: '2rem', padding: '1rem', background: 'var(--glass-highlight)' }}>
                                {t('bomb31.tap_1')}
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => handleTap(2)} style={{ fontSize: '2rem', padding: '1rem', background: 'var(--glass-highlight)' }}>
                                {t('bomb31.tap_2')}
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => handleTap(3)} style={{ fontSize: '2rem', padding: '1rem', background: 'var(--glass-highlight)' }}>
                                {t('bomb31.tap_3')}
                            </motion.button>
                        </div>

                        <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
