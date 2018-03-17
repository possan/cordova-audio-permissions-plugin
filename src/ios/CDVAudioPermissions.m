#import <objc/runtime.h>
#import <Cordova/CDVViewController.h>
#import <AVFoundation/AVFoundation.h>

#import "CDVAudioPermissions.h"

@implementation CDVAudioPermissions

- (void)pluginInitialize {}

- (void) check:(CDVInvokedUrlCommand*)command {
    NSString *_checkCallbackId = command.callbackId;

    AVAudioSession *session = [AVAudioSession sharedInstance];
    AVAudioSessionRecordPermission sessionRecordPermission = [session recordPermission];
    switch (sessionRecordPermission) {
        case AVAudioSessionRecordPermissionUndetermined:
        {
            NSLog(@"Mic permission indeterminate.");
            NSDictionary* payload = @{@"error": @"unknown"};
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:payload];
            [self.commandDelegate sendPluginResult:result callbackId:_checkCallbackId];
            break;
        }

        case AVAudioSessionRecordPermissionDenied:
        {
            NSLog(@"Mic permission denied.");
            NSDictionary* payload = @{@"error": @"permission-denied"};
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:payload];
            [self.commandDelegate sendPluginResult:result callbackId:_checkCallbackId];
            break;
        }

        case AVAudioSessionRecordPermissionGranted:
        {
            NSLog(@"Mic permission granted.");
            NSDictionary* payload = @{@"success": @YES};
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:payload];
            [self.commandDelegate sendPluginResult:result callbackId:_checkCallbackId];
            break;
        }

        default:
            break;
    }
}

- (void) request:(CDVInvokedUrlCommand*)command {
    NSString *_requestCallbackId = command.callbackId;

    [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL granted) {
        if (granted) {
            // Microphone enabled code
            NSDictionary* payload = @{@"success": @YES};
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:payload];
            [self.commandDelegate sendPluginResult:result callbackId:_requestCallbackId];
        }
        else {
            // Microphone disabled code
            NSDictionary* payload = @{@"error": @"not-granted"};
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:payload];
            [self.commandDelegate sendPluginResult:result callbackId:_requestCallbackId];
        }
    }];
}

@end
