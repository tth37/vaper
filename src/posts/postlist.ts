import { PostEntity } from "../schema";
import { createGetRequest } from "../utils/api";

export async function getPostList(page: number): Promise<PostEntity[]> {
  const fetchGetPostList = createGetRequest<
    { limit: number; offset: number },
    PostEntity[]
  >("/post/getPostList");
  const res = await fetchGetPostList({
    limit: 8,
    offset: (page - 1) * 8,
  });
  if (res.status === "success" && res.responseData) return res.responseData;
  return [];
}

export async function getPostCount() {
  const fetchGetPostCount = createGetRequest<null, number>(
    "/post/getPostCount"
  );
  const res = await fetchGetPostCount();
  if (res.status === "success" && res.responseData) {
    return res.responseData;
  }
  return 0;
}
