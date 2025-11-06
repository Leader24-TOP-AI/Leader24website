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
import { useEffect, Suspense } from "react";

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
      {/* Homepage - Italian (default) */}
      <Route path="/" component={Home} />

      {/* Main pages - Italian */}
      <Route path="/settori" component={SectorsPage} />
      <Route path="/settori/ecommerce" component={EcommercePage} />
      <Route path="/contatti" component={Contacts} />
      <Route path="/casi-studio" component={CaseStudies} />

      {/* Homepage - English */}
      <Route path="/en" component={Home} />

      {/* Main pages - English */}
      <Route path="/en/industries" component={SectorsPage} />
      <Route path="/en/industries/ecommerce" component={EcommercePage} />
      <Route path="/en/contact-us" component={Contacts} />
      <Route path="/en/case-studies" component={CaseStudies} />

      {/* Legal pages - Italian */}
      <Route path="/informativa-cookie" component={Cookie} />
      <Route path="/informativa-privacy" component={Privacy} />
      <Route path="/termini-di-servizio" component={Terms} />

      {/* Legal pages - English */}
      <Route path="/en/cookie" component={Cookie} />
      <Route path="/en/privacy" component={Privacy} />
      <Route path="/en/terms-of-service" component={Terms} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Loading component da mostrare durante il caricamento delle traduzioni
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0A0A10] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg">Caricamento...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Suspense fallback={<LoadingFallback />}>
          <Router />
          <Toaster />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
