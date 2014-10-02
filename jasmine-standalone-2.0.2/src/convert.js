'use strict';

var CONVERTER = CONVERTER || (function() {

  var _rates = {
  'in' : {
    'cm' : 2.54,
    'yards' : 0.0277778,
         },
  'cm' : {
    'in' : 2.54,
    'yards' : 0.0109361,
         },
  'litres' : {
    'gallons' : 0.219969,
         },

  };


  return {
        convert : function (args) {
            var from = args.from;
            var to   = args.to;
            var value= args.value;

            if (typeof _rates[from] === 'undefined') {
                throw new Error("unrecognized from-unit");
            }

            if (typeof _rates[from][to] === 'undefined') {
                throw new Error("unrecognized to-unit");
            }
            var converted_value = _rates[from][to] * value;
            converted_value = parseFloat( converted_value.toFixed(2) );
            return converted_value;
        },
        canConvert : function (unit) {
            return (typeof _rates[unit] === 'undefined') ? false : true;
        },
        convertRemote : function (args) {
            var from = args.from;
            var to   = args.to;
            var value= args.value;
            $.ajax({url:"test.txt",success:function(result) {} });

        },
    };

}());
