- [ ] Does the Onboarding flow match the Invitation Flow?
      The invitation flow is very recent whereas the onboard flow is quite old within the context of this application. I'm curious what is / is not out of sync.
      [Research](.cursor/plans/onboarding_vs_invitation_analysis_466bdf75.plan.md)

- [ ] if a user is removed as a collaborator, we should handle that reset logic

  - [ ] Clerk Metadata
  - [ ] Invitations (need to expire or account for already accepted invites?)
  - [ ] weddingUsers (we should probably find a way to track the weddingUsers even after they have been deleted to avoid muddying up the database. We need a delete flag in the db)

- [ ] Implement "Was this article helpful" for Help content
- [ ] Implement a Invite Resend button for wedding invitations (per help/invite-collaborator#troubleshooting)
- [ ] Confirm / update help/invite-collaborator#troubleshooting steps
- [ ] Help landing page needs some thinking / redesigning to make it more piratical for the use case

- [ ] review tests that exist in the app
- [ ] Add "Registry" screen

Go LIVE

- [ ] Neon DB
- [ ] Clerk Production
- [ ] Vercel Domain Integration
