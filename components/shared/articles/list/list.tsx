import { ArticleData } from "@/store/tracked";
import { Article } from "../article";


interface ListProps {
  articles: ArticleData[]
}

const List = ( { articles }: ListProps ) =>{

  return (
    <ul>
      { articles.map(article => <Article key={ article.searchId } article={ article } />) }
    </ul>
  );
}


export default List;