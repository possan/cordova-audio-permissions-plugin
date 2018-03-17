package se.possan.cordova;

import android.Manifest;
import android.content.pm.PackageManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.apache.cordova.PermissionHelper;
import org.json.JSONException;

public class AudioPermissions extends CordovaPlugin {
    private static final String TAG = "AudioPermissions";

    private CallbackContext requestCallbackContext;

    @Override
    public void initialize(final CordovaInterface cordova, CordovaWebView webView) {
        LOG.v(TAG, "Initialize");
        super.initialize(cordova, webView);
    }

    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException
    {
        for(int r : grantResults)
        {
            if(r == PackageManager.PERMISSION_DENIED)
            {
                requestCallbackContext.success("{\"error\":\"permission-denied\"}");
                return;
            }
        }

        requestMissingPermissions();
    }

    public void requestMissingPermissions() {
        if (!PermissionHelper.hasPermission(this, Manifest.permission.RECORD_AUDIO)) {
            PermissionHelper.requestPermission(this, 1, Manifest.permission.RECORD_AUDIO);
            return;
        }

        if (!PermissionHelper.hasPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
            PermissionHelper.requestPermission(this, 2, Manifest.permission.WRITE_EXTERNAL_STORAGE);
            return;
        }

        requestCallbackContext.success("{\"success\":true}");
    }

    @Override
    public boolean execute(final String action, final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        LOG.v(TAG, "Executing action: " + action);

        if ("check".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (!PermissionHelper.hasPermission(AudioPermissions.this, Manifest.permission.RECORD_AUDIO)) {
                        callbackContext.success("{\"error\":\"audio\"}");
                        return;
                    }

                    if (!PermissionHelper.hasPermission(AudioPermissions.this, Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
                        callbackContext.success("{\"error\":\"storage\"}");
                        return;
                    }

                    callbackContext.success("{\"success\":true}");
                }
            });
            return true;
        }

        if ("request".equals(action)) {
            requestCallbackContext = callbackContext;
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    requestMissingPermissions();
                }
            });
            return true;
        }

        return false;
    }
}
