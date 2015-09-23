# react-window-kit
Kit for creating window component. 

# Install
`npm install --save react-window-kit`

# Usage
As window needs some common component to control window, like button, icon, etc. React-Window-Kit doesn't offer these component, it needs to integrate with other UI component library. For example, [react-bootsrap-window](https://github.com/zhbhun/react-bootstrap-window/blob/master/src/index.js)


# Example
Execute `npm run test`, then check `http://localhost:3000/`

# API
## Window
| name | type | default | description |
| ------------ | ------------ | ------------ | ------------ |
| visible | Boolean | false | whether show window |
| position | Object | {align: 'cc', offset: [0, 0]} | Align option values: tr, tc, tl, cl, cc, cr, bl, bc, br. |
| size | Object  |   | {width, height} |
| closable | Boolean | true |  |
| maximizable | Boolean | false |   |
| backdrop | Boolean | true |   |
| keyboard | Boolean | true |   |
| animation | Boolean/ReactComponent |   |   |
| onShow | function |   |   |
| onAlign | function |   |   |
| onShown | function |   |   |
| onHidden | function |   |   |
| close | ReactElement |   | close button |
| restore | ReactElement |   |  restore button |
| maximize | ReactElement |   |  maximize button |

## Modal
| name | type | default | description |
| ------------ | ------------ | ------------ | ------------ |
| visible | Boolean | false | whether show modal |
| size | String | md | fl: full screen, lg, md, sm |
| header | ReactElement |   |   |
| footer | ReactElement |   |   |
| onHide | function |   |   |

## Confirm
| name | type | default | description |
| ------------ | ------------ | ------------ | ------------ |
| visible | Boolean | false | whether show confirm |
| title | String |   |   |
| onCancel | function |   |   |
| onOk | function |   |   |
| sign | ReactElement |   | sign icon  |
| cancel | ReactElement |   | cancel button |
| ok | ReactElement |   | ok button |

## Tip
| name | type | default | description |
| ------------ | ------------ | ------------ | ------------ |
| visible | Boolean | false | whether show Tip |
| type | String | info | info, success, warning, danger |
| title | String |   |   |
| onOk | function |   |   |
| sign | ReactElement |   | tip sign icon |
| ok | ReactElement |   | ok button |

# Feature
- support IE8,IE8+, Chrome, Firefox, Safari

# License
react-window-kit is released under the MIT license.