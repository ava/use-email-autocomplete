# useEmailAutocomplete
📬 A React hook for email autocomplete inputs

Installation
------------

```shell
yarn add react react-dom use-email-autocomplete
```

Usage
-----

```jsx
import useEmailAutocomplete from 'use-email-autocomplete'

const App = () => {
  const { email, Input } = useEmailAutocomplete()
  const onSubmit = () => /* you an use `email` from above just like from `state` */
  return <Input />
}
```
or
```jsx
import useEmailAutocomplete from 'use-email-autocomplete'

const App = () => {
  const { email, ...bind } = useEmailAutocomplete({
    htmlAttributesOnly: true,
  })
  
  const onSubmit = () => /* you an use `email` from above just like from `state` */
  
  return <input {...bind} />
}
```

### Examples
- [Codepen](https://codepen.io/alex-cory/pen/daLjKj?editors=0010)

Options
-----
| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `htmlAttributesOnly` | Only return valid html attributes to spread onto input. Default is `false`. |
| `validation`   | If you don't want to validate, set this to false. Default is `true`    |
| `domains` | All email domains you want to autocomplete for. Defaults to a predefined array of email domains. |

### Option Usage
```js
const {
  email, // value with suggestion
  value, // same as email (used for binding to input)
  onChange,
  ref,
  onBlur,
  onFocus,
  isValid,
  validation, 
  Input,
} = usePortal({
  domains: [],
  htmlAttributesOnly: false,
  validation: true,
})
```
