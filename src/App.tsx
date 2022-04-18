import { lazy, map, mount, redirect, route } from "navi";
import { Suspense } from "react";
import { Router, View } from "@tth37/react-navi";
import Createpostpage from "./pages/Createpostpage";
import Editpostpage from "./pages/Editpostpage";
import Homepage from "./pages/Homepage";
import Postpage from "./pages/Postpage";
import { getPostDetail } from "./posts/postdetail";
import { getPostCount, getPostList } from "./posts/postlist";

async function sleep() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

const routes = mount({
  "/": map(async (req) => {
    const cur = 1;

    let tot = await getPostCount();
    if (tot % 8 === 0) tot = tot / 8;
    else tot = Math.floor(tot / 8) + 1;

    const postList = await getPostList(cur);

    return route({
      view: <Homepage cur={cur} tot={tot} postList={postList} />,
    });
  }),
  "/c": route({ view: <Createpostpage /> }),
  "/p/:id": lazy(() => import("./pages/PostpageRouter")),
  "/e/:id": map(async (req) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return redirect("/");
    if (id <= 0) return redirect("/");

    const post = await getPostDetail(id);
    if (!post) return redirect("/");

    return route({ view: <Editpostpage post={post} /> });
  }),
  "/h/:page": map(async (req) => {
    const cur = parseInt(req.params.page, 10);
    if (isNaN(cur)) return redirect("/");
    if (cur <= 0) return redirect("/");

    let tot = await getPostCount();
    if (tot % 8 === 0) tot = tot / 8;
    else tot = Math.floor(tot / 8) + 1;
    if (cur > tot) return redirect("/");

    const postList = await getPostList(cur);

    return route({
      view: <Homepage cur={cur} tot={tot} postList={postList} />,
    });
  }),
});

const App: React.FC = () => {
  return (
    <Router routes={routes}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
};

export default App;
