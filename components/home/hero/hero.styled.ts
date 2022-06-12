import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-position: right bottom;
  background-image: url("/vectors/homepage/hero-mobile.png");
  min-height: ${ rem(368) };
  padding: ${ fluid(96, 19, 160) } 0 0 ${ rem(16) };

  ${ ({theme}) => `
    background-color: ${ theme.colors.whiteThree };
    border-bottom: 1px solid ${ theme.colors.darkBlue };
  ` }

  ${ breakpoint("tablet", `
    background-image: url("/vectors/homepage/hero-tablet.png");
    padding-left: ${ rem(40) }; 
  `) }

  
  ${ breakpoint("desktop", `
    background-image: url("/vectors/homepage/hero-desktop.png");
    min-height: ${ rem(496) };
    padding-left: ${ rem(96) }; 
    `) }
`

export const HeroHeading = styled.h1`
  color: ${ ({theme}) => theme.colors.darkFour };
  font-size: ${ fluid(44, 6.5, 70) };
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  line-height: 1.2;
  max-width: ${ fluid(300, 44, 480) };
`