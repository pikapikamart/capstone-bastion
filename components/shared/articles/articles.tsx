import { 
  ContentContainer, 
  GenreContainer, 
  GenreHeading, 
  Wrapper } from "./articles.styled";
import { 
  ArticleData, 
  DividedArticles } from "@/store/tracked";
import { isDividedArticles } from "@/lib/utils";
import { ArticleList } from "./list";


interface ArticlesProps {
  articles: ArticleData[] | DividedArticles[]
}

const Articles = ( { articles }: ArticlesProps ) =>{
  
  return (
    <Wrapper>
      { isDividedArticles(articles) && articles.map(readings => (
        <ContentContainer key={ readings.genre }>
          <GenreContainer>
            <GenreHeading>{ readings.genre }</GenreHeading>
          </GenreContainer>
          <ArticleList articles={ readings.readings } />
        </ContentContainer>
      )) }
    </Wrapper>
  )
}


export default Articles;