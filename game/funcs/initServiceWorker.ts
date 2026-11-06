const VERSION = 5;

export function initServiceWorker(): void {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    // Only manage the registration used by this game.
    navigator.serviceWorker.getRegistration('/').then(async (registration) => {
        if (registration?.active?.state === 'activated'
            && compareVersion(registration.active.scriptURL, VERSION)) {
            return;
        }

        if (registration) {
            console.log('Service Worker: Version changed');
            const unregistered = await registration.unregister();
            if (!unregistered) {
                throw new Error('Could not unregister the previous Service Worker');
            }

            if (navigator.serviceWorker.controller) {
                window.location.reload();
                return;
            }
        }

        // After reload the old registration is absent, so register the new version.
        const nextRegistration = await navigator.serviceWorker.register(`/sw.js?v=${VERSION}`);
        console.log('Service Worker: Registration succeeded. Scope is ' + nextRegistration.scope);
    }).catch((error) => {
        console.log('Service Worker: Update failed with ' + error);
    });
}

function compareVersion(url: string, version: number): boolean {
    try {
        const value = new URL(url).searchParams.get('v');
        return value !== null && Number(value) === version;
    } catch {
        return false;
    }
}
