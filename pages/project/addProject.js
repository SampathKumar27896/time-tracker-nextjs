import { Form, Input, Button, Switch, Col, Row, PageHeader } from "antd";
const { TextArea } = Input;
import { ADD_PROJECT } from "../../helpers/constants";
import { useRouter } from "next/router";

const AddProject = ({ callBackendAPI }) => {
  const router = useRouter();
  const onFinish = async (values) => {
    const result = await callBackendAPI({
      ...ADD_PROJECT,
      requestBody: { ...values },
    });
    if (result.status) router.push("/project");
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Add project"
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
          >
            <Form.Item label="Project Name" name="projectName">
              <Input />
            </Form.Item>
            <Form.Item label="Active" valuePropName={true} name="isActive">
              <Switch />
            </Form.Item>
            <Form.Item label="Project Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
            >
              <Button type="primary" htmlType="submit" block={true}>
                Add
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddProject;
