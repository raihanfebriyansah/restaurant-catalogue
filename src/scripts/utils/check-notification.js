import swRegister from './sw-register';

const checkNotification = () => {
  if ('Notification' in window) {
    swRegister();
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }
};

export default checkNotification;
