export const useNotify = (title: string) => () => {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  // eslint-disable-next-line no-new
  if (Notification.permission === 'granted') new Notification(title);
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      // eslint-disable-next-line no-new
      if (permission === 'granted') new Notification(title);
    });
  }
};
