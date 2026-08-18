import React, { useState } from "react";
import Test from "../components/Test";
import { IProduct } from "../types";

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

  let someVar: number = 1;
  let someArray: number[] = [1, 2, 3];

  someVar = "hello";

  console.log(someVar);

  return (
    <div className="home-page">
      <Test count={1} />
    </div>
  );
};
