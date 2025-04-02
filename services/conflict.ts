import payload from 'payload';

export async function detectConflicts(candidateIds: string[], roleId: string) {
  const role = await payload.findByID({ collection: 'internshipRoles', id: roleId });
  const results = [];

  for (const candidateId of candidateIds) {
    const candidate = await payload.findByID({ collection: 'candidateProfiles', id: candidateId });

    const issues: string[] = [];

    if (candidate.location !== role.location) {
      issues.push('Location mismatch');
    }

    const overlap = candidate.skills.filter((s: string) => role.requiredSkills.includes(s));
    if (overlap.length === 0) {
      issues.push('No overlapping skills');
    }

    if (candidate.availability !== role.duration) {
      issues.push('Availability mismatch');
    }

    if (candidate.status !== 'active') {
      issues.push('Candidate is not active');
    }

    if (issues.length > 0) {
      results.push({ candidateId, issues });
    }
  }

  return results;
}