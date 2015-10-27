Prerequisites:

(OS X) npm and brew

```
brew install android
android
```

Select and install SDK 22

```
npm install -g cordova gulp bower
```

Dig in and modify the files under src/examples/angular

Be sure to set your device UUID and secret in src/examples/angular/index.html

When you are ready to run the app, change directory into the project directory

```
npm install
bower install
cordova platform add android
cordova plugins restore
gulp build && cordova run android
```

If you'd rather skip the default angular material example, you can clean the /www directory and build a very plain experience

Be sure to set your device UUID and secret in src/examples/basic/index.html

```
gulp clean
gulp build-plain && cordova run android
```
