const PIXEL_ID = '1525232074920142';

type PixelParams = Record<string, string | number | boolean | undefined>;

function getFbq(): typeof window.fbq | undefined {
  return typeof window !== 'undefined' ? window.fbq : undefined;
}

function installPixel(): void {
  if (typeof window === 'undefined' || getFbq()) return;

  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  const fbq = getFbq();
  fbq?.('init', PIXEL_ID);
  fbq?.('track', 'PageView');
}

export function initPixel() {
  installPixel();
}

export function trackCustomEvent(eventName: string, params?: PixelParams) {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', eventName, params || {});
}

export function trackLeadEvent(stage: string, progress: number) {
  trackCustomEvent('Lead', { stage, progress });
}

export function trackQuizProgressEvent(percent: number, stage: string) {
  trackCustomEvent(`Quiz${percent}Percent`, { percent, stage });
}

export function trackSessionDurationEvent(durationSeconds: number, stage: string, progress: number) {
  trackCustomEvent('SessionDuration', { duration_seconds: durationSeconds, stage, progress });
}

export function trackAbandonCartEvent(stage: string, progress: number, durationSeconds: number) {
  trackCustomEvent('AbandonCart', { stage, progress, duration_seconds: durationSeconds });
}
