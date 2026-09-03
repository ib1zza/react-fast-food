import { useEffect, useState } from "react";
import { ICategory } from "../../types";
import { fetchCategories } from "../../api/catalogApi";

const CategoriesNav: React.FC = () => {
  const [data, setData] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCategories();

      if (res) {
        setData(res);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="side-menu">
      {data.map((item) => (
        <a
          key={item.id}
          className="side-menu-item"
          href={`#category-${item.id}`}
        >
          <img src={item.image} className="side-menu-image" />
          {item.name}{" "}
        </a>
      ))}
    </div>
  );
};

export { CategoriesNav };
