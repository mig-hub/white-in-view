function whiteInView() {

    'use strict';

    var inViewElems       = document.querySelectorAll('.white-in-view-check'), 
        inViewElemsLength = inViewElems.length, 
        bounds            = null, 
        isInView          = false, 
        offsetTop         = null, 
        offsetBottom      = null, 
        isPercentage      = null ,
        current           = null;

    function checkBounds() {
        for(var i = 0; i < inViewElemsLength; i++) {

            bounds              = inViewElems[i].getBoundingClientRect();
            offsetTop           = inViewElems[i].getAttribute('data-offset-top') ? parseInt(inViewElems[i].getAttribute('data-offset-top')) : 0;
            offsetBottom        = inViewElems[i].getAttribute('data-offset-bottom') ? parseInt(inViewElems[i].getAttribute('data-offset-bottom')) : window.innerHeight;
            isPercentage        = inViewElems[i].getAttribute('data-percentage') && inViewElems[i].getAttribute('data-percentage') === 'true';

            if ( isPercentage ) {
                if ( offsetBottom ) offsetBottom = offsetBottom * window.innerHeight / 100;
                if ( offsetTop ) offsetTop = offsetTop * window.innerHeight / 100;
            }

            isInView = bounds.top < (window.innerHeight - offsetBottom) && bounds.bottom > (0 + offsetTop);

            if ( isInView ) {
                inViewElems[i].classList.add('white-is-in-view');
            } else {
                inViewElems[i].classList.remove('white-is-in-view');
            }

        }
    }

    function checkInView() {
        requestAnimationFrame(function() {
            checkBounds();
            checkInView();
        })
    }

    checkInView();

}
