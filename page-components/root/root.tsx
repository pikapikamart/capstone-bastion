import { ArticlesSection } from "@/components/root/articles";
import { HeroSection } from "@/components/root/hero";
import { Articles } from "@/components/shared/articles";
import { Categories } from "@/components/shared/categories";
import { DividedArticles } from "@/store/tracked";


interface RootProps {
  articles: DividedArticles[]
}

const Root = ( { articles }: RootProps ) =>{

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