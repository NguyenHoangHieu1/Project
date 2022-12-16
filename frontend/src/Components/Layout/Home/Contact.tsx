import Form from "./Form";
import classes from "./Contact.module.css";
const Contact: React.FC = (props) => {
  return (
    <section className={classes.contact}>
      <Form></Form>
    </section>
  );
};
export default Contact;
