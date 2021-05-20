## react-tiny-modals

A super barebones react component library. Featurnig **Modal** and **Popup** components.

## Install

```shell
yarn add react-tiny-modals
```

or

```shell
npm install react-tiny-modals --save
```

## Usage

### Modal:

```JSX
import { Modal } from 'react-tiny-modals'

...

const [showModal, setShowModal] = React.useState(false);

<Modal
  isOpen={showModal}
  onOpen={() => console.log('onopen')}
  onClose={() => console.log('onclose')}
  zIndex={20}
  backOpacity={0.7}
>
  <div>This is the content of the modal.</div>
</Modal>

<button onClick={() => setShowModal(!showModal)}>open modal</button>
```

### Popup:

```JSX
import { Popup } from 'react-tiny-modals'

...

<Popup
  content={({ show, setShow }) => (
    <div>
      This is the content of the popup.
      <button onClick={() => setShow(!show)}>close</button>
    </div>
  )}
  position={['left', 'right', 'top', 'bottom']}
  align="center"
  reposition={true}
  outerPadding={10}
>
  {({ show, setShow }) => (
    <button onClick={() => setShow(!show)}>open popup</button>
  )}
</Popup>
```

## Props:

### Modal:

| property       | accepts  | description                                                        | default   |
| -------------- | -------- | ------------------------------------------------------------------ | --------- |
| isOpen         | boolean  | controls whether the modal is open                                 | false     |
| onOpen         | function | gets called **after** the modal was **opened**                     | null      |
| onClose        | function | gets called **after** the modal was **closed**                     | null      |
| onClickOutside | function | gets called **after** the user clicks outside of the modal content | null      |
| zIndex         | number   | sets the zIndex of the modal                                       | 100       |
| backOpacity    | float    | sets the opacity of the black background                           | 0.8(80%)  |
| innerStyle     | object   | sets the styles of the inner content wrapper                       | undefined |
| outerStyle     | object   | sets the styles of the top level div                               | undefined |
| className      | string   | sets custom className to the top level div                         | undefined |

### Popup:

| property (\* is required)                                                                     | accepts                                         | description                                                                                                                                                                                                                                           | default                            |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| isOpen (not recomended, use render props returned by content and the Popup component instead) | boolean                                         | controls whether the popup is open                                                                                                                                                                                                                    | false                              |
| content\*                                                                                     | function                                        | recieves show/setShow as parameters, returns content of the popup                                                                                                                                                                                     | null                               |
| zIndex                                                                                        | number                                          | sets the zIndex of the content div                                                                                                                                                                                                                    | 100                                |
| innerStyle                                                                                    | object                                          | sets the styles of the content div                                                                                                                                                                                                                    | undefined                          |
| position                                                                                      | 'left' \| 'right' \| 'top' \| 'bottom' \| Array | position of the popup content relative to the calling element, can recieve array of positions(ex.['left', 'right', 'top', 'bottom']) ordered by priority. if reposition is set to true, final position will be picked based on available screen space | ['left', 'right', 'top', 'bottom'] |
| reposition                                                                                    | boolean                                         | controls whether the popup should automatically be repositioned to fit the screen space. when set to false, the popup will always stay in the position specified in the 'position' prop(if an array was provided, the first item will be choosen)     | true                               |
| align                                                                                         | 'center' \| 'start' \| 'end'                    | alignment of the popup content relative to the calling element                                                                                                                                                                                        | center                             |
| outerPadding                                                                                  | number                                          | space between the popup content and the calling element(in pixels)                                                                                                                                                                                    | 0                                  |
| onOpen                                                                                        | function                                        | gets called **after** the popup was **opened**                                                                                                                                                                                                        | null                               |
| onClose                                                                                       | function                                        | gets called **after** the popup was **closed**                                                                                                                                                                                                        | null                               |
| onClickOutside                                                                                | function                                        | gets called **after** the user clicks outside of the popup content (recieves show/setShow as parameters)                                                                                                                                              | null                               |
