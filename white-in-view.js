'use strict';

function whiteInView() {}

whiteInView.prototype = {

    inViewElems: document.querySelectorAll('.white-in-view-check'), 
    inViewElemsLength: document.querySelectorAll('.white-in-view-check').length, 

    events: {
        onInit: new Event('whiteInView.onInit'), 
        onElementInView: new Event('whiteInView.onElementInView'), 
        onElementOutView: new Event('whiteInView.onElementOutView')
    }, 

    checkBounds: function() {
        for(var i = 0; i < this.inViewElemsLength; i++) {

            var bounds       = this.inViewElems[i].getBoundingClientRect();
            var offsetTop    = this.inViewElems[i].getAttribute('data-offset-top') ? parseInt(this.inViewElems[i].getAttribute('data-offset-top')) : 0;
            var offsetBottom = this.inViewElems[i].getAttribute('data-offset-bottom') ? parseInt(this.inViewElems[i].getAttribute('data-offset-bottom')) : window.innerHeight;
            var isPercentage = this.inViewElems[i].getAttribute('data-percentage') && this.inViewElems[i].getAttribute('data-percentage') === 'true';

            if ( isPercentage ) {
                if ( offsetBottom ) offsetBottom = offsetBottom * window.innerHeight / 100;
                if ( offsetTop ) offsetTop = offsetTop * window.innerHeight / 100;
            }

            var isInView = bounds.top < (window.innerHeight - offsetBottom) && bounds.bottom > (0 + offsetTop);

            if ( isInView ) {

                if ( !this.inViewElems[i].onElementInViewTriggered ) this.inViewElems[i].dispatchEvent(this.events.onElementInView);
                this.inViewElems[i].onElementInViewTriggered = true;
                this.inViewElems[i].onElementOutViewTriggered = false;

                this.inViewElems[i].classList.add('white-is-in-view');

            } else {

                if ( !this.inViewElems[i].onElementOutViewTriggered ) this.inViewElems[i].dispatchEvent(this.events.onElementOutView);
                this.inViewElems[i].onElementInViewTriggered = false;
                this.inViewElems[i].onElementOutViewTriggered = true;

                this.inViewElems[i].classList.remove('white-is-in-view');

            }

        }
    }, 
    
    init: function() {

        window.dispatchEvent(this.events.onInit);
        this.loop();

    }, 

    loop: function() {

        var self = this;

        requestAnimationFrame(function() {
            self.checkBounds();
            self.loop();
        });

    }

}

var whiteInView = Object.create(whiteInView.prototype);
