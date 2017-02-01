# white-in-view
A simple vanilla JavaScript library to check whether an element is into the viewport.

# Installation

First, download the script package directly from Github or via Bower
```
bower install white-in-view
```

Include the `white-in-view.min.js` script before the closing `</body>` tag.
```html
<script src="PATH/TO/SCRIPT/white-in-view.min.js"></script>
```
Create a new instance of `WhiteInView()` and run it.
```javascript
// Creating the new instance
var myInstance = new WhiteInView('.my-class');

// Now run the .init() method
myInstance.init();
```

Once an element enters the viewport the script applies the `.white-is-in-view` CSS class, and if the element is not into the viewport the `.white-is-out-view` class is applied.

You can change those classes using the options parameter when declaring the instance.

# HTML attributes

Here's an example of an element with all the custom attributes applied on it.
```html
<div class="my-class" data-offset-top="150" data-offset-bottom="250" data-percentage="true"></div>
```

## data-offset-top (int)
The amount (in PX or %) of the vertical offset from the top.

## data-offset-bottom (int)
The amount (in PX or %) of the vertical offset from the bottom.

## data-percentage (bool)
Whether the offset values are in percentage (related to the window height) instead of px.

# Options

## inViewClass (string)
The CSS class that's applied to the element(s) that are into the viewport. Default: `white-is-in-view`.

```javascript
var myInstance = new WhiteInView(mySelector, {
    inViewClass: 'my-custom-class'
});
```

## outViewClass (string)
The CSS class that's applied to the element(s) that ARE NOT into the viewport. Default: `white-is-out-view`.

```javascript
var myInstance = new WhiteInView(mySelector, {
    outViewClass: 'my-custom-class'
});
```

# Methods

## .init()
Initializes the WhiteInView instance. Triggers the `whiteInView.onInit` event on the `window` element.

```
myInstance.init();
```

## .stop()
Stops the WhiteInView instance. Triggers the `whiteInView.onStop` event on the element(s) that match(es) the selector.

```
myInstance.stop();
```

## .reload()
Reloads the WhiteInView instance (i.e. if you dynamically added new elements). Triggers the `whiteInView.onReload` event on the element(s) that match(es) the selector.

```
myInstance.reload();
```

# Events

## whiteInView.onInit
Triggered on init.

```javascript
window.addEventListener('whiteInView.onInit', function() {
    // Do stuff ...
});
```

## whiteInView.onStop
Triggered when the .stop() method is called.

```javascript
window.addEventListener('whiteInView.onStop', function() {
    // Do stuff ...
});
```

## whiteInView.onReload
Triggered when the .reload() method is called.

```javascript
window.addEventListener('whiteInView.onReload', function() {
    // Do stuff ...
});
```

## whiteInView.onElementInView
Triggered when an element enters its viewport.
```javascript
document.querySelector('.my-element').addEventListener('whiteInView.onElementInView', function() {
    // Do stuff ...
});
```

## whiteInView.onElementOutView
Triggered when an element exits its viewport.
```javascript
document.querySelector('.my-element').addEventListener('whiteInView.onElementOutView', function() {
    // Do stuff ...
});
```

# Compatibility
The script has been tested (and works) on:

- Chrome 55
- Firefox 50
- Safari 9.1
- Opera 42
- Opera Neon 1
- Microsoft Edge 38

Sorry IE11 users, you will have to wait a bit more ¯\_ツ_/¯

P.S.
No, IE10 won't be supported  (⌐■_■)