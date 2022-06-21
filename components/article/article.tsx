import { getFullDate } from "@/lib/utils";
import { ArticleData, Writer } from "@/store/tracked";
import { 
  ArticleInformationContainer,
  ArticleDate,
  ContentContainer,
  ImageHolder, 
  LikeButton, 
  TextsContainer, 
  Title, 
  Wrapper, 
  WritersContainer} from "./article.styled";
import LikeIcon from "@/public/icons/icon-heart.svg";
import { Writers } from "@/components/shared/writers";
import xss from "xss";


interface ArticleProps {
  article: ArticleData
}

const mergedWriters = ( author: Writer, collaborators: Writer[] ) =>{
  const writers = Array<Writer>().concat(collaborators);
  writers.push(author);

  return writers;
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
          <TextsContainer
            dangerouslySetInnerHTML={ {
              __html: xss(article.content)
            } }  >
          </TextsContainer>
          <div>
            <LikeButton>
              <LikeIcon aria-hidden="true" />
            </LikeButton>
          </div>
        </ContentContainer>
      </ArticleInformationContainer>
      <WritersContainer>
        <Writers writers={ mergedWriters(article.author, article.collaborators) }>
          Writers
        </Writers>
      </WritersContainer>
    </Wrapper>
  );
}


export default Article;