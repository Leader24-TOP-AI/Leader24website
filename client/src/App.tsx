import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import SectorsPage from "@/pages/SectorsPage";
import Contacts from "@/pages/Contacts";
import CaseStudies from "@/pages/CaseStudies";
import EcommercePage from "@/pages/EcommercePage";
import Cookie from "@/pages/Cookie";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  // Hook per ottenere il pathname corrente
  const [pathname] = useLocation();
  
  // Esegui lo scroll in cima alla pagina quando cambia la route
  useEffect(() => {
    // Controlla se ci sono hash espliciti nell'URL (#), altrimenti scorri in cima
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      console.log(`Router: navigazione a ${pathname} - scrollato in cima`);
    } else {
      console.log(`Router: navigazione a ${pathname} con hash ${window.location.hash} - mantenuta posizione di scroll`);
    }
  }, [pathname]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/en/" component={Home} />
      <Route path="/settori" component={SectorsPage} />
      <Route path="/en/industries" component={SectorsPage} />
      <Route path="/settori/ecommerce" component={EcommercePage} />
      <Route path="/en/industries/ecommerce" component={EcommercePage} />
      <Route path="/contatti" component={Contacts} />
      <Route path="/en/contact-us" component={Contacts} />
      <Route path="/casi-studio" component={CaseStudies} />
      <Route path="/en/case-studies" component={CaseStudies} />
      <Route path="/informativa-cookie" component={Cookie} />
      <Route path="/cookie" component={Cookie} />
      <Route path="/en/cookie" component={Cookie} />
      <Route path="/informativa-privacy" component={Privacy} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/en/privacy" component={Privacy} />
      <Route path="/termini-di-servizio" component={Terms} />
      <Route path="/terms-of-service" component={Terms} />
      <Route path="/en/terms-of-service" component={Terms} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
