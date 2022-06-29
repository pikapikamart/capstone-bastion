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
  children?: React.ReactNode,
  articles: ArticleData[] | DividedArticles[],
  owned?: boolean
}

const Articles = ( {
  children,
  articles,
  owned=false
}: ArticlesProps ) =>{
  
  return (
    <>
      { articles.length!==0 && (
        <Wrapper>
          { isDividedArticles(articles) && articles.map(readings => (
            <ContentContainer key={ readings.genre }>
              <GenreContainer>
                <GenreHeading>{ readings.genre }</GenreHeading>
              </GenreContainer>
              <ArticleList 
                articles={ [...readings.readings].reverse() }
                owned={ owned } />
            </ContentContainer>
          )) }
          { !isDividedArticles(articles) && (
            <ArticleList 
              articles={ [...articles].reverse() }
              owned={ owned } />
          ) }
          { children }
        </Wrapper>
      ) }
      { articles.length===0 && <div></div> }
    </>
  )
}


export default Articles;