import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Globe, Flame, Hand, Users } from 'lucide-react';
import { useState } from 'react';

export const MainMenu = ({ onSelectGame }) => {
    const { t, i18n } = useTranslation();
    const [showSettings, setShowSettings] = useState(false);

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'en' ? 'ko' : 'en';
        i18n.changeLanguage(nextLang);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="container flex-center" style={{ position: 'relative' }}>

            {/* Top Bar for Settings */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ position: 'absolute', top: '2rem', right: '1.5rem', zIndex: 10 }}
            >
                <button
                    onClick={toggleLanguage}
                    style={{
                        padding: '0.75rem',
                        width: 'auto',
                        borderRadius: '50%',
                        aspectRatio: '1',
                        margin: 0
                    }}
                >
                    <Globe size={24} color="var(--text-secondary)" />
                </button>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex-center"
                style={{ width: '100%', flex: 1 }}
            >
                <motion.h1 variants={itemVariants} className="title-main">
                    {t('menu.title')}
                </motion.h1>

                <motion.p variants={itemVariants} className="subtitle-main">
                    {t('menu.subtitle')}
                </motion.p>

                <motion.div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('bomb31')}
                        style={{ borderLeft: '4px solid var(--accent-primary)' }}
                    >
                        <Flame size={28} color="var(--accent-primary)" />
                        {t('menu.game_31bomb')}
                    </motion.button>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('nunchitap')}
                        style={{ borderLeft: '4px solid var(--accent-secondary)' }}
                    >
                        <Hand size={28} color="var(--accent-secondary)" />
                        {t('menu.game_nunchitap')}
                    </motion.button>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('vibevote')}
                        style={{ borderLeft: '4px solid var(--accent-warn)' }}
                    >
                        <Users size={28} color="var(--accent-warn)" />
                        {t('menu.game_vibevote')}
                    </motion.button>

                </motion.div>
            </motion.div>
        </div>
    );
};
