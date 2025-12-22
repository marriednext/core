Flow:

1. User creates account (Clerk interface)
2. They are redirected to marriednext.com/engaged/onboarding
3. Enter form details on step 1
4. Enter form details on step 2
   4.1. When user clicks "Next" we run an HTTP request to api/domains/check to make sure it's available in our database. (If it's available there, we assume its available everywhere)
5. User submits form on step 3
6. HTTP request to /api/domains
   6.1. Internal: HTTP Request to Vercel to set the new subdomain. If a request is going to fail, it's likely going to fail here from a domain name that is already taken. We should account for this behavior.
   6.2. Internal: HTTP Request to Vercel to GET the new subdomain config options
   6.3. Internal: HTTP Request to Porkbun to configure the CNAME Records for the subdomain
7. HTTP request to /api/onboarding

---

In the proxy.ts file there is a condition checked on every req that blocks the user from landing on the engaged screen if they havent completed onboarding

```ts
if (isAuthenticated && !metadata?.onboardingComplete) {
  const onboardingUrl = new URL("/engaged/onboarding", req.url);
  return NextResponse.redirect(onboardingUrl);
}
```

in the onboarding/layout.tsx file there is a condition that blocks users from landing on the onboarding screen if they've completed the registration flow successfully

```ts
if ((await auth()).sessionClaims?.metadata?.onboardingComplete === true) {
  redirect("/");
}
```

## NEW Rough guidelines for testing the Onboarding flow

First, it's good to know that no data is submitted until the third step of the form. This is the third step:

<img width="660" height="590" alt="Image" src="https://github.com/user-attachments/assets/64fcf9de-97ad-4bc2-84a3-851f74faaf17" />

It doesn't matter if the user opts to skip the third step or submit the form on the third step, both `onSubmit` and `onSkip` map to `handleSubmit` in a parent component. At that point, we run a few POST requests that really alter the state of the environment for the given user.

When testing, you probably don't want to use a new email for each test. The alternative isn't much better. I could write code to automate some of this but that is a task for another day. For now i'm going to just get the gist documented and suffer through the manual testing

## Reset the test user after submitting the onboarding form

The onboarding form sets records in Clerk, Neon, Vercel -> Project -> Domains, Porkbun so if your intention is truly to reset the user (as is the case for development/ debugging) then you need to reset _all_ or the system will fall out of whack.

1. Delete the Clerk user through the Clerk dashboard
2. Delete the Wedding from your DB Provider
3. Delete the subdomain from Vercel -> Project -> Domains
4. Delete the CNAME Records from Porkbun

## Additional info

https://github.com/matthewbub/marriednext.com/issues/143
