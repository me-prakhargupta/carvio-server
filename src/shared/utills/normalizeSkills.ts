const SKILLS_GROUP: Record<string, string[]> = {
  nodejs: ["node", "node.js", "nodejs", "node js"],
  mongodb: ["mongo", "mongodb", "mongo db"],
  react: ["react", "react.js", "reactjs", "react js"],
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