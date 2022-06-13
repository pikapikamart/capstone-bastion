import { ArticlesSection } from "@/components/home/articles";
import { HeroSection } from "@/components/home/hero";
import { ArticlesReading } from "@/components/shared/articles";
import { ArticlesData } from "@/store/tracked";


interface HomeProps {
  articles: ArticlesData
}

const Home = ( { articles }: HomeProps ) =>{

  return (
    <main>
      <HeroSection />
      <ArticlesSection>
        <ArticlesReading articles={ articles } />
      </ArticlesSection>
    </main>
  );
}


export default Home;