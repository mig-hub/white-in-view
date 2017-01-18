'use strict';

function whiteInView() {}

whiteInView.prototype = {

    inViewElems: document.querySelectorAll('.white-in-view-check'), 
    inViewElemsLength: document.querySelectorAll('.white-in-view-check').length, 

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
                this.inViewElems[i].classList.add('white-is-in-view');
            } else {
                this.inViewElems[i].classList.remove('white-is-in-view');
            }

        }
    }, 
    
    init: function() {

        var self = this;

        requestAnimationFrame(function() {
            self.checkBounds();
            self.init();
        });

    }

}

var whiteInView = Object.create(whiteInView.prototype);
