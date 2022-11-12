# SINERGIA - Cliente Movil para Interactuar con Blockchain

SINERGIA es una iniciativa centrada en la construccion de un conjunto de servicios web tipo REST desplegados en la forma de Swagger, para consumir y manipular funcionalidades proporcionados por la Blockchain de Substrate, utilizando para ello la interface de interoperabilidad substrate-interface-py de Polkascan, de esta manera, el objetivo es ofrecer un esquema amigable y sencillo para acceder a la logica de negocio que se encuentra en una Blockchain, con ello se presenta al programador un enfoque de desarrollo efectivo al momento de abordar aplicaciones de proposito general que utilicen Blockchain.

Este repositorio contiene una aplicacion movil a modo de demostración de ejemplo que permite la interoperabilidad con la infraestructura de servicios de SINERGIA y permite la actualizacion y manipulacion de distintas entidades que se almacenan en una Blockchain.

Se utilizan para el desarrollo un conjunto de buenas practicas que permite la mantenibilidad, con el fin de que cualquier desarrollador pueda hacer cambios, sin que esto represente un proceso traumatico.

La aplicacion Movil esta construida con Cordova y el Framework Javascript Vue.JS, con Vuetify, Vuex, Vue-Router y Axios.


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
