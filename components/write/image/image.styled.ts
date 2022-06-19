import styled, { css } from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


interface AddImageProps {
  isDone: boolean
}

export const AddImage = styled.label<AddImageProps>`
  border-radius: 50%;
  border: 1px solid ${ ({theme}) => theme.colors.greyThree };
  background: url("/icons/icon-add-image.svg") no-repeat center center;
  display: block;
  height: ${ rem(80) };
  width: ${ rem(80) };
  position: ${ ({isDone}) => isDone? "absolute" : "static" };

  ${ ({isDone}) => {
    switch(isDone) {
      case true: return css`
        background: none;
        border-radius: revert;
        border: none;
        height: 100%;
        width: 100%;
        position: absolute;
      `
      case false: return css`
        color: red;
      `
    }
  } }
`

export const Wrapper = styled.div`
  margin-bottom: ${ rem(40) };
  position: relative;

  ${ breakpoint("tablet", `
    margin-bottom: ${ rem(24) };
  `) }

  input:focus-within + ${ AddImage } {
    outline: 3px dashed rgb(0, 36, 58);
    outline-offset: 3px;
  }
`