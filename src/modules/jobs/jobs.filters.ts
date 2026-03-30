import { 
    TARGET_LOCATION, 
    TARGET_KEYWORDS 
} from "../../shared/utills/keywords.js";

export const isRecentJob = (date: string): boolean => {
    if(!date) return false;

    const postedDate = new Date(date);
    if(isNaN(postedDate.getTime())) return false;

    const now = new Date();

    const diffInDays = Math.floor(
        (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return diffInDays <= 3;
};

export const isIndian = (location: string): boolean => {
    if(!location) return false;

    const normalized = location.toLowerCase().trim();
    
    const isIncluded = TARGET_LOCATION.some((kw) => 
        normalized.includes(kw.toLowerCase()));

    return isIncluded;
};

export const isRelevantJob = (
    title: string, 
    description?: string
): boolean => {
    if(!title && !description) return false;

    const normalized = `${title} ${description}""`.toLowerCase();
    const isIncluded = TARGET_KEYWORDS.some((kw) => 
        normalized.includes(kw.toLowerCase()));

    return isIncluded;
};

export const timeAgo = (dateString: string) => {
    const past = new Date(dateString).getTime();
    const now = Date.now();

    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours   = Math.floor(diffMs / (1000 * 60 * 60));
    const days    = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24)   return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    
    return `${days} day${days > 1 ? "s" : ""} ago`;
};