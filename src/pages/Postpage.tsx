import { Helmet } from "react-helmet";
import styles from "./Postpage.module.less";
import markdownParser from "../markdown/parser";
import { useNavigation } from "@tth37/react-navi";
import { PostDetailEntity } from "../schema";
import moment from "moment";
import Container from "../layout/Container";
import Markdown from "../components/Markdown";
import { useEffect } from "react";

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
    navigation.navigate("/");
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
        首页
      </span>
      <span onClick={handleGoEdit}>&nbsp;/&nbsp;正文</span>
    </div>
  );
};

const HeaderDivider: React.FC = () => {
  return <hr className={styles.headerDivider} />;
};

const Postpage: React.FC<PropsType> = ({ post }) => {
  return (
    <>
      <Helmet>
        <title>{post.title + " | tth37's blog"}</title>
      </Helmet>
      <Container>
        <Header title={post.title} date={post.date} id={post.id} />
        <HeaderDivider />
        <Markdown markdownText={post.content}></Markdown>
      </Container>
    </>
  );
};

export default Postpage;
