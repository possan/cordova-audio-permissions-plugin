#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface CDVAudioPermissions : CDVPlugin

- (void) check:(CDVInvokedUrlCommand*)command;
- (void) request:(CDVInvokedUrlCommand*)command;

@end
