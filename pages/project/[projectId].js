import { useState } from "react";
import { Form, Input, Button, Switch, Col, Row, PageHeader } from "antd";
const { TextArea } = Input;
import { UPDATE_PROJECT } from "../../helpers/constants";
import { useRouter } from "next/router";
import apiFetcher from "../../helpers/utilityFunctions";

const EditProject = ({ project, callBackendAPI }) => {
  const router = useRouter();

  const [formData, setFormData] = useState(project);

  const onFinish = async (values) => {
    values.projectId = project._id;

    const updateResult = await callBackendAPI({
      ...UPDATE_PROJECT,
      requestBody: { ...values },
    });
    if (updateResult.status) router.push("/project");
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Update project"
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
            <Form.Item
              label="Project Name"
              name="projectName"
              initialValue={formData.name}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Active" valuePropName={true} name="isActive">
              <Switch defaultChecked={formData.isActive} />
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
  const res = await apiFetcher({
    url: `${process.env.API_DOMAIN_URL}/other/project/getProjects?projectId=${params.projectId}`,
    method: `GET`,
    headers: { Cookie: req.headers.cookie },
  });

  return { props: { project: res.data[0] } };
}
export default EditProject;
