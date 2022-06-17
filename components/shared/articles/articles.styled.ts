import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.div`
  max-width: ${ rem(826) };

  ${ breakpoint("tablet", `
    display: flex;
  `) }
`

export const ContentContainer = styled.div`
  &:not(:last-of-type) {
    margin-bottom: ${ rem(40) };
  }
`

export const GenreContainer = styled.div`
  overflow-x: hidden;
`

export const GenreHeading = styled.h3`
  font-weight: 700;
  max-width: max-content;
  margin:0 0 ${ fluid(40, 6, 48) } ${ rem(44) };
  position: relative;

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ rem(theme.fontSizes.headingVSmall) };
  ` }

  &::before,
  &::after {
    content: "";
    background-color: ${ ({theme}) => theme.colors.darkBlue };
    height: 1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: ${ rem(-44) };
    width: ${ rem(32) };
  }

  &::after {
    left: calc(100% + ${ rem(12) });
    width: 100vw;
  }
`