# deploy-event

deploy-event make it able to create a cancellable class-based events. (priority can be specified)


## Introducion

```
deploy-event provides some features
That are not present in the EventEmitter.
An event based on a class of a particular file, and
(the listener is possible confirm the argument list)
Event listener can receive the event specified by the priority.
```

## How to use deploy-class?

Install module and define it.
- type in terminal `npm install deploy-event`
- type in source file `let DeployEvent = require('deploy-event');`
- type * `let Event = DeployEvent.Event;`
- type * `let EventDispatcher = DeployEvent.EventDispatcher;`
- type * `let EventPriority = DeployEvent.EventPriority;`

Create event, create dispatcher.
- Event Inheritance can be create to the another event. create some event.
- (ex. `class NotificationEvent extends Event{}`)
- Dispatcher dispensing the called events for the priority. create some dispatcher.
- (ex. `let NotificationDispatcher = new EventDispatcher();`)

Create listener.
- Dispatcher can be register listner function. create and register some process function.
- (ex. `let processFunction = (eventInstance)=> {/* */}`)
- (ex. `NotificationDispatcher.on(NotificationEvent, processFunction, EventPriority.LOW);`)
- (listener will be received event instance, so it can ue it)
- (event cancel method -> `eventInstance.setCancelled(boolean)`)
- (event cancel check method -> `eventInstance.isCancelled()` it will be return boolean, listener sometimes must be check event has cancelled! /*not automatic cut*/ )

Create eventInstance, create event call.
- If you want to use some Event, it must be makes new.
- (ex. `let myEvent = new NotificationEvent();`)
- Do what ever you want it eventInstance, and call the dispatcher.
- (ex. `NotificationDispatcher.call(myEvent);`)
- And yes, simply event will be send every listener! :P

![Showcase](http://i.imgur.com/KqX3yDN.gif)

## Example

<https://github.com/HmHmmHm/deploy-event/blob/master/example/EventEmitTest/app.js>
