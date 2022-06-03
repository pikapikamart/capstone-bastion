import { HTMLHead } from "./head";
import { GlobalStyles } from "@/styled/theme";


interface LayoutChildren{
  children: React.ReactNode
}

const Layout = ({ children } : LayoutChildren) =>{
  
  return (
    <>
      <HTMLHead />
      <GlobalStyles />
      { children }
    </>
  );
}


export default Layout;