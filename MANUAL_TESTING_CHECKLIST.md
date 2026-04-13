# Manual Testing Checklist (Issue #18)

Date: 2026-04-13

## Environment Setup
- [x] Applied DB migration for smoke DB:
  - `DATABASE_URL=file:/workspace/prisma/e2e.db npx prisma migrate deploy`
- [x] Started app with smoke environment variables:
  - `DATABASE_URL=file:/workspace/prisma/e2e.db`
  - `ADMIN_PASSWORD=test-admin-password`
  - `SESSION_SECRET=test-session-secret-for-smoke`
  - `NEXT_PUBLIC_SITE_URL=http://localhost:8080`

## Docker Verification
- [ ] `docker compose build`
- [ ] `docker compose up`
- [ ] Containerized flow verification

Notes:
- Docker CLI is not available in this execution environment (`docker: command not found`), so container build/run could not be executed here.
- `docker-compose.yml` was updated to improve deployment reliability:
  - Removed hard requirement for local `.env` by providing defaults in `environment`.
  - Added startup migration command before app start:
    - `npx prisma@5.16.2 migrate deploy --schema prisma/schema.prisma && npm run start`

## End-to-End Smoke Flow (Application)
Executed with Playwright against `http://127.0.0.1:8080`.

- [x] Unauthenticated `/admin` redirects to `/admin/login`
- [x] Admin login succeeds with configured password
- [x] Create post from `/admin/posts/new`
- [x] Edit post from `/admin/posts/[id]/edit`
- [x] Publish post from dashboard toggle
- [x] Public homepage shows published post
- [x] Public `/posts/[id]` shows title/date/body
- [x] Delete post from admin dashboard
- [x] Deleted post no longer visible publicly

## Smoke Result
- [x] PASS (app flow)
- [ ] PASS (docker runtime) — blocked by missing Docker binary in environment
