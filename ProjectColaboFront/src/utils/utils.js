export function checkGithubLink(githubLink) {
    const githubProjectRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
    return githubProjectRegex.test(githubLink);
}