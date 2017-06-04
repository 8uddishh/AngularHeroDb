/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      // Tomare: one needs to map new modules here for angular to load the modules
      // firebase
      'angularfire2': 'npm:angularfire2',
      'firebase': 'npm:firebase',
      'lodash': 'npm:lodash',
      'toastr': 'npm:toastr',
      'jquery': 'npm:jquery'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        main: 'Rx.js',
        defaultExtension: 'js'
      },

      // Tomare: one needs to tell where the starting script is for systemjs to load module
      'angularfire2': {
        main: 'bundles/angularFire2.umd.js',
        defautExtension: 'js'
      },
      'firebase': {
        main: 'firebase.js',
        defaultExtension: 'js'
      },
      'lodash': {
        main: 'lodash.js',
        defaultExtension: 'js'
      },
      'jquery': {
        main: 'dist/jquery.min.js',
        defaultExtension: 'js'
      },
      'toastr': {
        main: 'toastr.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
