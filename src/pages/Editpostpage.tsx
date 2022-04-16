import { useState } from "react";
import { deletePost, updatePost } from "../posts/editpost";
import { PostDetailEntity } from "../schema";
import styles from "./Editpostpage.module.less";

interface PropsType {
  post: PostDetailEntity;
}

const Editor: React.FC<{
  text: string;
  change: (to: string) => void;
  type: "sm" | "lg";
}> = ({ text, change, type }) => {
  return (
    <textarea
      className={type === "sm" ? styles.smallEditor : styles.largeEditor}
      onChange={(e) => {
        change(e.target.value);
      }}
    >
      {text}
    </textarea>
  );
};

const Editpostpage: React.FC<PropsType> = ({ post }) => {
  const [title, changeTitle] = useState(post.title);
  const [abstract, changeAbstract] = useState(post.abstract);
  const [content, changeContent] = useState(post.content);

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    updatePost({ id: post.id, title, abstract, content });
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    window.alert("你确定要删除吗");
    deletePost({ id: post.id });
  }

  return (
    <>
      <div className={styles.container}>
        <form>
          <label>title</label>
          <br />
          <Editor text={title} change={changeTitle} type="sm" />
          <br />

          <label>abstract</label>
          <br />
          <Editor text={abstract} change={changeAbstract} type="sm" />
          <br />

          <label>content</label>
          <br />
          <Editor text={content} change={changeContent} type="lg" />
          <br />

          <button onClick={(e) => handleSubmit(e)}>update</button>
          <button onClick={(e) => handleDelete(e)}>delete</button>
        </form>
      </div>
    </>
  );
};

export default Editpostpage;
