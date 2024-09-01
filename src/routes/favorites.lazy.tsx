import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/favorites")({
  component: About,
});

function About() {
  return <div className='p-2 underline'>Hello from About!</div>;
}
