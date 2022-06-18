import Link from "next/link";
import { 
  CategoryLink,
  Category,
  CategoryList,
  Heading, 
  Wrapper } from "./categories.styled";
import { categoryList } from "./data";


interface CategoriesProps {
  reversed?: boolean
}

const Categories = ( { reversed=false }: CategoriesProps ) =>{

  return (
    <Wrapper isReversed={ reversed } >
      <Heading>Read what interests you</Heading>
      <CategoryList>
        { categoryList.map(category => (
          <Category key={ category+"-link" }>
            <Link 
              href={ `/readings/${ category }` }
              passHref>
                <CategoryLink>{ category }</CategoryLink>
            </Link>
          </Category>
        )) }
      </CategoryList>
    </Wrapper>
  );
}


export default Categories;