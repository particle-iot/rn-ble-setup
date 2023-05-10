### Install

1. Clone this git repo
2. Make sure node 16 or above is installed with npm 8 or above
3. npm install

You now have 2 choices!
  (a) you can build the development app (ios or android) that allows you to debug and run the javascript front end. 
  (b) you can export the iOS or Android code base and build locally on your machine
  (c) you can build a release app for google play / apple app store (although this is probably NOT want you want to do with this demo app!)

(a) and (c) above use a build service from Expo.io called EAS. Its free in limited usage! You need an expo account to make it work.

Instructions for the paths above below:

(a)4. npx eas build -p ios --profile development 

- this builds a app using the profile in eas.json called development. Its configured to include the expo dev client and thus will look for a javascript server when it boots up
- you can choose ios or android here (or both!)
- the process will walk you through accessing your apple/google developer accounts - you don't need to enter these if you build locally, this is just for the EAS build service
- for apple, you need to make sure the device you are downloading is in the provisioning profile you are building with. Expo will try and manage some of this mischief and set you on the right path
- after the build is completed, you can install on your phone via the QR link or the URL

(b)4. npx eas build -p ios --profile development --local

- this will create either an ios or android directory locally
- into this directory it will dump the raw code used to run the react native app and project files for xcode or android studio
- you can then open the project files directly in the apps and build the apps 'in the normal way'

(c)4. npx eas build -p ios --profile production

- as I said, you probably don't want to do this. But its possible!

