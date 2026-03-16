import { Link } from "react-router-dom";

const PageLink = ({ link, itemClass, onClick }) => {
  const isHashLink = typeof link.href === "string" && link.href.startsWith("#");
  const isInternalPath =
    typeof link.href === "string" && link.href.startsWith("/");

  const to = isHashLink
    ? { pathname: "/", hash: link.href }
    : isInternalPath
      ? link.href
      : null;

  return (
    <li key={link.id}>
      {to ? (
        <Link to={to} className={itemClass} onClick={onClick}>
          {link.text}
        </Link>
      ) : (
        <a href={link.href} className={itemClass} onClick={onClick}>
          {link.text}
        </a>
      )}
    </li>
  );
};
export default PageLink;
