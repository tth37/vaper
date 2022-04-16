import { createPostRequest } from "../utils/api";

interface UpdatePostDto {
  id: number;
  title: string;
  abstract: string;
  content: string;
}

interface CreatePostDto {
  title: string;
  abstract: string;
  content: string;
}

export async function updatePost(updatePostDto: UpdatePostDto) {
  const fetchUpdatePost = createPostRequest<UpdatePostDto, any>(
    "/post/updatePost"
  );
  const res = await fetchUpdatePost(updatePostDto);
  if (res.status === "success") window.location.reload();
}

export async function createPost(createPostDto: CreatePostDto) {
  const fetchCreatePost = createPostRequest<CreatePostDto, any>(
    "/post/createPost"
  );
  const res = await fetchCreatePost(createPostDto);
  if (res.status === "success") window.location.reload();
}

export async function deletePost(deletePostDto: { id: number }) {
  const fetchDeletePost = createPostRequest<{ id: number }, any>(
    "/post/deletePost"
  );
  const res = await fetchDeletePost(deletePostDto);
  if (res.status === "success") window.location.reload();
}
