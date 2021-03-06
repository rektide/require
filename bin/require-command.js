#!/usr/bin/env node

var path = require('path'),
	sys = require('sys'),
	server = require('../server'),
	compiler = require('../compiler')

var opts = {
	port:    1234,
	host:    'localhost',
	command: null,
	path:    null
}

var args = [].slice.call(process.argv, 2)

opts.command = args.shift()
opts.path = path.resolve(args.shift())

while (args.length) {
	var arg = args.shift()
	switch(arg) {
		case '--port':
			opts.port = args.shift()
			break
		case '--host':
			opts.host = args.shift()
			break
		default:
			console.log('Unknown option', arg)
			process.exit(1)
			break
	}
}

switch (opts.command) {
	case 'serve':
		if (!opts.path) {
			console.log('Specify a path to serve from, e.g. require serve ./example')
			process.exit(1)
		}
		server.listen(opts.port, { host:opts.host, path:opts.path })
		console.log('serving from', opts.path, 'on', 'http://'+opts.host+':'+opts.port)
		break
	case 'compile':
		if (!opts.path) {
			console.log('Specify a single file to compile, e.g. require compile ./path/to/file.js')
			process.exit(1)
		}
		sys.print(compiler.compile(opts.path))
		break
	default:
		if (opts.command) {
			console.log('Unknown command', '"' + opts.command + '".', 'Try "require serve" or "require compile"')
		} else {
			console.log('You need to give a command, e.g. "require serve" or "require compile"')
		}
		process.exit(1)
}

