Find article here: https://medium.com/nollie-studio/creating-a-smooth-and-interactive-video-timeline-with-react-native-and-ffmpeg-8c6624ad90ca

---

### Install dependencies
  * install node dependencies

```bash
    npm i
```
    
  * install android SDK
    > Install API Android 24 (7.0 Nougat) or higher
    
    > Install NDK 22.1.7171670 or higher
    
---

### Edit File
Edit the file android/local.properties, in which you will write the local path of the android sdk and the NDK

```bash
    sdk.dir= local path/Android/Sdk
    ndk.dir= local path/Android/Sdk/ndk/22.1.7171670
```
use '\\\\' on windows

---

### ADB Android Device Unauthorized

It's likely that the device is no longer authorized on ADB for whatever reason.

1. Check if authorized:

```bash
<ANDROID_SDK_HOME>\platform-tools>adb devices
List of devices attached
4df798d76f98cf6d        unauthorized
```
2. Revoke USB Debugging on phone

If the device is shown as unauthorized, go to the developer options on the phone and click "Revoke USB debugging authorization" 

4. Restart ADB Server:

Then restarted adb server
```bash
adb kill-server
adb start-server
```

4. Reconnect the device

The device will ask if you are agree to connect the computer id. You need to confirm it.

5. Now Check the device

It is now authorized!
```bash
adb devices
<ANDROID_SDK_HOME>\platform-tools>adb devices
List of devices attached
4df798d76f98cf6d        device
```

---

### Run app

use npm to interactively preview the app on a mobile device or virtual device

```bash
 npm run android
```

---

### Create debug apk

Write following commands
 
Linux:
```bash
npm run build-android && cd android && ./gradlew assembleDebug
```

Linux:
```bash
npm run build-android && cd android && gradlew.bat assembleDebug
```


Then You can find your apk here:
> app/build/outputs/apk/
