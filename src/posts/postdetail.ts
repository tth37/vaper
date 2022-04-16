import { PostDetailEntity } from "../schema";
import { createGetRequest } from "../utils/api";

export async function getPostDetail(id: number) {
  const fetchGetPostDetail = createGetRequest<{ id: number }, PostDetailEntity>(
    "/post/getPostDetail"
  );
  const res = await fetchGetPostDetail({ id });
  if (res.status === "success" && res.responseData) return res.responseData;
  return null;
}
