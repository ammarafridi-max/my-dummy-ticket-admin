# Project Notes (mdt-admin + mdt-backend)

Last updated: 2026-02-04

## Summary of Work Completed

### Auth + Account (admin)
- Fixed account update flow to await mutation and invalidate cache.
- Fixed password form issues (undefined password var, wrong imports, toast handling).
- Unified mutation status handling (isPending).
- Added query invalidation after update.

### Blog (backend)
- Fixed Blog model pre-save hook crash (removed `next()` usage in sync pre-save).
- Update logic now supports partial updates without requiring title/content.
- Slug uniqueness enforced on update + duplicate.
- Reading time recomputed on content changes.
- Published fields handled properly on update (publishedAt/publisher).
- Create sets publisher when published.
- Slug empty validation.
- Cover image folder respects updated slug.
- Blog routes restricted to admin only.

### Blog (admin)
- ActionButtons aligned next to blog title with Edit / Save Draft / Publish / Delete.
- Delete uses react-confirm-alert.
- Sidebar removed; meta/overview moved into main panel.
- Non-admins: blog form read-only, create route blocked, FAB hidden.

### Users
- Create user: removed passwordConfirm from payload.
- Update breadcrumb fixed.
- Delete user: moved confirm to UI, mutation now returns promise.
- Backend users list sorted newest-first.

### Dummy Tickets (backend)
- Order status update now uses req.user.id (no spoofing).
- Order status validation + proper 404s.
- Delete returns 404 if not found.
- Removed unused Stripe list call.

### Dummy Tickets (admin)
- Fixed status update endpoint path.
- Safe handledBy display.
- Refund invalidates list + detail queries.
- Send email flow fixes (bad validation, wrong path, stale invalidation).
- Mark as done wired to set DELIVERED.
- Added Mark as progress / Mark as pending, and hide “Mark as done” when already DELIVERED.
- Share on WhatsApp implemented for Dummy Ticket detail (local only).

### Role-based UI restrictions
- Agents cannot delete/refund tickets or see pricing.
- Agents cannot publish/edit/delete/create blog posts.
- Blog routes restricted to admin in backend.

### Insurance (backend)
- Added pagination + search support for applications list.
- Added createdAt filtering for admin filter (6h/12h/24h/7d/14d/30d/90d/all_time).
- Safer WIS error handling.
- Validation tightened for passengers/mobile.
- Nationality handling robust for string/object.
- Download policy validates index.
- Currency normalized in finalize response.

### Insurance (admin)
- Fixed applications list query param handling.
- Removed unused update/delete APIs.
- Removed debug logs.
- Corrected page title.
- Hide amount for non-admins.
- WhatsApp share on insurance detail.
- Region filter replaces orderStatus filter (uses `region.id`).

### Flights + Airports (backend)
- Flight search now validates input, enforces return-date for return trips, validates IATA, and respects passenger counts (adults/children/infants) instead of hardcoding 1 adult.
- Airport search kept to AIRPORT-only lookups.

### Frontend Cleanup / Bug Fixes
- Fixed payment success cleanup to remove `SESSION_ID` and corrected mailto link.
- Fixed `PrimaryLink` misuse on 404 page (`to` vs `href`).
- Removed debug logs from insurance quotes.
- Fixed Schengen canonical URL.
- Blog detail query key now includes slug; added error guard for missing blog.
- Breadcrumb links fixed (admin + frontend variants).
- Removed dead localStorage writes for routes/dates in ticket flow.
- Insurance flow guards added (sessionId missing, quotes require dates/region).
- Safe localStorage parsing for travel insurance and phone number.
- `useLocalStorage.getLocalStorage` returns properly.
- Removed invalid context fields and cleaned passenger numbering.

### Backend Hardening
- `/users/me` now whitelists fields to prevent role/status escalation.
- Insurance routes now protected: list requires admin/agent; nationalities refresh admin-only.
- Email send endpoint protected for admin/agent.
- Insurance finalize validates before accessing passenger 0.
- Insurance schema now stores `seniors` (not `infants`).
- WIS UAT base URL used for non-production.
- Review email worker and queue removed (moving to Brevo automation).

### Admin Cleanup
- Fixed `useOutsideClick` usage in ActionButtons (crash fix).
- Blog query key now includes `id` with enabled guard.

## Important Files Touched

### mdt-backend
- `src/controllers/auth.controller.js`
- `src/controllers/blog.controller.js`
- `src/controllers/insurance.controller.js`
- `src/controllers/ticket.controller.js`
- `src/controllers/flight.controller.js`
- `src/controllers/airport.controller.js`
- `src/models/Blog.js`
- `src/models/InsuranceApplication.js`
- `src/routes/auth.routes.js`
- `src/routes/blog.routes.js`
- `src/routes/insurance.routes.js`
- `src/routes/email.routes.js`
- `src/routes/flight.routes.js`
- `src/routes/airport.routes.js`
- `src/services/blog.service.js`
- `src/services/insurance.service.js`
- `src/services/flight.service.js`
- `src/services/ticket.service.js`
- `src/services/user.service.js`
- `src/services/auth.service.js`
- `src/queues/reviewEmailQueue.js` (removed)
- `src/workers/reviewEmail.worker.js` (removed)

### mdt-admin
- `src/context/AuthContext.jsx`
- `src/features/account/*`
- `src/features/blog/*`
- `src/features/users/*`
- `src/features/dummy-tickets/*`
- `src/features/insurance/*`
- `src/components/ActionButtons.jsx`
- `src/features/blog/hooks/useBlog.js`

### mdt-frontend
- `src/context/TicketContext.jsx`
- `src/context/InsuranceContext.jsx`
- `src/pages/booking-pages/PaymentSuccess.jsx`
- `src/pages/other/PageNotFound.jsx`
- `src/pages/travel-insurance/*`
- `src/pages/landing-pages/DummyTicketForSchengenVisa.jsx`
- `src/components/TicketForm.jsx`
- `src/components/Breadcrumb.jsx`
- `src/hooks/blog/useBlogBySlug.js`
- `src/hooks/ticket/useDummyTicket.js`
- `src/hooks/insurance/useInsuranceApplication.js`
- `src/hooks/general/useLocalStorage.js`

## Current Known Issues / Pending
- Production deployment not done (WhatsApp share and latest UI changes are local).
- Insurance refund is still a placeholder in admin.
- Optional: hide Payment Status in insurance list for non-admins (already hides amount).
- Optional: backend role enforcement for insurance endpoints.

## Next Suggested Focus (from user)
- Insurance done. Next: airports + flights backend/admin.
