import { Helmet } from "react-helmet";
import styles from "./Postpage.module.less";
import markdownParser from "../markdown/parser";
import { useNavigation } from "@tth37/react-navi";
import { PostDetailEntity } from "../schema";
import moment from "moment";
import Container from "../layout/Container";

interface PropsType {
  post: PostDetailEntity;
}

const Header: React.FC<{ id: number; title: string; date: string }> = ({
  title,
  date,
  id,
}) => {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleGoEdit() {
    window.open("/e/" + id);
  }

  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <p className={styles.date}>
        {moment(date).format("YYYY 年 MM 月 DD 日")}
      </p>
      <span className={styles.back} onClick={handleGoBack}>
        &lt;&lt;返回
      </span>
      <span className={styles.back} onClick={handleGoEdit}>
        &lt;&lt;编辑
      </span>
    </div>
  );
};

const HeaderDivider: React.FC = () => {
  return <hr className={styles.headerDivider} />;
};

const Main: React.FC<{ markdownText: string }> = ({ markdownText }) => {
  const htmlText = markdownParser(markdownText);
  return (
    <div
      className={styles.main}
      dangerouslySetInnerHTML={{ __html: htmlText }}
    ></div>
  );
};

const Postpage: React.FC<PropsType> = ({ post }) => {
  return (
    <>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <Container>
        <Header title={post.title} date={post.date} id={post.id} />
        <HeaderDivider />
        <Main markdownText={post.content} />
      </Container>
    </>
  );
};

export default Postpage;
