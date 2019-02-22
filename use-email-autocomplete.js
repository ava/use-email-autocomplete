import React, { useEffect, useState, useRef } from 'react'
import { findDOMNode  } from 'react-dom'


let prevEmail = ''
let prevVal = ''
export default function useEmailAutocomplete({
  domains = ['yahoo.com', 'hotmail.com', 'gmail.com', 'me.com', 'aol.com', 'mac.com', 'live.com', 'googlemail.com', 'msn.com', 'facebook.com', 'verizon.net', 'outlook.com', 'icloud.com', 'table.co', 'fb.com'],
  htmlAttributesOnly = false,
  validation = true,
} = {}) {
  const input = useRef()
  const [state, setState] = useState({ email: '', isValid: null })

  function onChange(e) {
    // works for strings, and objects, not for numbers
    if (!e.hasOwnProperty('target')) {
      return console.error('NOT IMPLEMENTED YET')
    }
    const { value } = e.target
    const suggestion = suggest(value)
    const email = value + suggestion
    const isValid = validate(email)
    setState({ ...state, email, isValid })
    if (suggestion) highlight(suggestion)
    prevEmail = email
    prevVal = value
  }

  function suggest(email) {
    const [ emailName, partialDomain ] = email.split('@')  // eslint-disable-line
    if (!partialDomain || email.length <= prevVal.length) return ''
    const domain = domains.find(d => d.indexOf(partialDomain) === 0) || ''
    return domain.replace(partialDomain, '')
  }

  function validate(email) {
    const inputIsFocused = findDOMNode(input.current) === document.activeElement
    const isValidEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i  // eslint-disable-line
    if (!email) {
      return null
    } else if (isValidEmail.test(email)) {
      return 'yes'
    } else if (inputIsFocused && prevEmail.length !== email.length) {
      return 'maybe'
    } else {
      return 'no'
    }
  }

  function highlight(suggestion) {
    setTimeout(() => {
      const email = prevVal + suggestion
      const startPos = email.lastIndexOf(suggestion)
      const endPos = startPos + suggestion.length
      findDOMNode(input.current).setSelectionRange(startPos, endPos)
    }, 0)
  }

  function doValidationCheck(e) {
    if (validation) {
      const isValid = validate(state.email)
      setState({ ...state, isValid })
    }
  }

  const htmlAttributes = {
    email: state.email, // not html attribute, but need it for form submissions, etc.
    value: state.email,
    onChange,
    ref: input,
    onBlur: doValidationCheck,
    onFocus: doValidationCheck,
  }
  if (htmlAttributesOnly) return htmlAttributes
  return {
    ...htmlAttributes,
    ...state,
    Input: Input,
  }
}

const borderColors = {
  yes: '#28a745',
  maybe: '#cfdc00',
  no: '#dc3545'
}

const outlineColors = { // source: http://bit.ly/2j2sbyx
  yes: 'rgba(40, 167, 69, .25)',
  maybe: 'rgba(207, 220, 0, .25)',
  no: 'rgba(220, 53, 69, .25)'
}

const ValidationInput = styled.input`
  ${props => props.isValid && css`
    outline: none;
    &:focus {
      box-shadow: 0 0 0 0.2rem ${outlineColors[isValid]};
    }
    border: 1px solid ${borderColors[isValid]} !important;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  `}
`

const Input = styled(ValidationInput)`
  font-family:      Helvetica, Arial, sans-serif;
  letter-spacing:   0.5px;
  line-height:      1.3em;
  box-sizing:       border-box;
  border:           1px solid lightgray;
  padding:          0.5rem;
  border-radius:    3px;
  font-size:        12pt;
  outline:          none;
`
