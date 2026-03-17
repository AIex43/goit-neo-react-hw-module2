import css from "./Notification.module.css";

export default function Notification({ message }) {
  return <p className={css.text}>{message}</p>;
}