import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";
import { Wrapper as Categories } from "@/components/shared/categories/categories.styled";


export const Wrapper = styled.div`
  margin-top: ${ rem(40) };
`

export const ContentContainer = styled.div`
  margin-bottom: ${ rem(96) };

  & ${ Categories } {
    display: none;
  }

  ${ breakpoint("tablet", `
    align-items: flex-start;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    margin-bottom: ${ rem(128) };

    & ${ Categories } {
      display: block;
    }
  `) }

  ${ breakpoint("desktop", `
    margin-bottom: ${ rem(192) };
  `) }

  
`