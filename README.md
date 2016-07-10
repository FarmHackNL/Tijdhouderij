![Tijdhouderij](https://raw.githubusercontent.com/FarmHackNL/Tijdhouderij/master/logo.png "Tijdhouderij")

VIC-Sterksel: app for keeping time without user interaction, using proximity beacons.
## Prepare environment
`npm install -g cordova ionic bower gulp-cli`

Installs Cordova, Ionic, Bower and Gulp globally.

- Cordova: Platform on which Ionic was built
- Ionic: Tool that allows you to build and deploy easily
- Bower: Package manager for frontend libraries
- Gulp: build system

`npm install`

Installs Node.JS libraries, and frontend libraries using Bower.

### Android
- `ionic platform add android`
- `ionic resources`
- `ionic state restore`

`ionic run android`

### iOS
- `ionic platform add ios`
- `ionic resources`
- `ionic state restore`

Now you can open platforms/ios/Tijdhouderij/Tijdhouderij.xcodeproj in XCode.

## Notes
- Do not commit platform.json with a "cordovaPlatforms" value other than [].
- The www/lib folder will contain a lot of files that the app doesn't require, such as source files, docs and examples of libraries. It's highly recommended you remove these before building the app because not doing so will cause a massive increase in app size.
