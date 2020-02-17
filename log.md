### (warning) Error running install script for optional dependency: "/private/var/www/antony/node_modules/fsevents: Command failed.
+ Install Xcode
+ Terminal "sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"


### (note) Using Hightlight.js in Vue-Router and Vue.js Dynamic Pages
``` javascript
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const highlightCode = () => {
  const preEl = document.querySelectorAll('pre')

  preEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
}

export default {
    mounted () {
        highlightCode()
    },

    updated () {
        highlightCode()
    }
}
```

### (note) How many content block can there be in one component?
+ Only one
+ eg:
+ Correct
``` html
<template>
  <div class="one"></div>
  </template>
```
+ Incorrect
``` html
<template>
  <div class="one"></div>
  <div class="two"></div>
</template>
```