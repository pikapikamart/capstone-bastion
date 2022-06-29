import { HeroSection } from "@/components/home/hero";
import { ArticleData } from "@/store/tracked";
import { ArticlesSection } from "@/components/home/articles";
import { Articles } from "@/components/shared/articles";
import { Categories } from "@/components/shared/categories";
import { SignedMainWrapper } from "@/styled/shared/collection";


interface HomeProps {
  articles: ArticleData[]
}

const Home = ( { articles }: HomeProps ) =>{

  return (
    <SignedMainWrapper>
      <HeroSection />
      <ArticlesSection>
        <Categories reversed={ true } /> 
        <Articles articles={ articles }/>
      </ArticlesSection>
    </SignedMainWrapper>
  );
}


export default Home;