import { useState, useRef, useCallback, useEffect } from 'react'

// eslint-disable-next-line
const defaultDomains = ['yahoo.com', 'hotmail.com', 'gmail.com', 'me.com', 'aol.com', 'mac.com', 'live.com', 'googlemail.com', 'msn.com', 'facebook.com', 'verizon.net', 'outlook.com', 'icloud.com', 'table.co', 'fb.com']


export default function useEmailAutocomplete({
  domains = [],
  validation = true,
} = {}) {
  const theDomains = [...(domains || []), ...defaultDomains]
  const prevEmail = useRef('')
  const prevVal = useRef('')
  const container = useRef()
  const input = useRef()
  const email = useRef('')
  const isValid = useRef(null)
  const [, forceUpdate] = useState(false)

  const findInput = useCallback(element => {
    if (element && element.tagName === 'INPUT') return element
    if (element && element.children && element.children.length > 0) {
      for (const child of element.children) {
        const potentialInput = findInput(child)
        if (potentialInput) return potentialInput
      }
    }
  }, [])

  useEffect(() => {
    input.current = findInput(container.current)
    if (!input.current) console.error('There is no input in the component you\'re trying to attach useEmailAutocomplete to')
  }, [findInput])

  const suggest = useCallback(email => {
    const [/* emailName */, partialDomain] = email.split('@')
    if (!partialDomain || email.length <= prevVal.current.length) return ''
    const domain = theDomains.find(d => d.indexOf(partialDomain) === 0) || ''
    return domain.replace(partialDomain, '')
  }, [theDomains])

  const validate = useCallback(email => {
    const inputIsFocused = input.current === document.activeElement
    // eslint-disable-next-line
    const isValidEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email) {
      return null
    } else if (isValidEmail.test(email)) {
      return 'yes'
    } else if (inputIsFocused && prevEmail.current.length !== email.length) {
      return 'maybe'
    } else {
      return 'no'
    }
  }, [])

  const onChange = useCallback(e => {
    // works for strings, and objects, not for numbers
    if (!e.hasOwnProperty('target')) {
      return console.error('NOT IMPLEMENTED YET')
    }
    const { value } = e.target
    const suggestion = suggest(value)
    const theEmail = value + suggestion
    const isValidEmail = validate(theEmail)
    email.current = theEmail
    isValid.current = isValidEmail
    forceUpdate(x => !x)
    if (suggestion) highlight(suggestion)
    prevEmail.current = theEmail
    prevVal.current = value
  }, [suggest, validate])

  function highlight(suggestion) {
    setTimeout(() => {
      const email = prevVal.current + suggestion
      const startPos = email.lastIndexOf(suggestion)
      const endPos = startPos + suggestion.length
      input.current.setSelectionRange(startPos, endPos)
    }, 0)
  }

  const doValidationCheck = useCallback(e => {
    if (validation) {
      isValid.current = validate(email)
      forceUpdate(x => !x)
    }
  }, [email, validate, validation])

  const htmlAttributes = {
    value: email.current,
    onChange,
    ref: container,
    onBlur: doValidationCheck,
    onFocus: doValidationCheck,
  }

  return {
    email: new Proxy({ address: email, isValid }, { get: (obj, key) => obj[key].current }),
    ...htmlAttributes,
    bind: htmlAttributes,
  }
}


// const borderColors = {
//   yes: '#28a745',
//   maybe: '#cfdc00',
//   no: '#dc3545'
// }

// const outlineColors = { // source: http://bit.ly/2j2sbyx
//   yes: 'rgba(40, 167, 69, .25)',
//   maybe: 'rgba(207, 220, 0, .25)',
//   no: 'rgba(220, 53, 69, .25)'
// }

// const ValidationInput = styled.input`
//   ${props => props.isValid && css`
//     outline: none;
//     &:focus {
//       box-shadow: 0 0 0 0.2rem ${outlineColors[isValid]};
//     }
//     border: 1px solid ${borderColors[isValid]} !important;
//     transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
//   `}
// `

// const Input = styled(ValidationInput)`
//   font-family:      Helvetica, Arial, sans-serif;
//   letter-spacing:   0.5px;
//   line-height:      1.3em;
//   box-sizing:       border-box;
//   border:           1px solid lightgray;
//   padding:          0.5rem;
//   border-radius:    3px;
//   font-size:        12pt;
//   outline:          none;
// `
