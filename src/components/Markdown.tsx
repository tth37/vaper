import markdownParser from "../markdown/parser";
import styles from "./Markdown.module.less";

const Markdown: React.FC<{ markdownText: string }> = ({ markdownText }) => {
  const htmlText = markdownParser(markdownText);
  return (
    <div
      className={styles.main}
      dangerouslySetInnerHTML={{ __html: htmlText }}
    ></div>
  );
};

export default Markdown;
