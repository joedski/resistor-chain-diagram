# yay

exports.config =
  files:
    javascripts:
      joinTo: 'app.js'
      order:
        before: [
          /[\/\\]jquery[\/\\]/
          /[\/\\]underscore[\/\\]/
          /[\/\\]backbone[\/\\]/
        ]
        after: [
          /(^|[\/\\])init\.js$/
        ]

    stylesheets:
      joinTo: 'app.css'

    templates:
      joinTo: 'app.js'
