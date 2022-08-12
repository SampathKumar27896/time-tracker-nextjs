import React, { useState } from 'react';
import { PageHeader, Col, Row, Card, List, Pagination } from 'antd';
const Project = () => {
  const [selectedItem, setSelectedItem] = useState({
    name: '',
    description: '',
  });
  const data = [
    {
      name: 'Project 1',
      description: 'Project one description',
      _id: 'asdfaje',
    },
    {
      name: 'Project 2',
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  Lorem Ipsum has been the industry's standard dummy text tandard dummy text ever since the 1500s, when an unknown printer took a galley of  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce",
      _id: 'asddafaje',
    },
    {
      name: 'Project 3',
      description:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      _id: 'asdadsfafaje',
    },
    {
      name: 'Project 3',
      description:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      _id: 'asdadsfafaje',
    },
    {
      name: 'Project 3',
      description:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      _id: 'asdadsfafaje',
    },
  ];
  const handlePageChange = (page, pageSize) => {
    console.log(page, pageSize);
  };
  const handleSelectItem = (e, index) => {
    setSelectedItem(data[index]);
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
                                />
                        </Col>
                </Row>
                <Row className="row">
                        <Col className="split-view-left" span={12}>
                                <List
                                  itemLayout="horizontal"
                                  dataSource={data}
                                  rowKey="_id"
                                  pagination={true}
                                  renderItem={(item, index) => (
                                    <List.Item
                                      actions={[<a key="list-loadmore-edit">edit</a>]}
                                      onClick={(e) => handleSelectItem(e, index)}
                                    >
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
                                        <Card
                                          title={selectedItem.name}
                                          bordered={true}
                                          className="selected-card"
                                        >
                                          <p>{selectedItem.description}</p>
                                        </Card>
                                </Row>
                        </Col>
                </Row>
        </div>
  );
};

export default Project;
