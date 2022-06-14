import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.div`

`

export const Heading = styled.h2`
  font-weight: 600;
  margin-bottom: ${ rem(32) };

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ rem(theme.fontSizes.headingVSmall) };
  ` }
`

export const WriterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

export const Writer = styled.li`
  max-width: ${ rem(256) };
  margin: 0 ${ rem(16) } ${ rem(16) } 0;
`

export const Image = styled.img`
  border-radius: 50%;
  height: ${ rem(96) };
  width: ${ rem(96) };
`

export const Name = styled.a`
  display: block;
  font-weight: 500;  
  margin: ${ rem(8) } 0;

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ rem(theme.fontSizes.headingVSmall) };
  `}
` 

export const Bio = styled.p`
  line-height: 1.4;

  ${ ({theme}) => `
    color: ${ theme.colors.greyOne};
    font-size: ${ rem(theme.fontSizes.textSmall) };
  ` }
`