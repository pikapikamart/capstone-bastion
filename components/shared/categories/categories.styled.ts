import styled, { css } from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


interface WrapperProps {
  isReversed?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  margin-bottom: ${ rem(32) };
  position: sticky;
  top: ${ rem(136) };

  ${ ({isReversed}) => `
    ${ breakpoint("tablet", `
      max-width: ${ rem(152) };
      margin: 0 ${ isReversed? 0 : rem(16) } 0 ${ isReversed? fluid(16, 3, 40): 0 };
    `) }
  ` }

  ${ breakpoint("desktop", `
    flex-basis: 100%;
    max-width: ${ rem(320) };
  `) }
`

export const Heading = styled.h2`
  font-weight: 800;
  margin-bottom: ${ fluid(16, 5, 24) };
  text-transform: uppercase;

  ${ ({theme}) => `
    color: ${ theme.colors. darkOne };
    font-size: ${ rem(theme.fontSizes.headingSmallest) };
  ` }  
`

export const CategoryList = styled.ul`
  gap: ${ rem(8) };

  ${ breakpoint("desktop", `
    max-width: ${ rem(290) };
  `) }
`

export const Category = styled.li`
  display: inline-block;
  margin: 0 ${ rem(8) } ${ rem(8) } 0;
`

export const CategoryLink = styled.a`
  border-radius: ${ rem(4) };
  display: inline-block;
  padding: ${ rem(8) } ${ rem(10) };  
  text-transform: capitalize;

  ${ ({theme}) => `
    color: ${ theme.colors.greyOne };
    border: 1px solid ${ theme.colors.greyFour };
    font-size: ${ rem(theme.fontSizes.linkOne) };
  `}
`