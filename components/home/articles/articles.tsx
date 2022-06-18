import { TabbedInterface, TabControl } from "@/styled/shared/collection";
import { ContentContainer, Wrapper } from "./articles.styled";


interface ArticlesProps {
  children?: React.ReactNode
}

const Articles = ( { children }: ArticlesProps ) =>{

  const handleKeydown = ( event: React.KeyboardEvent<HTMLDivElement> ) =>{

  }

  return (
    <Wrapper>
      <TabbedInterface
        role="tablist"
        aria-label="articles selections tabs"
        onKeyDown={ handleKeydown }>
        <TabControl
          role="tab"
          tabIndex={ 0 }
          aria-selected="true"
          id="control-1">
            All
          </TabControl>
      </TabbedInterface>
      <ContentContainer>
        { children }
      </ContentContainer>
    </Wrapper>
  );
}


export default Articles;