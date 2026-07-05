/**
 * Studio Content Data
 * 
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 * 
 * Platforms: 'youtube', 'blog', 'tiktok'
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'YouTube',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Blog',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '🎵',
        label: 'TikTok',
        shape: 'phone', // Vertical phone
    },
};

// Sample content data - replace with real content later
const RAW_CONTENT_DATA = [
    // ============ YouTube Videos ============
    {
        id: 'yt-001',
        platform: 'youtube',
        title: 'My Certifications',
        description: '',
        frontTexture: '/textures/studio/tvfront_certifications.webp',
        paintedFrontTexture: '/textures/studio/tvfront_certifications_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vi2CSJn-9_hjbmdaTTv6kUAmRcJipUOD?usp=sharing',
        date: '2026-07-05',
        views: '1.2K',
        duration: '15:32',
    },
    {
        id: 'yt-002',
        platform: 'youtube',
        title: 'Best Intern Award 2026 - PaulTech Pvt. Ltd',
        description: '',
        frontTexture: '/textures/studio/tvfront_bestintern.webp',
        paintedFrontTexture: '/textures/studio/tvfront_bestintern_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/file/d/1_gA1Y9HSYObbP_GuKpDtfw1a0wuDT-OX/view?usp=sharing',
        date: '2026-07-05',
        views: '1.5K',
        duration: '5:00',
    },
    {
        id: 'yt-003',
        platform: 'youtube',
        title: 'My Certifications',
        description: '',
        frontTexture: '/textures/studio/tvfront_certifications.webp',
        paintedFrontTexture: '/textures/studio/tvfront_certifications_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vi2CSJn-9_hjbmdaTTv6kUAmRcJipUOD?usp=sharing',
        date: '2026-07-05',
        views: '2.4K',
        duration: '22:10',
    },
    {
        id: 'yt-004',
        platform: 'youtube',
        title: 'Best Intern Award 2026 - PaulTech Pvt. Ltd',
        description: '',
        frontTexture: '/textures/studio/tvfront_bestintern.webp',
        paintedFrontTexture: '/textures/studio/tvfront_bestintern_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/file/d/1_gA1Y9HSYObbP_GuKpDtfw1a0wuDT-OX/view?usp=sharing',
        date: '2026-07-05',
        views: '1.5K',
        duration: '5:00',
    },
    {
        id: 'yt-005',
        platform: 'youtube',
        title: 'My Certifications',
        description: '',
        frontTexture: '/textures/studio/tvfront_certifications.webp',
        paintedFrontTexture: '/textures/studio/tvfront_certifications_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vi2CSJn-9_hjbmdaTTv6kUAmRcJipUOD?usp=sharing',
        date: '2026-07-05',
        views: '3.1K',
        duration: '20:15',
    },
    {
        id: 'yt-006',
        platform: 'youtube',
        title: 'Best Intern Award 2026 - PaulTech Pvt. Ltd',
        description: '',
        frontTexture: '/textures/studio/tvfront_bestintern.webp',
        paintedFrontTexture: '/textures/studio/tvfront_bestintern_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/file/d/1_gA1Y9HSYObbP_GuKpDtfw1a0wuDT-OX/view?usp=sharing',
        date: '2026-07-05',
        views: '1.5K',
        duration: '5:00',
    },
    {
        id: 'yt-007',
        platform: 'youtube',
        title: 'My Certifications',
        description: '',
        frontTexture: '/textures/studio/tvfront_certifications.webp',
        paintedFrontTexture: '/textures/studio/tvfront_certifications_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vi2CSJn-9_hjbmdaTTv6kUAmRcJipUOD?usp=sharing',
        date: '2026-07-05',
        views: '1.5K',
        duration: '30:22',
    },
    {
        id: 'yt-008',
        platform: 'youtube',
        title: 'My Certifications',
        description: '',
        frontTexture: '/textures/studio/tvfront_certifications.webp',
        paintedFrontTexture: '/textures/studio/tvfront_certifications_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vi2CSJn-9_hjbmdaTTv6kUAmRcJipUOD?usp=sharing',
        date: '2026-07-05',
        views: '1.9K',
        duration: '18:45',
    },

    // ============ Blog Posts ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'MY RESUME',
        description: 'Check out my professional background, skills, and experience.',
        frontTexture: '/textures/studio/monitorfront_resume.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_resume_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vumgGX_ts858eQGH99u_G6ONlaT94CBP?usp=drive_link',
        date: '2026-07-03',
        readTime: '2 min',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'Full Stack Web Developer Intern May 2026-June 2026 - PaulTech Software Services (OPC) Pvt. Ltd.',
        description: '',
        frontTexture: '/textures/studio/monitorfront_intern.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_intern_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1KwdW7LInzVV-FpeZDHzwxKVm499vXhe5?usp=drive_link',
        date: '2026-07-05',
        readTime: '3 min',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'MY RESUME',
        description: 'Check out my professional background, skills, and experience.',
        frontTexture: '/textures/studio/monitorfront_resume.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_resume_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vumgGX_ts858eQGH99u_G6ONlaT94CBP?usp=drive_link',
        date: '2026-07-03',
        readTime: '2 min',
    },
    {
        id: 'blog-004',
        platform: 'blog',
        title: 'Full Stack Web Developer Intern May 2026-June 2026 - PaulTech Software Services (OPC) Pvt. Ltd.',
        description: '',
        frontTexture: '/textures/studio/monitorfront_intern.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_intern_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1KwdW7LInzVV-FpeZDHzwxKVm499vXhe5?usp=drive_link',
        date: '2026-07-05',
        readTime: '3 min',
    },
    {
        id: 'blog-005',
        platform: 'blog',
        title: 'MY RESUME',
        description: 'Check out my professional background, skills, and experience.',
        frontTexture: '/textures/studio/monitorfront_resume.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_resume_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1vumgGX_ts858eQGH99u_G6ONlaT94CBP?usp=drive_link',
        date: '2026-07-03',
        readTime: '2 min',
    },
    {
        id: 'blog-006',
        platform: 'blog',
        title: 'Software Developer Intern - Cpp Secrets , Noida',
        description: '',
        frontTexture: '/textures/studio/monitorfront_cppsecrets.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_cppsecrets_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1fcB3W9zShiq77Shb3l1PvHvUteY_GKSr?usp=sharing',
        date: '2026-07-05',
        readTime: '3 min',
    },
    {
        id: 'blog-007',
        platform: 'blog',
        title: 'Software Developer Intern - Cpp Secrets , Noida',
        description: '',
        frontTexture: '/textures/studio/monitorfront_cppsecrets.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_cppsecrets_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1fcB3W9zShiq77Shb3l1PvHvUteY_GKSr?usp=sharing',
        date: '2026-07-05',
        readTime: '3 min',
    },
    {
        id: 'blog-008',
        platform: 'blog',
        title: 'Software Developer Intern - Cpp Secrets , Noida',
        description: '',
        frontTexture: '/textures/studio/monitorfront_cppsecrets.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_cppsecrets_painted.webp',
        thumbnail: null,
        url: 'https://drive.google.com/drive/folders/1fcB3W9zShiq77Shb3l1PvHvUteY_GKSr?usp=sharing',
        date: '2026-07-05',
        readTime: '3 min',
    },

    // ============ TikToks ============
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phonefront_followmeontiktok.webp',
        paintedFrontTexture: '/textures/studio/phonefront_followmeontiktok_painted.webp',
        thumbnail: null,
        url: 'https://www.linkedin.com/posts/shubham-arora-3096b6384_internship-fullstackdevelopment-webdevelopment-ugcPost-7479174527256821760-MmXq/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF7JrTkB3PLFk43rzBsb1mgOTjciG9a6Syg',
        date: '2026-07-05',
        views: '15.2K',
        likes: '1.2K',
    },
    {
        id: 'tt-002',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '8.5K',
        likes: '756',
    },
    {
        id: 'tt-003',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '22.1K',
        likes: '3.4K',
    },
    {
        id: 'tt-004',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '12.3K',
        likes: '1.1K',
    },
    {
        id: 'tt-005',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '45.2K',
        likes: '5.8K',
    },
    {
        id: 'tt-006',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '18.7K',
        likes: '2.1K',
    },
    {
        id: 'tt-007',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '33.4K',
        likes: '4.2K',
    },
    {
        id: 'tt-008',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '28.9K',
        likes: '3.6K',
    },
    {
        id: 'tt-009',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '19.3K',
        likes: '2.4K',
    },
    {
        id: 'tt-010',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '41.2K',
        likes: '5.1K',
    },
    {
        id: 'tt-011',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '25.6K',
        likes: '3.0K',
    },
    {
        id: 'tt-012',
        platform: 'tiktok',
        title: '',
        description: '',
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        thumbnail: null,
        url: '',
        date: '2026-07-05',
        views: '31.8K',
        likes: '4.0K',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
