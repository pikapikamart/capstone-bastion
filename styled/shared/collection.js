import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "../functions";


export const MainButton = styled.button`
  border-radius: ${ rem(22) };
  padding: ${ rem(12) } ${ rem(18) };

  ${ ({theme}) => `
    background-color: ${ theme.colors.darkOne };
    color: ${ theme.colors.whiteOne };
    font-size: ${ theme.fontSizes.buttonOne };
  ` }
`