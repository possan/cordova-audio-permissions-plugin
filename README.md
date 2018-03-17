# Audio Permissions Plugin

Provides a simple way to check and ask for permissions required to record and upload audio using the cordova media plugins.

Works on iOS 7+ and Android 4.? +

## Using it.

    window.plugins.audioPermissions.check(allowed => {
        if (allowed) {
            console.log('You\'re already allowed to record audio.');
            return;
        }

        console.warn('You can not record audio.');
        window.plugins.audioPermissions.request(success => {
            if (success) {
                console.log('You\'re now allowed to record audio.');
            } else {
                console.warn('You did not allow us to record audio.');
            }
        });
    });
