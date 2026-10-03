# Performance suggestions

These are implementation-oriented opportunities identified from the current front-end. Start by recording a production-build baseline (Lighthouse/Web Vitals on a throttled mobile profile, plus real-user LCP, INP, and route-change timings) so changes can be ranked by measured impact.

## Highest priority

1. **Split routes and defer non-critical UI.** `App.tsx` statically imports every screen, so the initial JavaScript bundle includes the whole application even when a visitor only sees onboarding or the Grove. Use `React.lazy`/`Suspense` for route elements, with a small loading fallback. Consider preloading the likely next route after the current route becomes idle. Keep the session route eagerly available only if measurement shows it is a common next navigation.

2. **Reduce the first-page font payload.** `main.tsx` imports a variable Mona Sans face, Faculty Glyphic, and two DM Mono weights before the app renders. Audit the emitted CSS/font assets, subset to the characters actually used, and load the display and mono faces only on routes/components that need them. Use `font-display: swap` (or `optional` for decorative text) and ensure metric-compatible fallbacks to avoid delayed text paint or layout shift.

3. **Avoid expensive continuous visual work on modest devices.** The scenery pool uses a blurred radial gradient and continuous animation; embers, flames, glows, and the rotating sigil add more ongoing paint/compositing work. Reduced-motion support already exists, which is a strong base. Add a low-performance mode—based on a user setting and conservative device/media signals—that removes blur/filter animation, limits ember counts, and pauses decorative animations when their container is offscreen (for example, via `IntersectionObserver`). Prefer `transform` and `opacity` for remaining animations.

4. **Make pointer effects frame-aware.** `emberTrail` can create up to 24 DOM nodes during pointer movement, and each has a glowing box shadow. Coalesce pointer events to one update per animation frame, make the maximum live count responsive to device capability, and reuse a small pool of particle nodes instead of allocating/removing them every time. The existing 36 ms throttle is helpful, but pooling will reduce garbage collection during long movement.

5. **Protect the conversation request path.** A session request posts the full growing transcript every turn, then writes messages and caption lines separately for each reply. Have the API accept a session/conversation identifier or a bounded context window where product requirements allow it. Batch each server response into one state update, and use cancellation (`AbortController`) or a request sequence number so late results cannot update a screen after exit, retry, or a newer turn.

## Medium priority

6. **Stop unnecessary global keyboard-listener churn.** `Clearing.tsx` adds and removes the `keydown` listener after every render because its effect has no dependency array. Use a stable callback (or an effect-event pattern) and subscribe once; read current state through refs where needed. This is small in isolation but especially avoidable on a timer-driven session screen that rerenders every second.

7. **Use a monotonic timer instead of decrementing state every second.** The countdown schedules one timeout per render and can drift if a tab is throttled. Store an end timestamp, calculate the remaining time from `performance.now()`/`Date.now()`, and update the displayed value on a controlled interval. This improves accuracy and enables a lower refresh rate when the tab is hidden.

8. **Release audio resources reliably.** `play` revokes its object URL only after the audio promise settles. `silence()` pauses audio but does not revoke the active object URL or clear its handlers/source. Keep the active URL alongside the audio element and revoke/clear it on both normal completion and cancellation. Also consider caching repeatable pre-recorded opening audio rather than creating it again per mount.

9. **Cache API responses deliberately.** Scenario fetching is deduplicated in-memory already. Add HTTP cache headers/ETags on `/api/scenarios`, version the data, and persist a short-lived cached response if offline/return visits matter. Keep chat, score, and speech endpoints non-cacheable because they are personalized or side-effectful.

10. **Use CSS containment for isolated visual cards.** Apply `content-visibility: auto` with a sensible `contain-intrinsic-size` to long offscreen lists such as trail cards and history/lantern views after visual regression testing. Add `contain: layout paint` only to components whose sizing does not need to affect surrounding layout. This reduces rendering work without changing data behavior.

## Delivery and verification

- Build before measuring: `npm run build` in `frontend`, then inspect Vite’s emitted asset sizes and route chunks. Set budgets for initial JavaScript, total font bytes, and largest CSS asset.
- Test on a mid-range mobile profile as well as desktop. Capture LCP/INP/CLS, long tasks, JS heap allocation during ember movement, and frame rate while a session is active.
- Add route-level error/loading boundaries when introducing lazy loading; a failed chunk must leave the user an actionable recovery path.
- Instrument the client with route timing, scenario load latency, turn request latency, speech generation/playback failures, and cancelled requests. Review percentiles, not only averages.
- Re-run keyboard, reduced-motion, offline, and screen-reader checks after each optimization. The app already honors reduced motion; retain that behavior as an explicit performance and accessibility contract.

## Suggested order

1. Measure a baseline and emitted asset sizes.
2. Implement route splitting and font loading/subsetting.
3. Simplify/pause decorative effects and optimize pointer particles.
4. Harden session request, timer, listener, and audio lifecycles.
5. Add cache policy, budgets, and field instrumentation to prevent regressions.
