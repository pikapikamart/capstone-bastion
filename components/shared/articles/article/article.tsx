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
import { 
  ArticleData, 
  Writer as WriterType } from "@/store/tracked";
import Like from "@/public/icons/icon-heart.svg";
import Link from "next/link";


interface ArticleProps {
  article: ArticleData
}

const writerFullName = ( writer: WriterType ) => {

  return writer.firstName + " " + writer.lastName;
}

const limitText = ( text: string ) =>{
  
  return text.substring(0, 150) + "...";
}

const getFullDate = ( createdAt: string ) =>{
  const date = new Date(createdAt);

  const [
    day,
    month,
    year
  ] = [
    date.getDate(),
    date.toLocaleDateString([], { month: "long" }),
    date.getFullYear()
  ]

  return [ month, day, year ].join(" ");
}

const sanitizeString = ( text: string ) => {

  return text.replace(/[^a-z]+/gi, " ").trim().toLowerCase().split(" ").join("-");
}

const Article = ( { article }: ArticleProps ) =>{
  
  return (
    <Wrapper>
      <Information>
        <Writers>
          <li>
            <Link 
              href={ `writer/${ (article.author.firstName+article.author.lastName).toLowerCase() }` }
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
                href={ `writer/${ (article.author.firstName+article.author.lastName).toLowerCase() }` }
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
            href={ `${ sanitizeString(article.title) }-${ article.searchId }` }
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