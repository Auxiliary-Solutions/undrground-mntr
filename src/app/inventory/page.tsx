export default function InventoryPage() {
  return (
    <section className="container mx-auto flex flex-col">
      <h1 className="font-bold text-3xl">Inventory</h1>
      <p className="font-mono text-muted-foreground">
        This could be a page to display a users collection. If you want. Really
        just an example of how to create a new page if you&apos;re not familiar
        with Next.js. In the new app router all components are by default server
        components. This means any fetching done on this page would be run on
        the server, not on the client. This is great for SEO and performance.
        But also leads to some gotchas. For example server components dont have
        the same level of interactivity as client components, a button cannot
        have a onClick handler in here and we cannot use client hooks like
        useState. To force a component to be a client you&apos;ll need to add
        &ldquo;use client&ldquo; to the top of the file, check out the minter
        components for examples of this. Then include those components in the
        server components to have the best of both worlds.
      </p>
    </section>
  );
}
