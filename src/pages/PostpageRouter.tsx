import { map, redirect, route } from "navi";
import { getPostDetail } from "../posts/postdetail";
import Postpage from "./Postpage";

export default map(async (req) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return redirect("/");
  if (id <= 0) return redirect("/");

  const post = await getPostDetail(id);
  if (!post) return redirect("/");

  return route({ view: <Postpage post={post} /> });
})