import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.main`
  padding: ${ fluid(48, 10, 80) } ${ rem(16) };

  ${ breakpoint("tablet", `
    padding: ${ fluid(48, 10, 80) } ${ rem(40) };
  `) }
`