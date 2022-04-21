import React, { useState, useTransition, Suspense } from "react";
import { fetchMockData } from "./mock";
import "./styles.css";

// 默认加载第一页 mock 数据
const mockResource = fetchMockData(1);

function UserList({ resource }) {
  const mockList = resource.read();
  return (
    <div className="list">
      {mockList.map((item) => (
        <div key={item.id} className="row">
          <div className="col">{item.id}</div>
          <div className="col">{item.name}</div>
          <div className="col">{item.age} 岁</div>
        </div>
      ))}
    </div>
  );
}

export default function DemoList() {
  const [resource, setResource] = useState(mockResource);
  const [isPending, startTransition] = useTransition();

  return (
    <Suspense fallback="加载中">
      <UserList resource={resource} />
      <button
        className="button"
        type="button"
        onClick={() => {
          startTransition(() => {
            setResource(fetchMockData(2));
          });
        }}
      >
        下一页
      </button>
      {isPending && <div className="loading">加载中</div>}
    </Suspense>
  );
}
