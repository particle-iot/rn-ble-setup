# rn-ble-setup

Full instructions can be found in the [Particle documentation](http://localhost:8080/reference/device-os/wifi-setup-options/).


The react native example is designed to be built using [Expo](https://expo.dev/). Using Expo EAS is fast and easy, and eliminates the need to install the full development environments (Xcode for iOS and Android Studio for Android) because it can build in the cloud. The free tier allows 30 cloud builds per month, though iOS counts as 2 builds. You can also pay on demand, or purchase a production plan with a large number of builds. Additionally, the Expo cloud build allows you to build iOS apps from Windows, which is not normally possible.

You can, however, export a native project that can be built with native development tools, if you prefer.

- Clone [this repo](https://github.com/particle-iot/rn-ble-setup) from Github.
- Make sure node 16 or above is installed with npm 8 or above. 
- You will also need a global install of [yarn](https://classic.yarnpkg.com/lang/en/docs/install/).

Install the dependencies using:

```
cd rn-ble-setup
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` is because the setup application uses `react@18` and the setup library uses `react@^17.0.2`, but does work properly with `react@18` and that option allows the peer dependency in the setup library to be ignored with node 16.

You will need to configure two settings in app.json in the project. These should be set to your domain instead of Particle:

```
    "ios": {
      "bundleIdentifier": "io.particle.blesetup",
```

```
    "android": {
      "package": "io.particle.blesetup",
```


You will also need to install the Expo [eas-cli](https://docs.expo.dev/eas-update/getting-started/) globally:

```
npm install --global eas-cli
```

If you are going to be using cloud builds, you should also install the **Expo Go** mobile app on your iOS and Android devices.

### iOS development app - react native

Building an iOS app using Expo EAS is as easy as:

```
npx eas build -p ios --profile development 
```

This will do a cloud build of the iOS app, and eliminates the need to install a local development environment. In the Expo EAS cloud build, iOS builds are more expensive, as they count as two builds in the free plan, and are $2 instead of $1 a la carte. You may want to do initial development and testing on Android for this reason.

Follow the instructions when prompted to connect to your Apple developer account, register your device with Expo (if you have not already done so), and install and run the demo app.


### Android development app - react native

```
npx eas build -p android --profile development 
```

This will do a cloud build of the Android app, and eliminates the need to install a local development environment.

Follow the instructions when prompted to register your device with Expo (if you have not already done so), and install and run the demo app.


### Export native source

Instead of using the Expo EAS cloud build service you can export source to build using native tools. Using native tools you can do as many build as you want at no charge.

This will create a project that can be opened in Xcode on a Mac to build an iOS mobile app:

```
npx eas build -p ios --profile development --local
```

This will create project that can be opened in Android Studio to build an Android app:

```
npx eas build -p android --profile development --local
```
