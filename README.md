eventstream.js
==============

Pure functional EventStream monad implementation.

**Note: EXPERIMENTAL**

## Examples

```javascript
bodyClickAndKeyup = EventStream(document.body).listen('click').listen('keyup').map(function (e) {
  return 1;
});

bodyClickAndKeyup.value(function (eventName, last, all, event) {
  console.log(arguments);
});
```

Another one:

```javascript
EventStream(document.body, 'click', function (eventName, last, all, event) {
  console.log(arguments);
});
```

## License

MIT License
