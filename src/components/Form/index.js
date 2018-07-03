import React from 'react'
import PropTypes from 'prop-types'
import FormItem from './item'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Form = ({ onSubmit, children }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}

Form.Item = FormItem
Form.propTypes = {
  onSubmit: PropTypes.func,
}

export default Form
