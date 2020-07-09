# Event Listeners
Virrvarr is event driven, and exposes a few events to developers. You can listen for these events by providing a custom listener callback function in the options object provided to the Virrvarr constructor. To read more about the different events please check out the API reference page. 

Example of typical use:
```javascript
const options = {
    entityClickListener: function (item) {
        console.log("Clicked:", item)
    },
    entityHoveredListener: function (item) {
        //Event type can be either enter or exit
        console.log(item.eventType, item.id, item.type, item.data)
    },
    entityDoubleClickedListener: function (item) {
        console.log("Double clicked:", item)
    }
}
```