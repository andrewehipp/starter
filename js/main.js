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
var $doc = 	$(document),
	$win = 	$(window),
	$body = $('body');





$doc.ready(function(){


    /*------------------------------------*\
        #GLOBAL PROPERTIES AND METHODS
    \*------------------------------------*/

    /**
     * [1] Global default timer
     * [2] Property to test against to determine if an event is occuring.
     * [3] Method to run a function if no events are happening.
     */
    var $global = {
        timer: 300, // [1]
        events: true, // [2]
        detectEvents: function(functionToRun){ // [3]

            if($global.events){

                $global.events = false;

                setTimeout(function(){
                    $global.events = true;
                }, $global.timer);

                functionToRun();

            }

        }
    };





	/*------------------------------------*\
	    #TOGGLE ACTIVE STATE
	\*------------------------------------*/

    /**
     * Reusable Active State toggle function. To toggle active on a different
     * element add data-target('.class') or data-target('#id')
     *
     * [1] Store $this as clicked
     * [2] Check if data-target is set, and store it as $data
     * [3] If data-target was set pass it through jQuery and use it as the
     *     target, or assume the clicked element.
     */
    $('.js-toggle-active').on('click', function(){

        var $clicked =  $(this), // [1]
            $data =     $clicked.data('target'), // [2]

            $target =  $data ? $($data) : $clicked; // [3]

        $target.toggleClass('is-active');

    });



});
