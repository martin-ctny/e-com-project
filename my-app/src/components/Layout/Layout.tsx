import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
