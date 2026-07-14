import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer } from "../components/Site";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <div className="eyebrow mb-4">404</div>
          <h1 className="display-heading text-4xl md:text-5xl">
            Sidan finns <span className="text-brand-green">inte här</span>.
          </h1>
          <p className="mt-5 text-sm text-ink/65 leading-relaxed">
            Sidan du letar efter finns inte eller har flyttats.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors"
            >
              Till startsidan
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="display-heading text-2xl text-ink">Sidan kunde inte laddas</h1>
        <p className="mt-2 text-sm text-ink/65">
          Något gick fel hos oss. Prova att ladda om sidan eller gå tillbaka till startsidan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-green"
          >
            Försök igen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green"
          >
            Till startsidan
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ABO Growth | Ordning i era system och AI" },
      { name: "description", content: "ABO Growth hjälper företag att få koll på sina digitala system och AI-verktyg: struktur, ordning och effektivitet. Baserade i Stockholm." },
      { name: "author", content: "ABO Growth" },
      { name: "theme-color", content: "#1F8A5C" },
      { property: "og:site_name", content: "ABO Growth" },
      { property: "og:title", content: "ABO Growth | Ordning i era system och AI" },
      { property: "og:description", content: "Få koll på era digitala system och AI-verktyg. Struktur och ordning, från Stockholm." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "sv_SE" },
      { property: "og:image", content: "https://abogrowth.se/og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "ABO Growth: Ordning i era digitala system och AI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://abogrowth.se/og.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
