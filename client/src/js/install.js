const installButton = document.querySelector('#buttonInstall');

// Setup for installing the PWA
// Add listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
    // Stash the event so it can be triggered later.
    window.eventForLater = e;
    installButton.classList.remove("hidden");
});

// Handle the click event on the installButton
installButton.addEventListener('click', async () => {
    const storedEvent = window.eventForLater;
    // If there's no stored event, just return
    if (!storedEvent) {
        return;
    }
    // Otherwise, show the install prompt
    storedEvent.prompt();
    // We don't need the stored event anymore
    window.eventForLater = null;
    installButton.classList.add("hidden");
});

// Add a listener for the 'appinstalled' event
window.addEventListener('appinstalled', (evt) => {
    // We don't need the install prompt anymore
    window.eventForLater = null;
});
