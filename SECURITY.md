# Security Policy

This repository is part of the Council’s GitHub **pilot for hosting public, static websites**.

It is not used for storing personal data, credentials, or configuration for internal systems.

---

## Reporting a security issue

If you believe you have found a security issue in this repository or any site published from it, please report it to:

**Email:** digitaldev@gloucester.gov.uk  
**Subject:** GitHub security report – [repository name]

Please include:
- The affected URL or repository
- A clear description of the issue
- Steps to reproduce, where possible

Do **not** include personal data or live credentials in your report.

We will:
- Acknowledge reports during normal working hours
- Assess the issue and prioritise remediation
- Keep the reporter informed where appropriate

---

## Scope of use

Repositories in this organisation are intended to contain only:

- Public website content (HTML, CSS, JavaScript, images)
- Supporting static build configuration
- Documentation and guidance

They must **not** contain:

- Personal data relating to residents, staff, or suppliers
- User-submitted data or form back-end services
- API keys, passwords, tokens, or connection strings
- Network diagrams or internal infrastructure details
- Proprietary material that the Council does not have the rights to publish

Any repository found to contain the above will be reviewed and content removed.

---

## Secrets and credentials

No secrets are to be stored in GitHub.

If a secret is accidentally committed:
1. Remove it immediately.
2. Revoke or rotate the secret in the source system.
3. Notify the digital/IT team so the repository history can be cleaned if required.

---

## Access and authentication

- All contributors must use their official council account.
- Two-factor authentication (2FA) is mandatory for all organisation members.
- Write access is granted only through named teams.
- Default organisation access is read-only.

---

## Dependencies and third-party code

Where third-party libraries are used:
- Dependencies should be kept up to date where reasonably practicable.
- Known critical vulnerabilities should be addressed promptly.

---

## Responsible disclosure

We support responsible disclosure of security issues and ask that:
- Issues are reported privately using the contact details above.
- Details are not publicly disclosed until a fix or mitigation is in place.

---

_Last updated: 2025-03-[DD]_
