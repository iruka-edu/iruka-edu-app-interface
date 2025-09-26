import posthog from 'posthog-js';

export type AnalyticsEvent
  = | { name: 'lesson_start'; props: { lessonId: string } }
    | { name: 'lesson_complete'; props: { lessonId: string; xp: number; streak: number } }
    | { name: 'exercise_submit'; props: { lessonId: string; exerciseId: string; correct: boolean } }
    | { name: 'energy_change'; props: { delta: number; energy: number } };

export function capture(event: AnalyticsEvent) {
  if (!posthog?.capture) {
    return;
  }
  posthog.capture(event.name, event.props as Record<string, unknown>);
}
