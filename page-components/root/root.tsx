import { ArticlesSection } from "@/components/root/articles";
import { HeroSection } from "@/components/root/hero";
import { Articles } from "@/components/shared/articles";
import { Categories } from "@/components/shared/categories";
import { DividedArticles, useDispatch } from "@/store/tracked";
import { useEffect } from "react";


interface RootProps {
  articles: DividedArticles[]
}

const Root = ( { articles }: RootProps ) =>{
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch({ type: "REMOVE_USER" });
  }, [])

  return (
    <main>
      <HeroSection />
      <ArticlesSection>
        <Categories />
        <Articles articles={ articles } />
      </ArticlesSection>
    </main>
  );
}


export default Root;