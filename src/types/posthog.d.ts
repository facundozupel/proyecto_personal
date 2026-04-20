export {};

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (distinctId: string, properties?: Record<string, any>) => void;
      get_session_id?: () => string | null;
      reset?: () => void;
    };
  }
}
