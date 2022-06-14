import { 
  ArticleImageHolder,
  CreatedAt,
  DateContainer,
  Information, 
  LikeButton, 
  Text, 
  Title, 
  Wrapper, 
  Writer, 
  WriterImage, 
  Writers } from "./article.styled";
import { ArticleData } from "@/store/tracked";
import Like from "@/public/icons/icon-heart.svg";
import Link from "next/link";
import { 
  sanitizeArticleLink,
  getFullDate,
  writerFullName } from "@/lib/utils";


interface ArticleProps {
  article: ArticleData
}

const limitText = ( text: string ) =>{
  
  return text.substring(0, 150) + "...";
}

const Article = ( { article }: ArticleProps ) =>{
  
  return (
    <Wrapper>
      <Information>
        <Writers>
          <li>
            <Link 
              href={ `/writer/${ (writerFullName(article.author, false)).toLowerCase() }` }
              passHref >
              <Writer>
                <WriterImage src={ article.author.image } alt={ writerFullName(article.author) } />
                { writerFullName(article.author) }
              </Writer>
            </Link>
          </li>
          { article.collaborators.map(writer => (
            <li key={ article.searchId + writer.searchId }>
              <Link
                href={ `writer/${ writerFullName(writer, false).toLowerCase() }` }
                passHref>
                <Writer>
                  <WriterImage src={ writer.image } alt={ writerFullName(writer) } />
                  { writerFullName(writer) }
                </Writer>
              </Link>
            </li>
          )) }
        </Writers>
        <Title>
          <Link 
            href={ `/${ sanitizeArticleLink(article.title) }-${ article.searchId }` }
            passHref>
            <a>{ article.title }
            </a>
          </Link>
        </Title>
        <Text>{ limitText(article.content[0]) }</Text>
        <DateContainer>
          <CreatedAt>{ getFullDate(article.createdAt) }</CreatedAt>
          <LikeButton>
            <Like aria-hidden="true" />
          </LikeButton>
        </DateContainer>
      </Information>
      <ArticleImageHolder>
        <img 
        src={ article.image } 
        alt=""
        aria-hidden="true" />
      </ArticleImageHolder>
    </Wrapper>
  );
}


export default Article;