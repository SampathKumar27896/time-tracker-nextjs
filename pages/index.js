import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  PageHeader,
  Col,
  Row,
  Card,
  List,
  Button,
  message,
  Select,
} from "antd";
const { Option } = Select;
import { GET_TASK } from "../helpers/constants";
import { useRouter } from "next/router";
import apiFetcher from "../helpers/utilityFunctions";
const Task = ({ taskList, callBackendAPI }) => {
  const [selectedItem, setSelectedItem] = useState({
    taskId: "",
    name: "",
    description: "",
  });
  // console.log(taskList.projects);
  const router = useRouter();
  const [listData, setListData] = useState({
    data: [],
    limit: 0,
    page: 0,
    projects: [],
    status: false,
    taskProgress: [],
    count: 0,
  });
  useEffect(() => {
    if (taskList.status === false) {
      message.warning("Session expired!. Please login again.");
      router.push("/login");
    } else {
      setListData(taskList);
    }
  }, [taskList]);
  const handlePageChange = async (page) => {
    page = page > 0 ? --page : page;
    const modifiedURL = `${GET_TASK.url}?page=${page}`;
    const result = await callBackendAPI({
      url: modifiedURL,
      method: GET_TASK.method,
    });
    setListData(result);
  };
  const handleSelectItem = (e, index) => {
    const list = listData.data.length > 0 ? listData : taskList;
    console.log(list.data[index]);
    setSelectedItem(list.data[index]);
  };
  return (
    <div className="split-view">
      <Row className="row">
        <Col className="internal-page-header" span={24}>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Tasks"
            subTitle="Find the tasks created by you."
            extra={[
              <Select
                dropdownMatchSelectWidth={false}
                placeholder="Select project"
              >
                {listData.projects.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>,
              <Button
                key="1"
                type="primary"
                onClick={() => {
                  router.push("/task/addTask");
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
                        pathname: `/task/${selectedItem._id}`,
                      });
                    }}
                  />,
                ]}
              >
                <p>{selectedItem.description}</p>
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
    url: `${process.env.API_DOMAIN_URL}/other/task/getTasks`,
    method: `GET`,
    headers: { Cookie: req.headers.cookie },
  });
  return { props: { taskList: result } };
}
export default Task;
