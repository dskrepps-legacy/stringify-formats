var test = require('tape');
var stringifyFormats = require('../');


var fixture = {
	foo: 'bar',
	joke: {
		7: ['ate', 9],
	},
};

var specialFixtures = {
	/* CSV only supports simple structures */
	'.csv': [ {
		foo: 'bar',
		joke: '7 ate 9',
	} ],
	/* XML is... XML */
	'.xml': {foo:{$t:'bar'}},
}


test('Each stringifier creates expected string', function (t) {
	
	for (var format in stringifyFormats) {
		
		for (var stringifier in stringifyFormats[format]) {
			
			var _stringifier = require(stringifier);
			var expected = require('fs').readFileSync('./test/formats/test'+format, {encoding: 'utf-8'})
				.replace(/\s/g, '');
			
			var obj = specialFixtures[format] || fixture;
			
			var result = stringifyFormats[format][stringifier](_stringifier, obj).replace(/\s/g, '');
			
			t.deepEqual(result, expected, 'object stringified by ' + stringifier + ' should equal test'+format);
		
		}
		
	}
	
	t.end();
	
});