
/* Common patterns */
function stringify (serializer, data, opts) {
	return serializer.stringify(data, opts);
}

function self (serializer, data, opts) {
	return serializer(data, opts);
}


/* { ext: { moduleName: function(module, data, opts) } } */
module.exports = {
	'.cson': { 'cson-parser': stringify },
	'.csv': { 'to-csv': self },
	'.hjson': { 'hjson': stringify },
	'.ini': { 'ini': stringify },
	'.json': {
		'path': function (_, data) {
			return JSON.stringify(data);
		},
	},
	'.json5': { 'json5': stringify },
	'.xml': {
		'xml2json': function (xml2json, data, opts) {
			return xml2json.toXml(JSON.stringify(data), opts);
		},
	},
	'.yaml': { 'js-yaml': jsYaml },
	'.yml': { 'js-yaml': jsYaml },
};

function jsYaml (jsYaml, data, opts) {
	return jsYaml.safeDump(data, opts);
}