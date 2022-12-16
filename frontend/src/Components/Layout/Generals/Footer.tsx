import classes from "./Footer.module.css";
const Footer: React.FC = (props) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerInfo}>
        <div className={classes.title}>
          <h1>Shopify</h1>
        </div>
        <nav className={classes["social-nav"]}>
          <ul>
            <li className={classes.item}>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li className={classes.item}>
              <i className="fa-brands fa-youtube"></i>
            </li>
            <li className={classes.item}>
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li className={classes.item}>
              <i className="fa-brands fa-telegram"></i>
            </li>
          </ul>
        </nav>
      </div>

      <div className={classes.footerEnd}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate,
        eveniet!
      </div>
    </footer>
  );
};

export default Footer;
