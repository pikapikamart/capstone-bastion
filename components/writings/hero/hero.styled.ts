import styled from "styled-components";
import { rem } from "@/styled/functions";


export const ControlContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0 ${ rem(4) };
  margin-top: ${ rem(24) };
`