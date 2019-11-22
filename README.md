# Email Autocomplete Hook
📬 A React hook for email autocomplete inputs

This should work with all other libraries including `material-ui` and others.
Play with it [here](https://alex-cory.github.io/email-autocomplete-input/)!

<a href="#"><img src="https://github.com/alex-cory/email-autocomplete-input/blob/master/public/email-autocomplete-input-validation.gif?raw=true" width="100%"></a>

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
  const { email, bind } = useEmailAutocomplete()
  
  const onSubmit = () => /* you an use `email` from above just like from `state` */
  
  return <input {...bind} />
}
```

### Examples
- Codesandbox (coming soon... codesandbox is messing up saying I have >50 sandboxes even though I don't...)

Options
-----
| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
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
} = useEmailAutocomplete({
  domains: [],
  validation: true,
})
```
