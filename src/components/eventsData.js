import stgSeason1 from '../assets/matrix-bg.png'; 
import stgSeason2 from '../assets/joker-phoenix-bg.jpg';
import stgSeason3 from '../assets/cyber-grid-bg.png';
import stgSeason4 from '../assets/phoenix-bg.png';
import operationVideo from '../assets/operation_video.mp4';

export const DEFAULT_EVENTS = [
  {
    id: 'def_1',
    title: "STG OPERATION Ⅰ",
    description: "The historical beginning of STG operations. A fiercely competitive arena where legends were first forged. This inaugural event set the gold standard for tactical esports, bringing together top-tier squads from across the region. Competitors showcased unparalleled strategy, raw mechanical skill, and relentless teamwork over the course of multiple grueling stages. The tournament established a new benchmark for competitive gaming, offering thrilling clutch moments and unforgettable showdowns that remain iconic in STG history.",
    series: "STG SERIES",
    season: "01",
    status: "COMPLETED",
    prizePool: "₹10,000",
    period: "JANUARY 2024",
    posterImage: stgSeason1,
    videoThumbnail: "https://img.youtube.com/vi/ahAsqomlDNw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/live/ahAsqomlDNw?si=wSjPg0zBZe5ayxT8",
    hasDetailsButton: true,
    hashtag: "#UNLEASH_THE_BEAST",
    themeColor: "#00f2fe",
    themeGlow: "rgba(0, 242, 254, 0.4)",
    themeBorder: "rgba(0, 242, 254, 0.25)",
    winners: ['GodLike', 'Team XSpark', 'Soul', 'Blind Esports', 'Gladiators'],
    slots: "160",
    mode: "CLASSIC - SQUAD",
    entry: "FREE",
    registrationDate: "0d 0h 0m 0s"
  },
  {
    id: 'def_2',
    title: "STG OPERATION Ⅱ",
    description: "Expanding the field of battle. New tactics, higher stakes, and more intense squad rivalries. Operation II introduced dynamic map rotations and complex strategic objectives that pushed teams to their absolute limits. Veterans of the first season clashed with rising stars in a breathtaking display of marksmanship and macro-level gameplay. The production quality, viewer engagement, and sheer competitive density made this a milestone event in the STG championship circuit.",
    series: "STG SERIES",
    season: "02",
    status: "COMPLETED",
    prizePool: "₹10,000",
    period: "JUNE 2024",
    posterImage: stgSeason2,
    videoThumbnail: "https://img.youtube.com/vi/YcADMT2EJZU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/live/YcADMT2EJZU?si=Oe0VOOArv5UcAIA1",
    hasDetailsButton: true,
    hashtag: "#UNLEASH_THE_BEAST",
    themeColor: "#ff4b2b",
    themeGlow: "rgba(255, 75, 43, 0.4)",
    themeBorder: "rgba(255, 75, 43, 0.25)",
    winners: ['Global Esports', 'Revenant', 'Entity', 'Enigma Gaming', 'Hydra'],
    slots: "160",
    mode: "CLASSIC - SQUAD",
    entry: "FREE",
    registrationDate: "0d 0h 0m 0s"
  },
  {
    id: 'def_3',
    title: "STG OPERATION Ⅲ",
    description: "The pinnacle of tactical esports. A grand stage for the ultimate squad champions to claim their throne. Operation III escalated the warfare with expanded rosters, cutting-edge anti-cheat protocols, and an unprecedented prize pool. It featured a grueling double-elimination bracket that tested not only the players' aim, but their mental endurance and adaptability under extreme pressure. This season solidified STG's position as the premier competitive destination.",
    series: "STG SERIES",
    season: "03",
    status: "COMPLETED",
    prizePool: "₹15,000",
    period: "DECEMBER 2024",
    posterImage: stgSeason3,
    videoThumbnail: "https://img.youtube.com/vi/r1iIFdNG_uc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/live/r1iIFdNG_uc",
    hasDetailsButton: true,
    hashtag: "#UNLEASH_THE_BEAST",
    themeColor: "#ffd700",
    themeGlow: "rgba(255, 215, 0, 0.4)",
    themeBorder: "rgba(255, 215, 0, 0.25)",
    winners: ['Carnival Gaming', 'Orangutan', 'Medal Esports', 'Gladiators', '8Bit'],
    slots: "160",
    mode: "CLASSIC - SQUAD",
    entry: "FREE",
    registrationDate: "0d 0h 0m 0s"
  },
  {
    id: 'def_4',
    title: "STG OPERATION Ⅳ",
    description: "Preparation for STG 4 is underway. Mission protocols are being finalized for the next high-stakes operation. Brace for deployment. Expect completely overhauled tournament mechanics, massive sponsor integrations, and a breathtaking live production setup. Squads are currently undergoing intense bootcamps, refining their meta strategies to dominate the upcoming qualifiers. Stay tuned as we prepare to unleash the beast once again in our biggest spectacle yet.",
    series: "STG SERIES",
    season: "04",
    status: "UPCOMING",
    prizePool: "TBA",
    period: "COMING SOON",
    posterImage: stgSeason4,
    videoThumbnail: stgSeason4,
    videoUrl: operationVideo,
    isLocalVideo: true,
    autoPlayVideo: true,
    hasDetailsButton: false,
    notifyButtonText: "GET NOTIFIED FOR DEPLOYMENT",
    hashtag: "#UNLEASH_THE_BEAST",
    isUpcoming: true,
    themeColor: "#e50914",
    themeGlow: "rgba(229, 9, 20, 0.4)",
    themeBorder: "rgba(229, 9, 20, 0.25)",
    winners: [],
    slots: "TBA",
    mode: "TBA",
    entry: "TBA",
    registrationDate: "TBA"
  }
];

export const EVENTS_STORAGE_KEY = 'stg_admin_events';

export const loadEvents = () => {
  try {
    const s = sessionStorage.getItem(EVENTS_STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {
    console.error("Failed to parse events from storage", e);
  }
  return DEFAULT_EVENTS;
};

export const saveEvents = (events) => {
  try {
    sessionStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    // If quota exceeded, try stripping large base64 images and retry
    try {
      const stripped = events.map(ev => ({
        ...ev,
        posterImage: (typeof ev.posterImage === 'string' && ev.posterImage.startsWith('data:') && ev.posterImage.length > 50000)
          ? null
          : ev.posterImage,
        videoThumbnail: (typeof ev.videoThumbnail === 'string' && ev.videoThumbnail.startsWith('data:') && ev.videoThumbnail.length > 50000)
          ? null
          : ev.videoThumbnail,
      }));
      sessionStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(stripped));
    } catch (e2) {
      console.warn('saveEvents: sessionStorage quota exceeded even after stripping.', e2);
    }
  }
};

export const toRoman = (num) => {
  if (isNaN(num)) return '';
  const roman = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4,
    I: 1
  };
  let str = '';
  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
};

export const formatRomanTitle = (title) => {
  if (!title) return '';
  // Convert digits to roman numerals if they are separate words (like "OPERATION 1" -> "OPERATION I")
  return title.replace(/\b(\d+)\b/g, (match) => {
    const n = parseInt(match, 10);
    if (n > 0 && n < 4000) return toRoman(n);
    return match;
  });
};

const romanToInt = (s) => {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const current = romanMap[s[i].toUpperCase()];
    const next = romanMap[s[i + 1]?.toUpperCase()];
    if (current && next && current < next) {
      result += next - current;
      i++;
    } else if (current) {
      result += current;
    }
  }
  return result;
};

export const getEventNumber = (title) => {
  if (!title) return 0;
  const t = title.toUpperCase().trim();
  const matchNum = t.match(/\b(\d+)\b$/);
  if (matchNum) return parseInt(matchNum[1], 10);
  
  const matchRoman = t.match(/\b([IVXLCDM]+)\b$/);
  if (matchRoman) {
    return romanToInt(matchRoman[1]);
  }
  return 0;
};

export const sortEvents = (events) => {
  return [...events].sort((a, b) => {
    const numA = getEventNumber(a?.title || a?.operationName);
    const numB = getEventNumber(b?.title || b?.operationName);
    if (numA !== numB) return numA - numB;
    return (a.id || 0) - (b.id || 0); // fallback to ID
  });
};

