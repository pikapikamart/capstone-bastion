import { HTMLHead } from "./head";
import { GlobalStyles } from "@/styled/theme";
import { Header } from "@/components/layout/header";
import { SidebarMainContainer } from "./layout.styled";
import { Sidebar } from "@/components/layout/sidebar";


interface LayoutChildren{
  children: React.ReactNode
}

const Layout = ({ children } : LayoutChildren) =>{
  
  return (
    <>
      <HTMLHead />
      <GlobalStyles />
      <Header />
      <SidebarMainContainer>
        <Sidebar />
        { children }
      </SidebarMainContainer>
    </>
  );
}


export default Layout;