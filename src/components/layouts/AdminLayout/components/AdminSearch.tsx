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
      options={options
        .filter((x) => x.options.find((x) => x.includes(searchValue)))
        .map((option) => ({
          label: renderSearchLabel(option.label),
          options: option.options.map((item) => renderSearchItem(item)),
        }))}
      value={searchValue}
      onChange={(text) => dispatch(setValue(text))}
    >
      {/* <Input
        placeholder="Buscador"
        prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      /> */}
    </AutoComplete>
  );
};

export default AdminSearch;
