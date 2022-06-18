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

export const CenterItem = styled.div`
  margin: auto;
  max-width: max-content;
`

export const SignedHeading = styled.h1`
  margin-bottom: ${ rem(8) };

  ${ ({theme}) => `
    color: ${ theme.colors.darkTwo };
    font-size: ${ fluid(28, 4, theme.fontSizes.headingLarge) };
  ` }
`

export const GreyOneMedium = styled.p`
  ${ ({theme}) => `
    color: ${ theme.colors.greyOne };
    font-size: ${ fluid(theme.fontSizes.textMedium, 2.3, theme.fontSizes.default) };
  ` }
`

export const TabbedInterface = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, .1);
  display: flex;
  margin-bottom: ${ rem(40) };
  max-width: ${ rem(256) };
`

export const TabControl = styled.button`
  font-weight: 500;
  padding-right: ${ rem(32) };
  position: relative;

  ${ ({theme}) => `
    color: ${ theme.colors.greyTwo };
    font-size: ${ rem(theme.fontSizes.default) };

    &[aria-selected="true"] {
      color: ${ theme.colors.darkTwo };

      &::before {
        content: "";
        border-radius: 3px;
        background-color: ${ theme.colors.darkBlue };
        height: 1.5px;
        inset: auto auto ${ rem(-2) } 0;
        position: absolute;
        width: 100%;
      }
    }
  ` }
`

export const Relative = styled.div`
  position: relative;
`

interface TextMedium {
  color: string
}

export const TextMedium = styled.p<TextMedium>`

  ${ ({ theme, color }) => `
    color: ${ theme.colors[color] };
    font-size: ${ rem(theme.fontSizes.textMedium) };
  ` }
`