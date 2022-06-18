import { 
  TabbedInterface, 
  TabControl } from "@/styled/shared/collection"


interface ArticlesProps {
  children: React.ReactNode
}

const Articles = ( { children }: ArticlesProps ) =>{

  const handleKeyDown = ( event: React.KeyboardEvent<HTMLDivElement> ) => {

  }

  return (
    <div>
      <TabbedInterface
        role="tablist"
        aria-label="writer articles selections tab"
        onKeyDown={ handleKeyDown }>
          <TabControl
            role="tab"
            tabIndex={ 0 }
            aria-selected="true"
            id="control-1">
              All
          </TabControl>
      </TabbedInterface>
      { children }
    </div>
  );
}


export default Articles;