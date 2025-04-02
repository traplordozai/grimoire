export function scoreMatch(candidate: any, role: any): number {
  let score = 0;
  if (candidate.skills && role.requiredSkills) {
    const overlap = candidate.skills.filter((skill: string) => role.requiredSkills.includes(skill));
    score += overlap.length * 10;
  }
  if (candidate.availability === role.duration) {
    score += 20;
  }
  if (candidate.location === role.location) {
    score += 15;
  }
  return Math.min(score, 100);
}