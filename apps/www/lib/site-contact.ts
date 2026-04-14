export const CONTACT_EMAIL = "sivak.jeg@gmail.com";

export const GITHUB_REPO_URL = "https://github.com/silvak/liminal-ui";

export function contactMailtoHref(subject = "Liminal UI"): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
