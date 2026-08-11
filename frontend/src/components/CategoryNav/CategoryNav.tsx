import { useEffect, useState } from "react";
import { ICategory } from "../../types";
import { fetchCategories } from "../../api/catalogApi";

 

const CategoriesNav: React.FC = () => {
    const [data, setData] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetchCategories();

            if (res) {
                setData(res);
            }
        };

        fetchData();
    },[])

    return (<div>
        {data.map((item) => (
            <div key={item.id}> {item.name} </div>
        ))}
    </div>);
}

export { CategoriesNav };