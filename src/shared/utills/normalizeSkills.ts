const SKILLS_GROUP: Record<string, string[]> = {
  nodejs: ["node", "node.js", "nodejs", "node js"],
  mongodb: ["mongo", "mongodb", "mongo db"],
  react: ["react", "react.js", "reactjs", "react js"],
  javascript: ["js", "javascript", "ts", "typescript"],
  python: ["python"],
  django: ["django"],
  sql: ["mysql", "sql", "my sql", "postgre sql", "postgresql"],
  powerbi: ["power bi", "powerbi"],
  ai: ["ai", "artificialintelligence", "aiml", "dl", "deeplearning", "deep learning", "artificial intelligence"],
  ml: ["machinelearning", "ml", "aiml", "dl", "deep learning", "machine learning"],
  genai: ["genai", "gen ai", "generative ai", "generativeai"],
  java: ["java", "spring", "spring boot", "springboot", "springmvc", "spring mvc", "jsp", "j s p", "j2ee", "hibernate", "hibernate orm(java)", "java8", "java 8", "junit", "j unit", "jdbc", "j d b s"],
  git: ["git", "github", "gitlab"],
  devops: ["devops", "docker", "kubernates"]
};

export const normalizeSkills = (input: string | string[]): string[] => {
    const skillsArray = Array.isArray(input) ? input : [input];

    const normalized = skillsArray.map((rawSkill) => {
        const skill = rawSkill.toLowerCase().trim();

        for (const [canonical, variations] of Object.entries(SKILLS_GROUP)) {
            if (variations.some((v) => skill.includes(v))) {
                return canonical;
            }
        }

        return skill;
    });

    return [...new Set(normalized)];
};