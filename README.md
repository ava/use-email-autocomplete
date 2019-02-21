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
