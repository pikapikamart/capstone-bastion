import { Wrapper } from "./articles.styled";


interface ArticlesProps {
  children: React.ReactNode
}

const Articles = ( { children }: ArticlesProps ) =>{

  return (
    <Wrapper>
      { children }
    </Wrapper>
  );
}


export default Articles;