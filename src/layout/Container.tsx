import React from "react";
import styles from "./Container.module.less";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
