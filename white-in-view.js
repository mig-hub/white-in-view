function whiteInView(offsetTop, offsetBottom, isPercentage) {

    'use strict';

    var inViewElems       = document.querySelectorAll('.white-in-view-check'), 
        inViewElemsLength = inViewElems.length, 
        bounds            = null, 
        isInView          = false, 
        offsetTop         = offsetTop || false, 
        offsetBottom      = offsetBottom || false, 
        isPercentage      = isPercentage || false;

    function checkBounds() {
        for(var i = 0; i < inViewElemsLength; i++) {

            bounds = inViewElems[i].getBoundingClientRect();

            if ( isPercentage ) {
                if ( offsetBottom ) bounds.offsetBottom = offsetBottom * window.innerHeight / 100;
                if ( offsetTop ) bounds.offsetTop = offsetTop * window.innerHeight / 100;
            }

            isInView = bounds.top < (window.innerHeight - bounds.offsetBottom) && bounds.bottom > (0 + bounds.offsetTop);

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
