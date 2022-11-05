import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import { renderSearchItem, renderSearchLabel } from "helpers";
import { useAppDispatch, useAppSelector } from "redux-store";
import { setValue } from "redux-store/header";

const AdminSearch = () => {
  const dispatch = useAppDispatch();
  const { options, visible, searchValue } = useAppSelector(
    (state) => state.header.search
  );

  if (!visible) return null;

  return (
    <AutoComplete
      style={{ width: "100%", maxWidth: "50%", minWidth: "150px" }}
      options={options.map(({ options, label }) => {
        const items = options
          .filter((item) => item.includes(searchValue))
          .map((item) => renderSearchItem(item));

        const results = items.length;

        return {
          label: renderSearchLabel(label, results),
          options: items,
        };
      })}
      value={searchValue}
      onChange={(text) => dispatch(setValue(text))}
    />
  );
};

export default AdminSearch;
