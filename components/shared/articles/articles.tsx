import { ArticlesContainer, ContentContainer, GenreContainer, GenreHeading, Wrapper } from "./articles.styled";
import { Categories } from "./categories";
import { ArticlesData } from "@/store/tracked";
import { isDividedArticles } from "@/lib/utils";
import { ArticleList } from "./list";


interface ArticlesProps {
  articles: ArticlesData
  reversed?: boolean,
  divided?: boolean,
}

const Articles = ( {
  articles,
  reversed,
  divided
}: ArticlesProps ) =>{
  
  return (
    <Wrapper>
      <Categories />
      <ArticlesContainer>
        { isDividedArticles(articles) && articles.map(readings => (
          <ContentContainer key={ readings.genre }>
            <GenreContainer>
              <GenreHeading>{ readings.genre }</GenreHeading>
            </GenreContainer>
            <ArticleList articles={ readings.readings } />
          </ContentContainer>
        )) }
      </ArticlesContainer>
    </Wrapper>
  )
}


export default Articles;