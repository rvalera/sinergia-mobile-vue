# vuejscli3

## Project setup
```
yarn
npm run cordova-prepare
```

### Compiles and hot-reloads for development in browser
```
npm start
```

### Compiles and hot-reloads for development in a phone (using ADB) or emulator
```
npm run cordova-serve-android
```

### Build android debug .apk (--prod is optional)
```
npm run cordova-build-only-www-android
cd src-cordova
cordova build android --prod
```

### Build android release .apk (Must be sign)
```
npm run cordova-build-android
```

### Build android release .apk (Already signed)
```
npm run cordova-build-only-www-android
cd src-cordova
cordova build android --release --buildConfig
```

### Lints and fixes files
```
npm run lint
```

### All cordova plugins must be installed on `src-cordova`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
