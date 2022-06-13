import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.nav`
  align-items: center;
  border-top: .5px solid ${ ({theme}) => theme.colors.darkBlue };
  display: flex;
  justify-content: center;
  min-height: ${ fluid(64, 11, 80) };
  inset: auto 0 0 0;
  position: fixed;

  ${ breakpoint("desktop", `
    border: none;
    position: static;
    padding: ${ rem(160) } 0 ${ rem(120) };
  `) } 
`

export const Navlist = styled.ul`
  display: flex;
  justify-content: center;

  ${ breakpoint("desktop", `
    display: block;
  `) }
`

export const Navlink = styled.a`
  border-radius: ${ rem(16) };
  display: grid;
  height: ${ rem(48) };
  width: ${ rem(48) };
  place-content: center;

  &[aria-current="page"] {
    background-color: ${ ({theme}) => theme.colors.darkBlue };

    svg path {
      fill: white;
    }
  }

  &:not(:last-of-type) {
    margin-right: ${ rem(24) };
  }

  ${ breakpoint("desktop",`
    &:not(:last-of-type) {
      margin-right: 0;
      margin-bottom: ${ rem(24) };
    }
  `  
  ) }
`

export const NavIconHolder = styled.div`
  height: ${ rem(22) };
  width: ${ rem(22) };

  svg {
    height: 100%;
    width: 100%;
  }
`