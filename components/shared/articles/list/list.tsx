import { ArticleData } from "@/store/tracked";
import { Article } from "../article";


interface ListProps {
  articles: ArticleData[],
  owned: boolean
}

const List = ( {
  articles,
  owned
}: ListProps ) =>{

  return (
    <ul>
      { articles.map(article => (
        <Article 
          key={ article.searchId } 
          article={ article }
          owned={ owned } />
      )) }
    </ul>
  );
}


export default List;