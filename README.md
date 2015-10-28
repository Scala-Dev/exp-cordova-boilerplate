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
Dig in and modify the files under src/examples/angular

Be sure to set your device UUID and secret in src/examples/angular/index.html

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
