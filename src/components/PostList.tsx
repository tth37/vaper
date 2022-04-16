import moment from "moment";
import { useNavigation } from "react-navi";
import { PostEntity } from "../schema";
import styles from "./PostList.module.less";

const Post: React.FC<{ post: PostEntity }> = ({ post }) => {
  const navigation = useNavigation();

  return (
    <div className={styles.post}>
      <h3
        onClick={() => {
          navigation.navigate("/p/" + post.id);
        }}
      >
        {post.title}
      </h3>
      <p className={styles.abstract}>{post.abstract}</p>
      <p className={styles.date}>{moment(post.date).fromNow()}</p>
    </div>
  );
};

const PostDivider: React.FC = () => {
  return <hr className={styles.postDivider} />;
};

const PostList: React.FC<{ postList: PostEntity[] }> = ({ postList }) => {
  return (
    <>
      {postList.map((post, index) => {
        return (
          <>
            <Post post={post} />
            {index === postList.length - 1 ? null : <PostDivider />}
          </>
        );
      })}
    </>
  );
};

export default PostList;
