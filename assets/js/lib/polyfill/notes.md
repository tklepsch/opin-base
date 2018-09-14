In order to get Polyfill to work, it must be taken from dist/polyfill.js file within a @babel/polyfill npm release and then added before all other theme js in html

NOTE: Do not require this via browserify etc, use @babel/polyfill.

https://babeljs.io/docs/en/babel-polyfill/#usage-in-browser
