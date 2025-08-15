importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCyB8SfNP5uvqNLWw3voeB8nNtSJvWeplQ",
    authDomain: "tutorial-test-fb-5d8ba.firebaseapp.com",
    projectId: "tutorial-test-fb-5d8ba",
    storageBucket: "tutorial-test-fb-5d8ba.appspot.com",
    messagingSenderId: "987311190427",
    appId: "1:987311190427:web:1923c38024b20364afb13e"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
