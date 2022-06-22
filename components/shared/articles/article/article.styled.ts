import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.li`
  &:not(:last-of-type) {
    margin-bottom: ${ rem(48) };
  }

  ${ breakpoint("tablet", `
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
  `) }
`

export const Information = styled.div`

`

export const Writers = styled.ul`
  display: flex;
  margin-bottom: ${ rem(2) };
`

export const Writer = styled.a`
  align-items: center;
  display: flex;
  font-weight: 500;
  line-height: 1.4;
  margin: 0 ${ rem(8) } ${ rem(8) } 0;
  max-width: max-content;

  ${ ({theme}) => `
    color: ${ theme.colors.darkTwo };
    font-size: ${ rem(theme.fontSizes.linkOne) };
  ` }
`

export const WriterImage = styled.img`
  border-radius: 50%;  
  height: ${ rem(24) };
  margin-right: ${ rem(8) };
  width: ${ rem(24) };
`

export const Title = styled.h4`
  margin-bottom: ${ rem(10) };

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ fluid(theme.fontSizes.default, 2.4, theme.fontSizes.headingMedium) };
  ` }
`

export const Text = styled.p`
  font-size: ${ ({theme})  => fluid(14, 3, theme.fontSizes.textMedium)};
  line-height: 1.4;
  margin-bottom: ${ rem(12) };

  ${ ({theme}) => `
    color: ${ theme.colors.darkThree };
    font-size: ${ fluid(14, 3, theme.fontSizes.textMedium) };
  ` }
`

export const DateContainer = styled.div`
  align-items: center;
  display: flex;
`

export const CreatedAt = styled.p`
  margin-right: ${ rem(16) };
  font-style: italic;

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ rem(theme.fontSizes.textSmall) };
  ` }
`

export const LikeButton = styled.button`
  display: flex;
  height: ${ rem(18) };
  width: ${ rem(20) };

  svg {
    height: 100%;
    width: 100%;
  }
`

export const ArticleImageHolder = styled.div`
  display: none;

  ${ breakpoint("tablet", `
    display: block;
    flex: 1 0 ${ fluid(158, 20, 224) };
    margin-left: ${ rem(10) };
    max-width: ${ rem(224) };
  `) }

  img {
    height: ${ rem(144) };
    width: 100%;
  }
`