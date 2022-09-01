import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Col,
  Row,
  PageHeader,
  Select,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
import { useRouter } from "next/router";
import apiFetcher from "../../helpers/utilityFunctions";
import { UPDATE_TASK } from "../../helpers/constants";

const EditTask = ({ task, projects, callBackendAPI }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(task);
  const [selectedProject, setSelectedProject] = useState({
    projectId: task.projectId,
    projectName: task.projectName,
  });
  const handleProjectChange = (project, option) => {
    setSelectedProject({
      projectId: option.value,
      projectName: option.children,
    });
  };
  const onFinish = async (values) => {
    values.taskId = task._id;
    console.log(selectedProject);
    const taskUpdateParams = {
      projectId: selectedProject.projectId,
      projectName: selectedProject.projectName,
      taskId: task._id,
      taskName: values.taskName,
      isActive: values.isActive,
      description: values.description,
    };
    const updateResult = await callBackendAPI({
      ...UPDATE_TASK,
      requestBody: { ...taskUpdateParams },
    });
    if (updateResult.status) router.push("/");
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Update task"
            // subTitle="Add the project you want."
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ paddingTop: "5%" }}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            layout="horizontal"
            onFinish={onFinish}
            initialValues={{
              project: task.projectName,
            }}
          >
            <Form.Item label="Project Name" name="project">
              <Select
                dropdownMatchSelectWidth={false}
                onChange={handleProjectChange}
              >
                {projects.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Task Name"
              name="taskName"
              initialValue={formData.name}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Active" valuePropName={true} name="isActive">
              <Switch defaultChecked={formData.isActive.toString()} />
            </Form.Item>
            <Form.Item
              label="Project Description"
              name="description"
              initialValue={formData.description}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
            >
              <Button type="primary" htmlType="submit" block={true}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export async function getServerSideProps({ params, req }) {
  try {
    const res = await apiFetcher({
      url: `${process.env.API_DOMAIN_URL}/other/task/getTasks?taskId=${params.taskId}`,
      method: `GET`,
      headers: { Cookie: req.headers.cookie },
    });
    return { props: { task: res.data[0], projects: res.projects } };
  } catch (error) {
    console.log(error);
  }
}
export default EditTask;
