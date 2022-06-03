import { HTMLHead } from "./head";
import { GlobalStyles } from "@/styled/theme";
import { Header } from "@/components/layout/header";


interface LayoutChildren{
  children: React.ReactNode
}

const Layout = ({ children } : LayoutChildren) =>{
  
  return (
    <>
      <HTMLHead />
      <GlobalStyles />
      <Header />
      { children }
    </>
  );
}


export default Layout;