import { UserOutlined } from "@ant-design/icons";

const renderSearchItem = (title: string, count?: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}

      {count && (
        <span>
          <UserOutlined /> {count}
        </span>
      )}
    </div>
  ),
});

export { renderSearchItem };
