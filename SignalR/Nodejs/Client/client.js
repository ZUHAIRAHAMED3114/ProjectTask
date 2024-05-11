const publicVapidKey="BMw3CfVCdibltTIlB4NP4HfQoVtXtN5zF3X3soMP3F_m35FMBLUk3EtNIEMYSaNzLqe8GrV9KUhdOK44l2XUJDY";

if('serviceWorker' in navigator){
   send().catch(err=>console.error(err))

}

async function send(){
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service worker registered...', register);

    // Register push
    console.log('Registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered...', subscription);

    // Send Push Notification
    console.log('Sending push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent...');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}