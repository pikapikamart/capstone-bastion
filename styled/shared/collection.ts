import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "../functions";


const BaseButton = styled.button`
  border-radius: ${ rem(26) };
  font-size: ${ fluid(15, 3, 16) };
  padding: ${ fluid(10, 3, 12) } ${ fluid(16, 4, 18) };
`

export const MainButton = styled(BaseButton)`

  ${ ({theme}) => `
    background-color: ${ theme.colors.darkOne };
    color: ${ theme.colors.whiteOne };
    font-size: ${ rem(theme.fontSizes.buttonOne) };
  ` }
`

export const BorderedButton = styled(BaseButton)`
  border: 1px solid ${ ({theme}) => theme.colors.darkBlue };
  font-size: ${ fluid(15, 3, 16) };
`