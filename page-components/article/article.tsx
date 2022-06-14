import { ArticleSection } from "@/components/article";
import { ArticleData } from "@/store/tracked";


interface ArticleProps {
  article: ArticleData
}

const Article = ( { article }: ArticleProps ) =>{

  return (
    <ArticleSection article={ article } />
  );
}


export default Article;