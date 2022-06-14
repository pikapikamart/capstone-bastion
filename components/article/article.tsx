import { getFullDate } from "@/lib/utils";
import { ArticleData } from "@/store/tracked";
import { 
  ArticleInformationContainer,
  ArticleDate,
  ContentContainer,
  ImageHolder, 
  LikeButton, 
  Text, 
  TextsContainer, 
  Title, 
  Wrapper } from "./article.styled";
import LikeIcon from "@/public/icons/icon-heart.svg";


interface ArticleProps {
  article: ArticleData
}

const Article = ( { article }: ArticleProps ) =>{

  return (
    <Wrapper>
      <ArticleInformationContainer>
        <ImageHolder>
          <img 
            alt=""
            src={ article.image }
            aria-hidden="true" />
        </ImageHolder>
        <ContentContainer>
          <Title>{ article.title }</Title>
          <ArticleDate>{ getFullDate(article.createdAt) }</ArticleDate>
          <TextsContainer>
            { article.content.map((text, index) => <Text key={ `article-text-${ index }` }>{ text }</Text>) }
          </TextsContainer>
          <div>
            <LikeButton>
              <LikeIcon aria-hidden="true" />
            </LikeButton>
          </div>
        </ContentContainer>
      </ArticleInformationContainer>
    </Wrapper>
  );
}


export default Article;