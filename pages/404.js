import Link from "next/link";
import MetaLayout from "@/components/MetaLayout";
import styles from "@/styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <MetaLayout title="Page not found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle style={{marginRight: '16px'}} />
          404
        </h1>
        <h4>Sorry, couldn't find the page you are looking for!</h4>
        <Link href="/">Go back to home page</Link>
      </div>
    </MetaLayout>
  );
};

export default NotFoundPage;
