import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.div`
  padding: ${ fluid(64, 10, 112) } ${ rem(16) };

  ${ breakpoint("tablet", `
    align-items: flex-start;
    display: flex;
    padding: ${ fluid(64, 8.5, 112) } ${ fluid(40, 5, 96) };
  `) }
`