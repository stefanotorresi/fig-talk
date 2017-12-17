# PHP FIG talk

This repo holds a slide deck for a presentation about the [PHP-FIG][PHP-FIG].

## Browse

You can browse the presentation [here][online-presentation].

## Install

```shell
$: yarn
$: yarn gulp build
```

This will create an `index.html` which is the main access point for the slides.

## Develop

```shell
$: yarn http-server
```

will run `http-server` and serve at `http://localhost:8080` by default.

```shell
$: yarn gulp
```

will run `gulp` to build sources and watch for changes

[PHP-FIG]: http://www.php-fig.org/
[online-presentation]: https://stefanotorresi.it/talks/php-fig
