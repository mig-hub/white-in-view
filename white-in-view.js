'use strict';

function WhiteInView(selector, opts) {

    // No selector? WTF dude?! ಠ_ಠ
    if (selector === undefined)
        throw new Error('No elements selected for the WhiteInView instance.');

    this.setElements = function() {

        var elems = document.querySelectorAll(selector);

        this.elems = [];
        this.isElemsList = isNodeList(elems);

        // If you selected a single item I magically push it into this.elems
        if ( this.isElemsList ) {
            this.elems = elems;
        } else {
            this.elems.push(elems);
        }

        this.elemsLength = this.elems.length;

    }

    // Setting up the elements when creating the instance (⌐■_■)
    this.setElements();
    
    this.running = false;

    // Optional options are optional ¯\_ツ_/¯
    this.opts = {
        inViewClass: (opts && opts.inViewClass) || 'white-is-in-view', 
        outViewClass: (opts && opts.outViewClass) || 'white-is-out-view'
    };

    this.checkBounds = function() {

        for(var i = 0; i < this.elemsLength; i++) {

            // Skipping this loop if the element has "display: none"
            if ( this.elems[i].offsetParent === null ) continue;

            var bounds       = this.elems[i].getBoundingClientRect();
            var offsetTop    = this.elems[i].getAttribute('data-offset-top') ? parseInt(this.elems[i].getAttribute('data-offset-top')) : 0;
            var offsetBottom = this.elems[i].getAttribute('data-offset-bottom') ? parseInt(this.elems[i].getAttribute('data-offset-bottom')) : window.innerHeight;
            var isPercentage = this.elems[i].getAttribute('data-percentage') && this.elems[i].getAttribute('data-percentage') === 'true';

            // Calculating percentages instead of pixels
            if ( isPercentage ) {
                if ( offsetBottom ) offsetBottom = offsetBottom * window.innerHeight / 100;
                if ( offsetTop ) offsetTop = offsetTop * window.innerHeight / 100;
            }

            // Impossible-to-understand algorithm
            var isInView = bounds.top > (0 + offsetTop) && bounds.bottom < (window.innerHeight - offsetBottom);

            if ( isInView ) {

                if ( !this.elems[i].onElementInViewTriggered ) this.elems[i].dispatchEvent(this.events.onElementInView);

                this.elems[i].onElementInViewTriggered = true;
                this.elems[i].onElementOutViewTriggered = false;

                this.elems[i].classList.add(this.opts.inViewClass);
                this.elems[i].classList.remove(this.opts.outViewClass);

            } else {

                if ( !this.elems[i].onElementOutViewTriggered ) this.elems[i].dispatchEvent(this.events.onElementOutView);
                
                this.elems[i].onElementInViewTriggered = false;
                this.elems[i].onElementOutViewTriggered = true;

                this.elems[i].classList.add(this.opts.outViewClass);
                this.elems[i].classList.remove(this.opts.inViewClass);

            }

        }
    };

    this.init = function() {
        window.dispatchEvent(this.events.onInit);
        this.running = true;
        this.loop();
    };

    this.stop = function() {
        window.dispatchEvent(this.events.onStop);
        this.running = false;
    };

    this.reload = function() {
        window.dispatchEvent(this.events.onReload);
        this.running = true;
        this.setElements();
        this.loop();
    }

    this.loop = function() {

        if ( !this.running ) return;

        var self = this;

        requestAnimationFrame(function() {
            self.checkBounds();
            self.loop();
        });

    };

    this.events = {
        onInit: new Event('whiteInView.onInit'), 
        onStop: new Event('whiteInView.onStop'), 
        onReload: new Event('whiteInView.onReload'), 
        onElementInView: new Event('whiteInView.onElementInView'), 
        onElementOutView: new Event('whiteInView.onElementOutView')
    };

    function isNodeList(elems) {
        return toString.call(elems) === '[object NodeList]';
    }
    
}
