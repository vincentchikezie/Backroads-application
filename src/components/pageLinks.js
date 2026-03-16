import { pageLinks as linksData } from "../data";
import PageLink from "./PageLink";

const PageLinks = ({ id, parentClass, itemClass, onItemClick }) => {
  return (
    <ul className={parentClass} id={id ?? "nav-links"}>
      {linksData.map((link) => {
        return (
          <PageLink
            key={link.id}
            link={link}
            itemClass={itemClass}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};
export default PageLinks;
