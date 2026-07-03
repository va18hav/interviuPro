-- ============================================================
-- MOCK DATA for Dashboard API Testing
-- Interview ID : ed85840f-2fae-4c8a-b180-2d906c5bb14f
-- User ID      : 424a7288-8b38-4c40-8cb4-0d8cb76c23de
-- ============================================================
-- Inserts 5 Sessions + 5 Feedback rows.
-- Scores: 88, 74, 92, 61, 79  →  avg = 78.8
-- ============================================================

-- ── SESSION 1 ───────────────────────────────────────────────
INSERT INTO "Session" (id, "interviewId", "startedAt", "endedAt", duration, transcript)
VALUES (
    'sess-mock-0001-aaaa-bbbbbbbbbbbb',
    'ed85840f-2fae-4c8a-b180-2d906c5bb14f',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day' + INTERVAL '20 minutes',
    20,
    '[]'::jsonb
);

INSERT INTO "Feedback" (id, "sessionId", "overallScore", verdict, summary, strengths, "focusAreas", "nextStep")
VALUES (
    gen_random_uuid(),
    'sess-mock-0001-aaaa-bbbbbbbbbbbb',
    88,
    'Strong Hire',
    'Candidate demonstrated solid understanding of Node.js internals and REST API design. Handled async patterns well and explained trade-offs clearly.',
    '["Strong async/await usage", "Clear REST API design knowledge", "Good problem decomposition"]'::jsonb,
    '["Could improve on system design depth", "Redis caching patterns need more practice"]'::jsonb,
    'Practice designing high-throughput systems with caching layers. Review distributed session management patterns.'
);

-- ── SESSION 2 ───────────────────────────────────────────────
INSERT INTO "Session" (id, "interviewId", "startedAt", "endedAt", duration, transcript)
VALUES (
    'sess-mock-0002-aaaa-bbbbbbbbbbbb',
    'ed85840f-2fae-4c8a-b180-2d906c5bb14f',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days' + INTERVAL '20 minutes',
    20,
    '[]'::jsonb
);

INSERT INTO "Feedback" (id, "sessionId", "overallScore", verdict, summary, strengths, "focusAreas", "nextStep")
VALUES (
    gen_random_uuid(),
    'sess-mock-0002-aaaa-bbbbbbbbbbbb',
    74,
    'Hire',
    'Good foundational knowledge of Express.js and PostgreSQL. Struggled slightly with query optimization and JWT refresh token strategy.',
    '["Good Express.js middleware understanding", "Solid PostgreSQL schema design"]'::jsonb,
    '["JWT refresh token flows need improvement", "SQL query optimization needs work", "TypeScript generics were shaky"]'::jsonb,
    'Study JWT access/refresh token rotation patterns. Practice writing optimized Prisma queries with proper indexing strategies.'
);

-- ── SESSION 3 ───────────────────────────────────────────────
INSERT INTO "Session" (id, "interviewId", "startedAt", "endedAt", duration, transcript)
VALUES (
    'sess-mock-0003-aaaa-bbbbbbbbbbbb',
    'ed85840f-2fae-4c8a-b180-2d906c5bb14f',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days' + INTERVAL '20 minutes',
    20,
    '[]'::jsonb
);

INSERT INTO "Feedback" (id, "sessionId", "overallScore", verdict, summary, strengths, "focusAreas", "nextStep")
VALUES (
    gen_random_uuid(),
    'sess-mock-0003-aaaa-bbbbbbbbbbbb',
    92,
    'Strong Hire',
    'Exceptional performance. Candidate showed deep understanding of WebSockets, real-time architecture, and LLM integration patterns. Communicated solutions clearly.',
    '["Excellent WebSocket and real-time knowledge", "Strong TypeScript typing skills", "Outstanding system design for AI integrations"]'::jsonb,
    '["Minor gaps in load balancing strategies", "Could explore more on horizontal scaling"]'::jsonb,
    'Explore Kubernetes-based deployments and horizontal pod autoscaling for real-time services.'
);

-- ── SESSION 4 ───────────────────────────────────────────────
INSERT INTO "Session" (id, "interviewId", "startedAt", "endedAt", duration, transcript)
VALUES (
    'sess-mock-0004-aaaa-bbbbbbbbbbbb',
    'ed85840f-2fae-4c8a-b180-2d906c5bb14f',
    NOW() - INTERVAL '8 days',
    NOW() - INTERVAL '8 days' + INTERVAL '20 minutes',
    20,
    '[]'::jsonb
);

INSERT INTO "Feedback" (id, "sessionId", "overallScore", verdict, summary, strengths, "focusAreas", "nextStep")
VALUES (
    gen_random_uuid(),
    'sess-mock-0004-aaaa-bbbbbbbbbbbb',
    61,
    'No Hire',
    'Candidate showed enthusiasm but lacked depth in key areas. REST API security concepts were weak and could not articulate OOP principles clearly under pressure.',
    '["Good enthusiasm and communication", "Basic React knowledge is adequate"]'::jsonb,
    '["REST API security (CORS, rate limiting, input validation)", "OOP principles and design patterns", "PostgreSQL joins and transactions"]'::jsonb,
    'Focus on OWASP Top 10 for API security. Revisit SOLID principles and practice database transaction management.'
);

-- ── SESSION 5 ───────────────────────────────────────────────
INSERT INTO "Session" (id, "interviewId", "startedAt", "endedAt", duration, transcript)
VALUES (
    'sess-mock-0005-aaaa-bbbbbbbbbbbb',
    'ed85840f-2fae-4c8a-b180-2d906c5bb14f',
    NOW() - INTERVAL '12 days',
    NOW() - INTERVAL '12 days' + INTERVAL '20 minutes',
    20,
    '[]'::jsonb
);

INSERT INTO "Feedback" (id, "sessionId", "overallScore", verdict, summary, strengths, "focusAreas", "nextStep")
VALUES (
    gen_random_uuid(),
    'sess-mock-0005-aaaa-bbbbbbbbbbbb',
    79,
    'Hire',
    'Solid overall performance with good grasp of full-stack development. Redis usage was surface-level and could go deeper on caching strategies and invalidation.',
    '["Strong React hooks knowledge", "Good understanding of REST principles", "Clean code structure in answers"]'::jsonb,
    '["Redis eviction policies and cache invalidation", "Advanced PostgreSQL (CTEs, window functions)", "CI/CD pipeline knowledge"]'::jsonb,
    'Build a project using Redis pub/sub and practice writing complex PostgreSQL queries using CTEs.'
);

-- ============================================================
-- VERIFY: Run these after inserting to confirm data is correct
-- ============================================================
-- SELECT s.id, s."startedAt", s.duration, f."overallScore", f.verdict
-- FROM "Session" s
-- JOIN "Feedback" f ON f."sessionId" = s.id
-- WHERE s."interviewId" = 'ed85840f-2fae-4c8a-b180-2d906c5bb14f'
-- ORDER BY s."startedAt" DESC;
--
-- Expected avg score: (88 + 74 + 92 + 61 + 79) / 5 = 78.8
-- ============================================================
