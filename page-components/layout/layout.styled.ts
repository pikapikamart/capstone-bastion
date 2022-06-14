import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const SidebarMainContainer = styled.div`
  
  ${ breakpoint("desktop", `
    align-items: flex-start;
    display: grid;
    gap: ${ rem(40) } 0;
    grid-template-columns: ${ rem(104) } 1fr;
  `) }
`