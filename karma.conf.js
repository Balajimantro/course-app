// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular', 'viewport'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-viewport'),
        require('karma-spec-reporter')
      ],
      client: {
        jasmine: {
          // you can add configuration options for Jasmine here
          // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
          // for example, you can disable the random execution with `random: false`
          // or set a specific seed with `seed: 4321`
        },
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      jasmineHtmlReporter: {
        suppressAll: true // removes the duplicated traces
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage/TF_Pre_Launch'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ]
      },
      reporters: ['progress', 'kjhtml', 'spec'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      // If we want run spec files in chrome browser then
      // comment out ChromeHeadlessCustom with customLaunchers and use Chrome as browsers
      // browsers: ['Chrome'],
      autoWatch: true,
      browsers: ['ChromeHeadlessCustom'],
      browserConsoleLogOptions: { level: "debug", format: "%m", terminal: false},
      customLaunchers: {
        'ChromeHeadlessCustom': {
          base: 'Chrome',
          flags: [
            '--headless',
            '--remote-debugging-port=9222',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-translate',
            '--disable-extensions',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage', // Add this flag for environments with limited shared memory
            '--disable-software-rasterizer', // Prevents issues with software rendering
            '--disable-web-security' 
          ],
          debug: true
        }
      },
      singleRun: true
    });
  };