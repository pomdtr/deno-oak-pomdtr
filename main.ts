import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import data from "./data.json" assert { type: "json" };

const router = new Router();
router.get("/", (context) => {
  context.response.body = JSON.stringify(
    {
      type: "list",
      items: data.map((dinosaur) => ({
        title: dinosaur.name,
        subtitle: dinosaur.description,
        actions: [
          { type: "copy", title: "Copy Name", text: dinosaur.name },
          {
            type: "copy",
            title: "Copy Description",
            text: dinosaur.description,
          },
        ],
      })),
    },
    null,
    2
  );
});

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
