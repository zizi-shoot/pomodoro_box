/* eslint-disable no-console,no-new */
export const useNotify = (title: string) => async () => {
  const alarm = new Audio('/sounds/alarm.mp3');

  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    try {
      await alarm.play();
    } catch (e) {
      console.error(e);
    } finally {
      new Notification(title);
    }
  }
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        try {
          await alarm.play();
        } catch (e) {
          console.error(e);
        } finally {
          new Notification(title);
        }
      }
    });
  }
};
