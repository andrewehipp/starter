/**
 * Avoid `console` errors in browsers that lack a console.
 *
 * @namespace Console
 * @type {function}
 */
(function () {

    // Placeholder for assigning the tested method.
    var method;

    // An empty function. If the browser doesn't have support for a console
    // method reference this empty one.
    var noop = function () {};

    // Array of methods to test for.
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];

    // The number of methods to test for.
    var length = methods.length;
    var console = (window.console = window.console || {});

    // Assigns an empty function to the desired console method
    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

}());





/**
 * jQuery reference to the document
 */
var $doc =  $(document);

/**
 * jQuery reference to the window
 */
var $win =  $(window);

/**
 * jQuery reference to the body tag
 */
var $body = $('body');





/**
 * An events object that lets you prevent javascript queuing.
 *
 * @namespace Events
 * @type {Object}
 */
var events = {

    /**
     * Default event timer
     *
     * @memberOf Events
     * @type {Number}
     */
    timer: 2000,

    /**
     * Wether an event called with events.detectEvents is currently running.
     *
     * @memberOf Events
     * @type {Boolean}
     */
    eventsLocked: false,

    /**
     * Run a function and prevent other functions called with this method from
     * firing until the timeout finishes.
     *
     * @memberOf Events
     * @param {function} functionToRun - Method to run a function if no events
     * are happening
     * @param {number=} timer - Optional timer parameter to override default.
     */
    detectEvents: function (functionToRun, timer) {

        var _this = this;

        // If no timer is passed use the default
        var _timer = timer || _this.timer;

        if (!_this.eventsLocked) {

            _this.eventsLocked = true;

            setTimeout(function () {
                _this.eventsLocked = false;
            }, _timer);

            functionToRun();

        }

    }
};





/**
 * Reusable Active State toggle function. To toggle 'is-active' on a different
 * element add data-target('.class') or data-target('#id')
 *
 * @namespace Toggle
 * @param {event} The event
 */
$(document.body).on('click', '.js-toggle-active', function (e) {

    e.preventDefault();

    // Store $this as clicked
    var _this =  $(this); // [1]

    // Check if data-target is set, and store it as _data
    var data =   _this.data('target'); // [2]

    // If data-target was set pass it through jQuery and use it as the target,
    // or assume the clicked element.
    var target = data ? $(data) : _this; // [3]

    target.toggleClass('is-active');

});
