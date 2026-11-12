import { createFileRoute } from "@tanstack/react-router";
import { documents } from "@/data/portfolio";
import { Viewer } from "@/components/portfolio/Viewer";

export const Route = createFileRoute("/view/$key")({
  head: ({ params }) => {
    const title = documents[params.key]?.title ?? "Document";
    const description = `${title} by Yuvraj Ruparel, Mechanical Engineering student at Duke University.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ViewPage,
});

function ViewPage() {
  const { key } = Route.useParams();
  return <Viewer docKey={key} />;
}
