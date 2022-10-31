import { FC } from "react";
import { Relationship } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type relationshipTableProps = {
  onPressEdit: (relationship: Relationship) => any;
  onPressDelete: (idRelationship: number) => any;
  relationships?: Relationship[];
  loading: boolean;
};

const RelationshipTable: FC<relationshipTableProps> = ({
  relationships,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Relationships",
        options: relationships?.map((relationship) => relationship.description) || [],
      },
    ],
    [relationships]
  );

  const columns: ColumnsType<Relationship> = [
    {
      title: "Id",
      dataIndex: "idRelationship",
    },
    {
      title: "Área",
      dataIndex: "description",
    },
    {
      title: "Estado",
      width: 100,
      dataIndex: "active",
      render: (_, { active }) => {
        return (
          <Badge
            status={active ? "success" : "default"}
            text={active ? "Activo" : "Inactivo"}
          />
        );
      },
    },
    {
      dataIndex: "idRelationship",
      width: 100,
      render: (idRelationship, relationship) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(relationship)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idRelationship)}
            danger
            disabled={!relationship.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Relationship> = {
    columns,
    dataSource: searchValue
      ? relationships?.filter((x) => x.description.includes(searchValue))
      : relationships,
    loading,
    rowKey: ({ idRelationship }) => `row-${idRelationship}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default RelationshipTable;
