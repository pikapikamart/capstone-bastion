import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";
import { Wrapper as WritersWrapper } from "@/components/shared/writers/writers.styled";


export const Wrapper = styled.main`
  padding: ${ fluid(48, 8.5, 80) } ${ rem(16) } ${ rem(192) };

  ${ WritersWrapper } {
    display: none;
  }

  ${ breakpoint("tablet", `
  padding: ${ fluid(48, 8.5, 80) } ${ rem(40) };
  `) }

  ${ breakpoint("desktop", `
    align-items: flex-start;
    display: flex;

    ${ WritersWrapper } {
      display: block;
    }
  `) }
`

export const ContentContainer = styled.div`
  max-width: ${ rem(826) };
`