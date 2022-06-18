import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.main`
  padding: ${ fluid(40, 10, 48) } ${ rem(16) };

  ${ breakpoint("tablet", `
    padding: ${ rem(48) } ${ rem(40) }
  `) }
`