import styles from "./Homepage.module.less";
import { Helmet } from "react-helmet";
import Pagination from "../components/Pagination";
import { useNavigation } from "react-navi";
import { PostEntity } from "../schema";
import PostList from "../components/PostList";

interface PropsType {
  cur: number;
  tot: number;
  postList: PostEntity[];
}

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1>tth37's blog</h1>
      <h2>编辑我的个性签名</h2>
    </div>
  );
};

const HeaderDivider: React.FC = () => {
  return <hr className={styles.headerDivider} />;
};

const Homepage: React.FC<PropsType> = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <div className={styles.container}>
        <Header />
        <HeaderDivider />
        <PostList postList={props.postList} />
        <Pagination
          tot={props.tot}
          cur={props.cur}
          change={(to: number) => {
            navigation.navigate("/h/" + to);
          }}
        />
      </div>
    </>
  );
};

export default Homepage;
