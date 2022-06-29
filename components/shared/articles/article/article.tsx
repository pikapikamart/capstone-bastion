import { 
  ArticleImageHolder,
  ArticleOption,
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
import { SrOnly } from "@/styled/shared/helpers";
import { useExpansion } from "@/lib/hooks";


interface ArticleProps {
  article: ArticleData,
  owned: boolean
}

const limitText = ( text: string ) =>{

  const stripped = text.replace(/(<([^>]+)>)/gi, "");

  return stripped.substring(0, 150) + "...";
}

const Article = ( {
  article,
  owned
}: ArticleProps ) =>{
  const { isExpanded, handleExpansion } = useExpansion();  

  return (
    <Wrapper isOwned={ owned }>
      <Information>
        <Writers>
          <li>
            <Link 
              href={ `/writer/${ article.author.username }` }
              passHref >
              <Writer>
                <WriterImage src={ article.author.image?? "/icons/default-avatar.svg" } alt={ writerFullName(article.author) } />
                { writerFullName(article.author) }
              </Writer>
            </Link>
          </li>
          { article.collaborators.map(writer => (
            <li key={ article.searchId }>
              <Link
                href={ `writer/${ writer.username }` }
                passHref>
                <Writer>
                  <WriterImage src={ writer.image?? "/icons/default-avatar.svg" } alt={ writerFullName(writer) } />
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
        <Text>{ limitText(article.content) }</Text>
        <DateContainer>
          <CreatedAt>{ getFullDate(article.createdAt) }</CreatedAt>
          <LikeButton>
            <Like aria-hidden="true" />
          </LikeButton>
        </DateContainer>
      </Information>
      <ArticleImageHolder>
        { owned && (
          <ArticleOption 
            aria-expanded={ isExpanded }
            onClick={ handleExpansion } >
            <SrOnly>Article option</SrOnly>
          </ArticleOption>
        ) }
        <img 
          src={ article.image } 
          alt=""
          aria-hidden="true" />
      </ArticleImageHolder>
    </Wrapper>
  );
}


export default Article;