/*------------------------------------*\
 # Avoid `console` errors in browsers that lack a console.
\*------------------------------------*/
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());





/*------------------------------------*\
    #Global Variables
\*------------------------------------*/
var $doc = 	$(document);
var $win = 	$(window);
var $body = $('body');





$doc.ready(function(){


    /*------------------------------------*\
        #GLOBAL PROPERTIES AND METHODS
    \*------------------------------------*/

    /**
     * [1] Global default timer
     * [2] Property to test against to determine if an event is occuring.
     * [3] Method to run a function if no events are happening.
     * [4] Optional timer parameter to override default.
     */
    var global = {
        timer: 2000, // [1]
        events: true, // [2]
        detectEvents: function(functionToRun, timer){ // [3 & 4]

            var _timer = timer || global.timer; // [4]

            if(global.events){

                global.events = false;

                setTimeout(function(){
                    global.events = true;
                }, _timer);

                functionToRun();

            }

        }
    };





	/*------------------------------------*\
	    #TOGGLE ACTIVE STATE
	\*------------------------------------*/

    /**
     * Reusable Active State toggle function. To toggle 'is-active' on a different
     * element add data-target('.class') or data-target('#id')
     *
     * [1] Store $this as clicked
     * [2] Check if data-target is set, and store it as _data
     * [3] If data-target was set pass it through jQuery and use it as the
     *     target, or assume the clicked element.
     */
    $(document.body).on('click', '.js-toggle-active', function(e){

        e.preventDefault();

        var _this =  $(this); // [1]
        var data =   _this.data('target'); // [2]

        var target = data ? $(data) : _this; // [3]

            target.toggleClass('is-active');

    });



});
