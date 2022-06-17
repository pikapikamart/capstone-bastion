import Link from "next/link";
import { 
  CategoryLink,
  Category,
  CategoryList,
  Heading, 
  Wrapper } from "./categories.styled";
import { categoryList } from "./data";


const Categories = () =>{

  return (
    <Wrapper>
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