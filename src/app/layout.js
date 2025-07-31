"use client"
import "./globals.css";
import Footer from "./components/Footer";
import { AgencyProvider } from "./context/agency";
import { TopnavProvider } from "./context/topnav";
import { UserProvider } from "./context/user";
import { useParams, usePathname } from "next/navigation";
import Header from "./components/Header";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderRoutes = '/app';
  const showHeader = hideHeaderRoutes.includes(pathname);
  console.log("hideHeaderRoutes hideHeaderRoutes", hideHeaderRoutes, showHeader)
  const {agency_id} = useParams()

  return (
    <html lang="en" style={{backgroundColor:"white"}}>
      <body>
        <AgencyProvider>
          <TopnavProvider>
            <UserProvider>
              <Header agency_id={agency_id} />
              {children}
              <Footer />
            </UserProvider>
          </TopnavProvider>
        </AgencyProvider>
      </body>
    </html>
  );
}
