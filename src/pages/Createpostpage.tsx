import { useState } from "react";
import { createPost, updatePost } from "../posts/editpost";
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

const Createpostpage: React.FC = () => {
  const [title, changeTitle] = useState("");
  const [abstract, changeAbstract] = useState("");
  const [content, changeContent] = useState("");

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    createPost({ title, abstract, content });
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

          <button onClick={(e) => handleSubmit(e)}>create</button>
        </form>
      </div>
    </>
  );
};

export default Createpostpage;
