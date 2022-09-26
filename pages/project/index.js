import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { PageHeader, Col, Row, Card, List, Button, message } from "antd";
import { GET_PROJECT } from "../../helpers/constants";
import { useRouter } from "next/router";
import apiFetcher from "../../helpers/utilityFunctions";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
const Project = ({ projectList, callBackendAPI }) => {
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();
  const [listData, setListData] = useState({
    data: [],
    limit: 0,
    page: 0,
    count: 0,
  });
  useEffect(() => {
    if (projectList.status === false) {
      message.warning("Session expired!. Please login again.");
      router.push("/login");
    } else {
      console.log(projectList);
      setListData(projectList);
    }
  }, [projectList]);
  const handlePageChange = async (page) => {
    page = page > 0 ? --page : page;
    const modifiedURL = `${GET_PROJECT.url}?page=${page}`;
    const result = await callBackendAPI({
      url: modifiedURL,
      method: GET_PROJECT.method,
    });
    setListData(result);
  };
  const handleSelectItem = (e, index) => {
    const list = listData.data.length > 0 ? listData : projectList;
    setSelectedItem(list.data[index]);
  };
  return (
    <div className="split-view">
      <Row className="row">
        <Col className="internal-page-header" span={24}>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Projects"
            subTitle="Find the projects created by you."
            extra={[
              <Button
                key="1"
                type="primary"
                onClick={() => {
                  router.push("/project/addProject");
                }}
              >
                Add
              </Button>,
            ]}
          />
        </Col>
      </Row>
      <Row className="row">
        <Col className="split-view-left" span={12}>
          <List
            itemLayout="horizontal"
            dataSource={listData.data}
            rowKey="_id"
            pagination={{
              simple: false,
              onChange: handlePageChange,
              total: listData.count,
              pageSize: listData.limit,
              position: "bottom",
            }}
            renderItem={(item, index) => (
              <List.Item onClick={(e) => handleSelectItem(e, index)}>
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="split-view-right" span={12}>
          <Row className="row" justify="center">
            {selectedItem && selectedItem.name ? (
              <Card
                title={selectedItem.name}
                bordered={true}
                className="selected-card"
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      router.push({
                        pathname: `/project/${selectedItem._id}`,
                      });
                    }}
                  />,
                ]}
              >
                <p className="selected-card-description">
                  {selectedItem.description}
                </p>
              </Card>
            ) : (
              <></>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const result = await apiFetcher({
    url: `${process.env.API_DOMAIN_URL}/other/project/getProjects`,
    method: `GET`,
    headers: { Cookie: req.headers.cookie },
  });
  return { props: { projectList: result } };
}
export default Project;
