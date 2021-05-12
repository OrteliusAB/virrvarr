# Context Menu (Right click menu)
Virrvarr has a custom context menu that can be enabled/disabled as needed using the boolean option enableBuiltinContextMenu. You can also add your own custom menu items to the context menu by passing them into the customContextMenuAddons option. 

There are three types of context menus:
- `node` (on node right click)
- `edge` (on edge label right click)
- `canvas` (When right clicking on the bare canvas)

When defining your own menu items you simply pass a label (the caption of the menu item), as well as an action (function reference). Your function reference will receive two arguments:
- `data` (the data bound to your node/edge)
- `id` (the ID of your node/edge if applicable)

No arguments are passed to the canvas actions.

Each menu type takes an array of arrays of objects as a value. Each inner array will be separated by a horizontal divider in the menu.
Each object has the following properties:
- `label` The text for the option item
- `icon` URL to an icon (optional). This can be set to an empty string if you want to indent options without icons.
- `type` An array of specific types of node/edge where the context menu should be visible (optional). If not provided it will be visible for all nodes/edges.
- `action` A function that should execute when the option is clicked.


```javascript
const options = {
        enableBuiltinContextMenu: true,
        customContextMenuAddons: {
            node: [
                [
                    {
                        label: "Custom Node Item 1",
                        icon: "URL", //Optional
                        type: ["specialnodetype1", "specialnodetype2"], //Optional
                        action: (data, id) => { console.log("Custom Action 1: ", id) }
                    }
               ],
               [
                    {
                        label: "Custom Node Item 2",
                        icon: "URL", //Optional
                        action: (data, id) => { console.log("Custom Action 2:", data.someAttribute) }
                    },
               ]
            ]
        }
    }
const graph = new Virrvarr(graphContainer, data, options)
```