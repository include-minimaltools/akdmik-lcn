import { Spin, Tabs } from "antd";
import { useService } from "hooks";
import { getGrades } from "modules/pensum/services";
import { StudentTabs } from "../components";

const RegistryScore = () => {
  const [grades, loading] = useService(getGrades);

  return (
    <Spin spinning={loading}>
      <Tabs
        style={{ marginTop: "1rem", height: "100%", margin: "1rem" }}
        tabPosition="left"
        items={grades?.map(({ idGrade, active, description }) => ({
          label: description,
          key: `tab-${idGrade}`,
          children: <StudentTabs idGrade={idGrade} key={`pane-${idGrade}`}/>,
          disabled: !active,
          forceRender: false,
        }))}
        destroyInactiveTabPane
      />
    </Spin>
  );
};
export default RegistryScore;
