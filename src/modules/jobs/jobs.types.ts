export interface IJob {
    title: string;
    logo?: string;
    company: string;
    location?: string;
    skills?: string[];
    source: string;
    externalId: string;
    absoluteUrl: string;
    stipend?: string;
    postedAt?: string;
}