import { useState, useRef, useCallback, useEffect } from 'react'

const defaultDomains = ['yahoo.com', 'hotmail.com', 'gmail.com', 'me.com', 'aol.com', 'mac.com', 'live.com', 'googlemail.com', 'msn.com', 'facebook.com', 'verizon.net', 'outlook.com', 'icloud.com', 'table.co', 'fb.com']


export default function useEmailAutocomplete({
  domains = [],
  validation = true,
} = {}) {
  const theDomains = useRef([...(domains || []), ...defaultDomains])
  const prevEmail = useRef('')
  const prevVal = useRef('')
  const container = useRef()
  const input = useRef()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(null)

  const findInput = useCallback(node => {
    if (node.tagName === 'INPUT') return node
    if (node.children && node.children.length > 0) {
      for (const n of node.children) return findInput(n)
    }
  }, [])

  useEffect(() => {
    input.current = findInput(container.current)
    if (!input.current) throw Error('There is no input in the component you\'re trying to attach useEmailAutocomplete to')
  }, [findInput, input])

  const suggest = useCallback(email => {
    const [ emailName, partialDomain ] = email.split('@')  // eslint-disable-line
    if (!partialDomain || email.length <= prevVal.current.length) return ''
    const domain = theDomains.current.find(d => d.indexOf(partialDomain) === 0) || ''
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
    const email = value + suggestion
    const isValid = validate(email)
    setEmail(email)
    setIsValid(isValid)
    if (suggestion) highlight(suggestion)
    prevEmail.current = email
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

  const doValidationCheck = useCallback(e => validation && setIsValid(validate(email)), [email, validate, validation])

  const htmlAttributes = {
    value: email,
    onChange,
    ref: container,
    onBlur: doValidationCheck,
    onFocus: doValidationCheck,
  }
  return {
    email, // not html attribute, but need it for form submissions, etc.
    isValid,
    ...htmlAttributes,
    bind: htmlAttributes,
    // Input: Input,
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
