## stringify-formats

Provides a list of various modules to stringify objects to differect data formats synchronously with a unified api.

Feel free to suggest more formats or better modules to stringify them with via issue or pull request.

[![NPM](https://nodei.co/npm/stringify-formats.png)](https://nodei.co/npm/stringify-formats/)

#### Formats
| Ext   | format | npm module |
| :---- |:------:| ----------:|
| .cson | [cson](https://github.com/bevry/cson) | [cson-parser](https://www.npmjs.com/package/cson-parser) |
| .csv | [csv](https://en.wikipedia.org/wiki/Comma-separated_values) | [to-csv](https://www.npmjs.com/package/to-csv) |
| .hjson | [hjson](https://hjson.org/) | [hjson](https://www.npmjs.com/package/hjson) |
| .ini | [ini](https://en.wikipedia.org/wiki/INI_file) | [ini](https://www.npmjs.com/package/ini) |
| .json | [json](http://www.json.org/) | native |
| .json5 | [json5](http://json5.org/) | [json5](https://www.npmjs.com/package/json5) |
| .xml | [xml](https://en.wikipedia.org/wiki/XML) | [xml2json](https://www.npmjs.com/package/xml2json) |
| .yaml, .yml | [yaml](http://yaml.org/) | [js-yaml](https://www.npmjs.com/package/js-yaml) |

#### Source

````js

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
````
