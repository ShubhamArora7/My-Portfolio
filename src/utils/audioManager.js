/**
 * Simple Global Audio Manager for background music
 */

let bgMusicAudio = null;
let isMuted = false;

// Initialize background music
export const initAudio = () => {
    if (typeof window === 'undefined') return;
    if (!bgMusicAudio) {
        // We use the file provided by the user in public/sounds/
        bgMusicAudio = new Audio('/sounds/cfl_turningpages-belem-breeze-487596.ogg');
        bgMusicAudio.preload = 'auto'; // Force browser to fetch data immediately
        bgMusicAudio.loop = true;
        bgMusicAudio.volume = 0.3; // Default volume for background cozy music

        // Trigger background load
        bgMusicAudio.load();
    }
};

export const playBackgroundMusic = () => {
    initAudio();
    if (bgMusicAudio && bgMusicAudio.paused) {
        // Only play if not muted and it's currently paused
        bgMusicAudio.play().catch((err) => {
            console.warn('Audio play failed/blocked by browser:', err);
        });
    }
};

export const pauseBackgroundMusic = () => {
    if (bgMusicAudio && !bgMusicAudio.paused) {
        bgMusicAudio.pause();
    }
};

export const toggleMute = () => {
    isMuted = !isMuted;
    if (bgMusicAudio) {
        bgMusicAudio.muted = isMuted;
    }
    return isMuted;
};

export const getIsMuted = () => isMuted;

export const setMusicVolume = (vol) => {
    if (bgMusicAudio) {
        bgMusicAudio.volume = Math.max(0, Math.min(1, vol));
    }
};

export const getMusicVolume = () => {
    return bgMusicAudio ? bgMusicAudio.volume : 0.3;
};
