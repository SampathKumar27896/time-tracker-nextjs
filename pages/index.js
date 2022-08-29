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
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;
import { GET_TASK, UPSERT_TASK_PROGRESS } from "../helpers/constants";
import { useRouter } from "next/router";
import apiFetcher from "../helpers/utilityFunctions";
const Task = ({ taskList, callBackendAPI }) => {
  const [selectedItem, setSelectedItem] = useState({
    taskId: "",
    name: "",
    description: "",
  });
  let modifiedTime;
  let buttonText = {
    1: "Start Task",
    2: "End Task",
    3: "Save Progress",
  };
  const [taskProgressState, setTaskProgressState] = useState(1);
  const [form] = Form.useForm();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [currentProgressTask, setCurrentProgressTask] = useState({});
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
      console.log(taskList.taskProgress);
      if (taskList.taskProgress.length === 1) {
        let currentProgress = taskList.taskProgress[0];
        setCurrentProgressTask(currentProgress);
        form.setFieldsValue({
          timer: [moment(currentProgress.startTime), ""],
        });
        setTaskProgressState(currentProgress.taskProgressState);
      }
    }
  }, [taskList, form, setTaskProgressState]);
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
  const onFinish = async (values) => {
    if (taskProgressState === 1) {
      let startTime = moment();
      form.setFieldsValue({
        timer: [startTime, ""],
      });
      console.log(selectedItem);
      const startProgressRequestBody = {
        taskId: selectedItem._id,
        taskName: selectedItem.name,
        projectId: selectedItem.projectId,
        projectName: selectedItem.projectName,
        taskProgressState: 2,
        startTime: startTime,
      };
      console.log(
        `Request body for upsert Status 1 ${JSON.stringify(
          startProgressRequestBody
        )}`
      );
      const result = await callBackendAPI({
        ...UPSERT_TASK_PROGRESS,
        requestBody: { ...startProgressRequestBody },
      });
      if (result.status) {
        setTaskProgressState(2);
        router.reload();
      }
    } else if (taskProgressState === 2) {
      // form.setFieldsValue({
      //   timer: ['', moment()],
      // });
      let startTime = form.getFieldValue("timer")[0];
      let endTime = moment();
      form.setFieldsValue({
        timer: [startTime, moment()],
      });
      let duration = moment.duration(endTime.diff(startTime));
      let calculatedHours = Math.round(duration.asHours());
      let calculatedMinutes = Math.round(duration.asMinutes()) % 60;

      form.setFieldsValue({
        hours: calculatedHours,
      });
      form.setFieldsValue({
        minutes: calculatedMinutes,
      });

      setHours(calculatedHours);
      setMinutes(calculatedMinutes);
      setTaskProgressState(3);
    } else if (taskProgressState === 3) {
      let endTime = form.getFieldValue("timer")[1];
      const startProgressRequestBody = {
        taskProgressId: currentProgressTask._id,
        taskProgressState: 3,
        description: values.description,
        endTime: endTime,
        hours: values.hours,
        minutes: values.minutes,
      };
      const result = await callBackendAPI({
        ...UPSERT_TASK_PROGRESS,
        requestBody: { ...startProgressRequestBody },
      });
      if (result.status) {
        setTaskProgressState(1);
        router.reload();
      }
    }
  };
  const handleOnChangeTime = (time, value) => {
    console.log(hours, minutes);

    if (startAndEndTime && startAndEndTime[0]) {
      if (minutes > 0) {
        modifiedTime = moment(startAndEndTime[0]).add(minutes, "minutes");
      }
      console.log(modifiedTime);
      form.setFieldsValue({
        timer: [startAndEndTime[0], modifiedTime],
      });
    }
  };
  const handleHourChange = (value) => {
    let min = form.getFieldValue("minutes");
    let startAndEndTime = form.getFieldValue("timer");
    if (value > 0) {
      console.log("coming here");
      modifiedTime = moment(startAndEndTime[0]).add(value, "hours");
    }
    if (min > 0) {
      modifiedTime = moment(modifiedTime).add(min, "minutes");
    }
    form.setFieldsValue({
      timer: [startAndEndTime[0], modifiedTime],
    });
  };
  const handleMinuteChange = (value) => {
    let hou = form.getFieldValue("hours");
    let startAndEndTime = form.getFieldValue("timer");
    if (value > 0) {
      modifiedTime = moment(startAndEndTime[0]).add(value, "minutes");
    }
    if (hou > 0) {
      modifiedTime = moment(modifiedTime).add(hou, "hours");
    }
    form.setFieldsValue({
      timer: [startAndEndTime[0], modifiedTime],
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <Col className="split-view-left" span={8}>
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
        <Col className="split-view-right" span={16}>
          {selectedItem && selectedItem.name ? (
            <Row className="row" justify="center">
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
              <Card
                title="Daily Progress"
                bordered={true}
                className="selected-card"
              >
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  labelWrap
                  form={form}
                >
                  <Form.Item name="timer" label="Task start and end time">
                    <RangePicker
                      showTime
                      format="YYYY-MM-DD hh:mm:ss A"
                      disabled={true}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Total time"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <Form.Item
                      name="hours"
                      label="Hours"
                      style={{
                        display: "inline-block",
                        width: "calc(40%)",
                        margin: "0px 0px 30px 10px",
                      }}
                    >
                      <InputNumber
                        min={0}
                        max={59}
                        placeholder="Hours"
                        parser={(number) => Number(number)}
                        onChange={(value) => handleHourChange(value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="minutes"
                      label="Minutes"
                      style={{
                        display: "inline-block",
                        width: "calc(40%)",
                        margin: "0px 0px 30px 10px",
                      }}
                    >
                      <InputNumber
                        min={0}
                        max={59}
                        placeholder="Minutes"
                        parser={(number) => Number(number)}
                        onChange={(value) => handleMinuteChange(value)}
                      />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: false,
                        message: "Please input task progress",
                      },
                    ]}
                  >
                    <Input.TextArea showCount maxLength={100} />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "100%",
                      }}
                    >
                      {buttonText[taskProgressState]}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Row>
          ) : (
            <></>
          )}
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
