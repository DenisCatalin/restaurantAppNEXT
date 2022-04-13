import styles from "./LoadingComponent.module.css";

const LoadingComponent = () => {
  return (
    <div className={styles.container}>
      <div class={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
