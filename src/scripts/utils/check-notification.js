import swRegister from './sw-register';

const checkNotification = () => {
  if ('Notification' in window) {
    swRegister();
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // eslint-disable-next-line no-console
        console.log('Notification permission granted.');
      } else {
        // eslint-disable-next-line no-console
        console.log('Notification permission denied.');
      }
    });
  }
};

export default checkNotification;
