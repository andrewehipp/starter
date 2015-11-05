/**
 * Avoid `console` errors in browsers that lack a console.
 */
(function() {

    // Placeholder for assigning the tested method.
    var method;

    // An empty function. If the browser doesn't have support for a console
    // method reference this empty one.
    var noop = function() {};

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
 * @type {jQuery}
 */
var $doc =  $(document);

/**
 * jQuery reference to the window
 * @type {jQuery}
 */
var $win =  $(window);

/**
 * jQuery reference to the body tag
 * @type {jQuery}
 */
var $body = $('body');





/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds.
 *
 * @param {function} func Function you want debounced
 * @param {integer} wait Time in ms to wait
 * @param {boolean} immediate If `immediate` is passed, trigger the function on
 * the leading edge, instead of the trailing
 *
 * @author http://davidwalsh.name/javascript-debounce-function
 */
function debounce(func, wait, immediate) {

    var timeout;

    return function() {
        var context = this;
        var args = arguments;

        var later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }

    };

}




/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 */
throttle = function(func, wait, options) {

    var context, args, result;
    var timeout = null;
    var previous = 0;

    if (!options) {
        options = {};
    }

    var later = function() {
        previous = options.leading === false ? 0 : getNow();
        timeout = null;
        result = func.apply(context, args);

        if (!timeout) {
            context = args = null;
        }

    };

    return function() {

        var now = getNow();

        if (!previous && options.leading === false) {
            previous = now;
        }

        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            result = func.apply(context, args);

            if (!timeout) {
                context = args = null;
            }

        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }

        return result;

    };

};





/**
 * Get current timestamp
 */
function getNow() {
    return Date.now() || function() {
        return new Date().getTime();
    }
}




/**
 * Reusable Active State toggle function. To toggle 'is-active' on a different
 * element add data-target('.class') or data-target('#id')
 *
 * @namespace
 */
$(document.body).on('click', '.js-toggle-active', function(e) {

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
