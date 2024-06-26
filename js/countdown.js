/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = 0,
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    "UTC",
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};




(function ($) {

  $.fn.downCount = function (options, callback) {
      var settings = $.extend({
              date: null,
              offset: null
          }, options);

      // Throw error if date is not set
      if (!settings.date) {
          $.error('Date is not defined.');
      }

      // Throw error if date is set incorectly
      if (!Date.parse(settings.date)) {
          $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
      }

      // Save container
      var container = this;

      /**
       * Change client's local date to match offset timezone
       * @return {Object} Fixed Date object.
       */
      var currentDate = function () {
          // get client's current date
          var new_date = new Date()

          return new_date;
      };

      /**
       * Main downCount function that calculates everything
       */
      function countdown () {
          var target_date = new Date(settings.date), // set target date
              current_date = currentDate(); // get fixed current date

          // difference of dates
          var difference = target_date - current_date;

          // if difference is negative than it's pass the target date
          if (difference < 0) {
              // stop timer
              clearInterval(interval);

              if (callback && typeof callback === 'function') callback();

              return;
          }

          // basic math variables
          var _second = 1000,
              _minute = _second * 60,
              _hour = _minute * 60,
              _day = _hour * 24;

          // calculate dates
          var days = Math.floor(difference / _day),
              hours = Math.floor((difference % _day) / _hour),
              minutes = Math.floor((difference % _hour) / _minute),
              seconds = Math.floor((difference % _minute) / _second);

              // fix dates so that it will show two digets
              days = (String(days).length >= 2) ? days : '0' + days;
              hours = (String(hours).length >= 2) ? hours : '0' + hours;
              minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
              seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

          // based on the date change the refrence wording
          var ref_days = (days === 1) ? 'РґРЅРё' : 'РґРЅРё',
              ref_hours = (hours === 1) ? 'С‡Р°СЃС‹' : 'С‡Р°СЃС‹',
              ref_minutes = (minutes === 1) ? 'РјРёРЅ' : 'РјРёРЅ',
              ref_seconds = (seconds === 1) ? 'СЃРµРє' : 'СЃРµРє';

          // set to DOM
          container.find('.days').text(days);
          container.find('.hours').text(hours);
          container.find('.minutes').text(minutes);
          container.find('.seconds').text(seconds);

          container.find('.days_ref').text(ref_days);
          container.find('.hours_ref').text(ref_hours);
          container.find('.minutes_ref').text(ref_minutes);
          container.find('.seconds_ref').text(ref_seconds);
      };
      
      // start
      var interval = setInterval(countdown, 1000);
  };

})(jQuery);