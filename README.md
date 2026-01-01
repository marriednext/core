# marriednext.com

Create and deploy your wedding website in minutes. Manage your guest list and collect reservations. Invite your spouse, wedding planner, or long lost uncle to help manage the website. All for free.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10.23.0
- Turbo CLI (installed globally)

```bash
pnpm add turbo --global
```

### Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/marriednext/core
cd marriednext.com
pnpm install
```

2. Copy the example environment file:

```bash
pnpm run fork:env
```

3. Configure your environment variables in `apps/webapp/.env.local` (see [Environment Variables](#environment-variables))

4. Start the development server(s):

```bash
pnpm run dev
```

The webapp runs at [http://localhost:3000](http://localhost:3000). Storybook runs at [http://localhost:6006](http://localhost:6006).

This also launces the other micro services such as the labels-shelf, which uses an node script to watch for changes to the .properties files and then converts those to JSON. There is also the style-shelf, which uses a node script to watch for changes to tailwind related changes across various directories.

## Setting up Clerk

We are NOT using a premium version of Clerk at the moment. (We might soon for satellite domains)

### Enable Name Capture

1. Go to the **Configure** tab in Clerk Dashboard
2. Select **User & authentication** → **User model**
3. Enable the **First and last name** switch

### Configure JWT Template

1. Go to **Configure** → **Sessions** → **Customize session token**
2. Add this template:

```json
{
  "metadata": {
    "onboardingComplete": "{{user.public_metadata.onboardingComplete}}",
    "weddingId": "{{user.public_metadata.weddingId}}",
    "role": "{{user.public_metadata.role}}"
  }
}
```

### Configure Domain Paths

1. Go to **Configure** → **Developers** → **Paths**
2. Set **Application Paths**:
   - **Home Url:** `marriednext.com/engaged`
3. Set **Component Paths**:
   - **Sign In:** `marriednext.com/sign-in` (on application domain)
   - **Sign Up:** `marriednext.com/register` (on application domain)
   - **Signed Out:** `marriednext.com/sign-in` (path on application domain)

![Clerk Domain Paths](https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/marketing/ClerkDomainPaths.png)

## Documentation

Internal docs:

- [`docs/onboarding.md`](docs/onboarding.md) - Onboarding flow & testing guide
- [`docs/github/branching-rules.md`](docs/github/branch-rules.md) - Git workflow

## Troubleshooting

### Reset the Project

Clear all auto-generated assets:

```bash
pnpm run clean
pnpm install
```

### Clerk `form_param_unknown` Errors

Enable the **First and last name** switch in Clerk Dashboard. See [Setting up Clerk](#setting-up-clerk).

### Stuck on `/onboarding` Screen

Configure the JWT Template in Clerk. See [Configure JWT Template](#configure-jwt-template).

### Resetting a Test User

After submitting the onboarding form, records are created in multiple services. To fully reset:

1. Delete the user in Clerk Dashboard
2. Delete the Wedding record from Neon
3. Remove the subdomain from Vercel → Project → Domains
4. Delete the CNAME records from Porkbun
