function EventStream(element, eventName, listener, eventStream, listeners, mappers) {

  if (!eventStream) eventStream = {};
  if (!listeners)   listeners   = [];
  if (!mappers)     mappers     = [];

  if (listener)     listeners.push(listener);

  if (element && eventName) {
    element.addEventListener(eventName, function (event) {
      if (!eventStream[eventName]) eventStream[eventName] = [];
      eventStream[eventName].push(event);
      mappers.forEach(function (mapper) {
        eventStream[eventName] = eventStream[eventName].map(mapper);
      });
      listeners.forEach(function (listener) {
        var last = eventStream[eventName][eventStream[eventName].length - 1];
        listener(eventName, last, eventStream[eventName], event);
      });
    });
  }

  function staticStream() {
    return EventStream(false, false, false, eventStream, listeners, mappers);
  }

  function value(fn) {
    return EventStream(false, false, fn, eventStream, listeners, mappers);
  }

  function listen(eventName) {
    return EventStream(element, eventName, false, eventStream, listeners, mappers);
  }

  function stream() {
    return eventStream;
  }

  function map(fn) {
    mappers.push(fn);
    return staticStream();
  }

  return {
    stream: stream,
    listen: listen,
    map   : map,
    merge : merge,
    value : value
  };

}
