# Context Menu (Right click menu)
Virrvarr has a custom context menu that can be enabled/disabled as needed using the boolean option enableBuiltinContextMenu. You can also add your own custom menu items to the context menu by passing them into the customContextMenuAddons option. 

There are three types of context menus:
- `node` (on node right click)
- `edge` (on edge label right click)
- `canvas` (When right clicking on the bare canvas)

When defining your own menu items you simply pass a label (the caption of the menu item), as well as an action (function reference). Your function reference will/can receive three arguments:
- `data` (the data bound to your node/edge)
- `id` (the ID of your node/edge if applicable)
- `direction` (direction of the clicked edge, if applicable)

No arguments are passed to the canvas actions.

Each menu type takes an array of arrays of objects as a value. Each inner array will be separated by a horizontal divider in the menu.
Each object has the following properties:
- `label` The text for the option item
- `icon` URL to an icon (optional). This can be set to an empty string if you want to indent options without icons.
- `action` A function that should execute when the option is clicked.
- `disabled` If true the item will be grayed out and not clickable
- `children` A child menu that should appear if the menu option is hovered. The provided value should follow the same format as the main menu.

The information should be passed in as a function reference that returns the above structure or an empty array for nothing to be shown.

```javascript
const options = {
        enableBuiltinContextMenu: true,
        customContextMenuAddons: {
            node: (data, id) => ([
                [
                    {
                        label: "Custom Node Item 1",
                        icon: "URL", //Optional
                        action: (data, id) => { console.log("Custom Action 1: ", id) }
                    }
               ],
               [
                    {
                        label: "Regular Node Item",
                        icon: "URL", //Optional
                        action: (data, id) => { console.log("Custom Action 2:", data.someAttribute) }
                    },
                    {
                        label: "Disabled Node Item",
                        disabled: true
                        action: (data, id) => { console.log("Custom Action 2:", data.someAttribute) }
                    },
                    {
                        label: "Node Item Sub Menu",
                        children: [
                            [
                                {
                                    label: "Sub Menu Node Item",
                                    action: (data, id) => { console.log("The sub menu option was clicked!") } 
                                }
                            ]
                        ]
                    },
               ]
            ])
        }
    }
const graph = new Virrvarr(graphContainer, data, options)
```