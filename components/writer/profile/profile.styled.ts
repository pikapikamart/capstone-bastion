import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.div`
  margin-bottom: ${ fluid(64, 8.6, 80) };
  
  ${ breakpoint("tablet", `
    align-items: center;
    display: grid;
    grid-template-columns: max-content auto;
  `) }
`

export const Avatar = styled.img`
  border-radius: 50%;
  height: ${ fluid(96, 21, 192) };
  width: ${ fluid(96, 21, 192) };
`

export const Informations = styled.div`
  margin: ${ rem(16) } 0 ${ rem(12) };

  ${ breakpoint("tablet", `
    margin-left: ${ rem(16) };
  `) }
`

export const Name = styled.h1`
  font-size: ${ ({theme}) => fluid(18, 4, theme.fontSizes.headingSmall) };
`

export const Bio = styled.p`
  color: ${ ({theme}) => theme.colors.darkThree };
  line-height: 1.4;
  margin: ${ fluid(10, 1.5, 12) } 0 ${ fluid(12, 1.5, 16) };

  ${ ({theme}) => `
    color: ${ theme.colors.darkThree };
    font-size: ${ fluid(14, 2.1, theme.fontSizes.default) };
  ` } 
`