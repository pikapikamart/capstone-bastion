import { Wrapper } from "./home.styled";
import { HeroSection } from "@/components/home/hero";
import { ArticleData } from "@/store/tracked";
import { ArticlesSection } from "@/components/home/articles";
import { Articles } from "@/components/shared/articles";
import { Categories } from "@/components/shared/categories";


interface HomeProps {
  articles: ArticleData[]
}

const Home = ( { articles }: HomeProps ) =>{

  return (
    <Wrapper>
      <HeroSection />
      <ArticlesSection>
        <Categories reversed={ true } /> 
        <Articles articles={ articles }/>
      </ArticlesSection>
    </Wrapper>
  );
}


export default Home;