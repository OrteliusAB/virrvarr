# Context Menu (Right click menu)
Virrvarr has a custom context menu that can be enabled/disabled as needed using the boolean option enableContextMenu. You can also add your own custom menu items to the context menu by passing them into the customContextMenuAddons option. 

There are three types of context menus:
- `node` (on node right click)
- `edge` (on edge label right click)
- `canvas` (When right clicking on the bare canvas)

When defining your own menu items you simply pass a label (the caption of the menu item), as well as an action (function reference). Your function reference will receive two arguments:
- `data` (the data bound to your node/edge)
- `id` (the ID of your node/edge if applicable)

No arguments are passed to the canvas actions.

```javascript
const options = {
        enableContextMenu: true,
        customContextMenuAddons: {
            node: [
                [
                    {
                        label: "Custom Node Item 1",
                        action: (data, id) => { console.log("Custom Action 1: ", id) }
                    }
               ],
               [
                    {
                        label: "Custom Node Item 2",
                        action: (data, id) => { console.log("Custom Action 2:", data.someAttribute) }
                    },
               ]
            ]
        }
    }
const graph = new Virrvarr(graphContainer, data, options)
```