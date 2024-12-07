export function checkGithubLink(githubLink) {
    const githubProjectRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
    return githubProjectRegex.test(githubLink);
}
export function cerrarSesion() {
    console.log('delete cookie', document.cookie);
    document.cookie
        .split(";")
        .forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
}
