# Bs3harp

harpJS + browser-sync + gulp + Bootstrap3 for concrete5.6.x coding with jquery1.7.2

## Usage

### Install gulpjs and some dependencies.

/Bs3harp

```
$ npm install
```

#### change bootstrap version

"postinstall": "bower install bootstrap#3.1.1 && bower install jquery#1.7.2 && gulp bs"

### Run server with Livereload

/Bs3harp

```
$ harp server
```

/Bs3harp

```
$ npm start
```

### Compile source

Compile source in /Bs3harp/public/www

/Bs3harp

```
$ harp compile
```

Compile source non-minify-html in /Bs3harp/dist

/Bs3harp

```
$ harp compile; gulp dist
```

## Chagelog
### ver 1.0.1
- Add index for coding page list

- Change directories for compile and copy

	- harp compile html
	/dist/**.html

	- harp compile css/js/images
	/dist/[css/js/images]

	- gulp copy compile html
	/**.html

	- gulp copy compile css/js/images
	/[css/js/images]


### ver 1.0.0

- harp compile html/css/js/images
/dist/[html/css/js/images]

- gulp copy compile sources
../[html/css/js/images]
