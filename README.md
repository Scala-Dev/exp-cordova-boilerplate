#Prerequisites:
node.js v0.12.7 and npm@2.14.0 are recommended

To build the app for Android you will need a recent version of the Android SDK installed
To build the app for iOS you will need a recent version of Xcode installed

To install the Android SDK on OS X with homebrew, run the following
```
brew install android
android
```
Select and install SDK 22 or greater

#Project Setup
To install the project dependencies run the following
```
npm install -g cordova gulp bower
npm install
bower install
cordova platform add android
cordova plugins restore
```

#Get Started
Dig in and modify the files under `/src/`

This is a consumer app-- you must create a consumer app under the Consumer Apps tab of your organization and download the credentials and place the `consumerApp-credentials.json` file at `src/app/consumerApp-credentials.json`. This allows the app to connect to have permission to read data from your organization.

When you are ready to run the app, change directory into the project directory
```
gulp build && cordova run android
```

If you'd rather skip the default angular material example, you can clean the /www directory and build a very plain experience

Be sure to set your device UUID and secret in src/examples/basic/index.html
```
gulp clean
gulp build-plain && cordova run android
```

#Change icons and splash
Changing the mobile icons and splash screen is not as straightforward as replacing the `icon.png` and `splash.png` in the root directory. We need a lot of variants to be generated, and we do so with some libraries:

1. Install two utilities using npm:
```
npm install -g cordova-icon
npm install -g cordova-splash
```

2. Set the desired `icon.png` and `splash.png` assets into the root directory. Note that the splash image should be of size 2208 x 2208.

3. Run the utilities, this will generate all the required variants, but they won't yet be in the right location in the file system.
```
cordova-icon
cordova-splash
```

4. Remove the old assets, if they're present.
```
sudo rm -rf ./res
```

5. Move the generated files into a different spot. We are relocating them out of the `/platforms/` subdirectory because `/platforms/` is in the gitignore file.
For the android platform:
```
mkdir -p ./res/android/; cp -r ./platforms/android/res/** ./res/android
```
For the ios platform
```
mkdir -p ./res/ios/icons; mkdir -p ./res/ios/splash; cp -r ./platforms/ios/EXP\ Mobile/Images.xcassets/AppIcon.appiconset/** ./res/ios/icons; cp -r ./platforms/ios/EXP\ Mobile/Images.xcassets/LaunchImage.launchimage/** ./res/ios/splash
```
