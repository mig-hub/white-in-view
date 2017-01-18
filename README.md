# white-in-view
A simple script to check whether an element is in the viewport.

# Installation

First of all, download the script package from here or from Bower
```
bower install white-in-view
```

Include the `white-in-view.min.js` script before the closing `</body>` tag.
```
<script src="PATH/TO/SCRIPT/white-in-view.min.js"></script>
```
Assign the `.white-in-view-check` class to each element you want to apply the script to.

After that, call the `whiteInView.init()` function. That's it.

Once an element enters the defined viewport the script applies the `.white-is-in-view` CSS class, then it's up to you to make the stuff do some magic.

Check the section below for a list of the parameters to use.

# Parameters

Here's an example of an element with all the parameters applied on it.
```
<div class="my-element white-in-view-check" data-offset-top="150" data-offset-bottom="250" data-percentage="true"></div>
```

## data-offset-top
The amount (in PX or %) of the vertical offset from the top.

## data-offset-bottom
The amount (in PX or %) of the vertical offset from the bottom.

## data-percentage
Whether the offset values are in percentage (related to the window height) instead of px.

# Events

## whiteInView.onInit
Triggered on init.

```
window.addEventListener('whiteInView.onInit', function() {
    // Do stuff ...
});
```

## whiteInView.onElementInView
Triggered when an element enters its viewport.
```
document.querySelector('.my-element').addEventListener('whiteInView.onElementInView', function() {
    // Do stuff ...
});
```

## whiteInView.onElementOutView
Triggered when an element exits its viewport.
```
document.querySelector('.my-element').addEventListener('whiteInView.onElementOutView', function() {
    // Do stuff ...
});
```

# Compatibility
The script has been tested on:

- Chrome 55
- Firefox 50
- Safari 9.1
- Opera 42
- Opera Neon 1