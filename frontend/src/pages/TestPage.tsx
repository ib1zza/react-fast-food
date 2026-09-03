import React, { useState } from "react";
import Test, { Test2 } from "../components/Test";
import { IProduct } from "../types";
import { Button } from "../components/ui/Button/Button";

type User = {
  name: string;
  age: number | string;
  address?: {
    street: string;
    city: string;
  };
};

const user: User = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    street: "123 Main St",
  },
};

user.age = "12";

console.log(user.address?.city);

user.name = "hello";

function sum(a: number, b: number): number {
  return a + b;
}

export const TestPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [input, setInput] = useState<string>("hello");

  let someVar: number | string = 1;
  let someArray: number[] = [1, 2, 3];

  someVar = "hello";

  console.log(someVar, products, setProducts, input, setInput, someArray, sum);

  return (
    <div className="home-page">
      <Test2 count={1}>
        <Test count={1} />
      </Test2>

      <Button variant="solid">test button</Button>

      <Button variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          className="ui-input-search-wrapper__controls icon-search"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.618 12.032a5.5 5.5 0 1 1 1.414-1.414l2.21 2.21a1 1 0 0 1-1.414 1.415zM11.5 7.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
            clipRule="evenodd"
          />
        </svg>
        test button
      </Button>
    </div>
  );
};
