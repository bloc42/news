import React from 'react'
import styled from 'styled-components'

const StyledFormItem = styled.div`
  margin: 0.6rem 0;
`

const FormItem = ({ children }) => {
  return <StyledFormItem>{children}</StyledFormItem>
}

export default FormItem
