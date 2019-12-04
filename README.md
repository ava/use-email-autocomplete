
<p align="center">
    <h1 align="center">useEmailAutocomplete</h1>
</p>

<p align="center">📬 A React hook for email autocomplete inputs</p>

<br/>
<br/>


<div align="center">
  <pre>npm i <a href="https://www.npmjs.com/package/use-email-autocomplete">use-email-autocomplete</a></pre>
</div>

<br/>
<br/>

<p align="center">
    <a href="https://github.com/alex-cory/use-email-autocomplete/pulls">
      <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
    </a>
    <a href="https://www.npmjs.com/package/use-email-autocomplete">
      <img src="https://img.shields.io/npm/dt/use-email-autocomplete.svg" />
    </a>
    <a href="https://lgtm.com/projects/g/alex-cory/use-email-autocomplete/context:javascript">
      <img src="https://img.shields.io/lgtm/grade/javascript/g/alex-cory/use-email-autocomplete.svg?logo=lgtm&logoWidth=18"/>
    </a>
    <a href="https://bundlephobia.com/result?p=use-email-autocomplete">
      <img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/use-email-autocomplete.svg">
    </a>
<!--     <a href="https://greenkeeper.io/">
      <img src="https://badges.greenkeeper.io/alex-cory/use-email-autocomplete.svg">
    </a> -->
<!--     <a href="https://github.com/alex-cory/use-email-autocomplete/blob/master/license.md">
      <img alt="undefined" src="https://img.shields.io/github/license/alex-cory/use-email-autocomplete.svg">
    </a> -->
    <a href="https://codeclimate.com/github/alex-cory/use-email-autocomplete/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/e661bf6aa5e4d64502c6/maintainability" />
    </a>
    <a href="https://snyk.io/test/github/alex-cory/use-email-autocomplete?targetFile=package.json">
      <img src="https://snyk.io/test/github/alex-cory/use-email-autocomplete/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-email-autocomplete?targetFile=package.json" style="max-width:100%;">
    </a>
    <a href="https://www.npmjs.com/package/use-email-autocomplete">
      <img src="https://img.shields.io/npm/v/use-email-autocomplete.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-email-autocomplete?targetFile=package.json" style="max-width:100%;">
    </a>
<!--     <a href="https://circleci.com/gh/alex-cory/use-email-autocomplete">
      <img src="https://img.shields.io/circleci/project/github/alex-cory/use-email-autocomplete/master.svg" />
    </a> -->
</p>

This should work with other libraries including `material-ui`.
Play with it [here](https://alex-cory.github.io/email-autocomplete-input/)!

<a href="#"><img src="https://github.com/alex-cory/email-autocomplete-input/blob/master/public/email-autocomplete-input-validation.gif?raw=true" width="100%"></a>

Usage
-----

⚠️ `email` cannot be destructured. It must be used like `email.address` and `email.isValid` ⚠️

```jsx
import useEmailAutocomplete from 'use-email-autocomplete'

const App = () => {
  const { email, bind } = useEmailAutocomplete()
  
  const onSubmit = () => /* you an use `email.address` from above just like from `state` */
  
  return <input {...bind} />
}
```

Custom Autocomplete Input
-------------------------

⚠️ `email` cannot be destructured. It must be used like `email.address` and `email.isValid` ⚠️

```jsx
export const EmailInput = ({ onChange, ...props }) => {
  const { email, onChange: handleEmailChange, bind } = useEmailAutocomplete()
  const { address, isValid } = email // WRONG, DO NOT DO THIS
  
  const handleChange = e => {
    handleEmailChange(e)
    if (!email.isValid) conosle.log('Email is not valid') // RIGHT
    onChange(email.address) // RIGHT
  }

  return <input {...bind} {...props} onChange={handleChange} />
}
```

Usage with Material UI
----------------------

Requires `@material-ui/core: 4.0.0` and above.

```jsx
import { TextField } from '@material-ui/core'

export const EmailInput = ({ onChange, ...props }) => {
  const { email, onChange: handleEmailChange, bind } = useEmailAutocomplete()
  
  const handleChange = e => {
    handleEmailChange(e)
    onChange(email.address)
  }

  return <TextField {...bind} {...props} onChange={handleChange} />
}
```

### Examples

- [Codesandbox](https://codesandbox.io/s/useemailautocomplete-material-ui-j5m1x)

Options
-------

| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `validation`   | If you don't want to validate, set this to false. Default is `true`    |
| `domains` | All email domains you want to autocomplete for. Defaults to a predefined array of email domains. |

### Option Usage

```js

const {
  // `email` is the `value` + `auto suggestion`
  email: { address, isValid },
  // spread `bind` on an `input` or component and it will
  // apply all html valid attributes
  bind,
  // everything within `bind` is below. `bind.value` through `bind.onFocus`
  value,
  onChange,
  ref,
  onBlur,
  onFocus,
} = useEmailAutocomplete({
  domains: [],
  validation: true,
})
```
