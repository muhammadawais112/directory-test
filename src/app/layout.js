import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AgencyProvider } from "./context/agency";
import { TopnavProvider } from "./context/topnav";
import { UserProvider } from "./context/user";



export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ backgroundColor: "white" }}>
      <head />
      <body>
        <AgencyProvider>
          <TopnavProvider>
            <UserProvider>
              <Header />
              {children}
              <Footer />
            </UserProvider>
          </TopnavProvider>
        </AgencyProvider>
      </body>
    </html>
  );
}
