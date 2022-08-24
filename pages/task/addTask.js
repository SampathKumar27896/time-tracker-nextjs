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
import { ADD_TASK } from "../../helpers/constants";
import { useRouter } from "next/router";
import apiFetcher from "../../helpers/utilityFunctions";

const AddTask = ({ listData, callBackendAPI }) => {
  const router = useRouter();
  const onFinish = async (values) => {
    let addTaskPayload = {
      taskName: values.taskName,
      projectName: values.project.label,
      projectId: values.project.value,
      isActive: values.isActive,
      description: values.description,
    };
    const result = await callBackendAPI({
      ...ADD_TASK,
      requestBody: { ...addTaskPayload },
    });
    if (result.status) router.push("/");
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Add Task"
            subTitle="Add the task you want."
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
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
          >
            <Form.Item label="Project Name" name="project">
              <Select dropdownMatchSelectWidth={false} labelInValue={true}>
                {listData.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Task Name" name="taskName">
              <Input />
            </Form.Item>
            <Form.Item label="Active" valuePropName={true} name="isActive">
              <Switch />
            </Form.Item>
            <Form.Item label="Task Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
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
  return { props: { listData: result.data } };
}
export default AddTask;
