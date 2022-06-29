import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { SrOnly } from "@/styled/shared/helpers";


export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${ rem(16) } auto 0;
`

export const ImageWrapper = styled.img`
  border-radius: 50%;
  height: ${ fluid(160, 20, 160) };
  margin-bottom: ${ rem(16) };
  width: ${ fluid(160, 20, 160) };
`

export const Label = styled.label`

`

export const FileInput = styled(SrOnly)`

  &:focus-within + ${ Label } {
    outline: 3px dashed rgb(0,36,58);
    outline-offset: 3px;
  }
`