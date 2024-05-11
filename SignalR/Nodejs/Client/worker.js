self.addEventListener('push', function(event) {
    console.log('Push notification received:', event);

    const title = 'Push Notification';
    const options = {
        body: 'Notified by TraversyMedia',
        icon: 'https://i.ibb.co/tDNdJYT/tmlogo.png'
    };
    self.registration.showNotification(title, options)
    //event.waitUntil();
});