/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, ConfigProvider, Input, Row, Select } from "antd";

import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import style from "../Classes.module.css";

import { selectedFiledTheme } from "../../../../themes/Index";
import { MdDelete } from "react-icons/md";
import { useGetallCourseQuery } from "../../../../redux/api/courseApi";
import { useAddClassesMutation } from "../../../../redux/api/classApi";

const AddClass = () => {
  const { data: courseData, isLoading }: any = useGetallCourseQuery(undefined);
  const [addClass, { isLoading: addClassLoading }] = useAddClassesMutation();
  const [form] = useForm();
  const onFinish = async (data: any) => {
    try {
      const res: any = await addClass(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onReset = () => {
    console.log(form);
    form.resetFields();
  };
  const courseFields = courseData?.data?.data.map((data: any) => {
    return {
      label: data?.courseName,
      value: data?.id,
    };
  });
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-bold mb-4 text-customHeader ">
        ADD CLASSES
      </h1>
      <div className={`${style.AddClassContainer} px-[30px] pt-[30px] mb-6`}>
        <ConfigProvider theme={selectedFiledTheme}>
          <Form
            layout="vertical"
            form={form}
            name="add-course"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col lg={12}>
                <Form.Item
                  label="Select Course "
                  name="course_id"
                  rules={[{ required: true, message: "Please select course " }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    options={courseFields}
                    placeholder="please select a course"
                  />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Enter Module Title"
                  key="module_title"
                  name="module_title"
                  rules={[
                    { required: true, message: "Please input course name" },
                  ]}
                >
                  <Input placeholder="Enter course name" className="py-2" />
                </Form.Item>
              </Col>

              <Col lg={24}>
                <Form.List
                  name="module_class"
                  key="module_class"
                  initialValue={[{ name: "", video: "" }]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <Row key={field.key} gutter={16}>
                          <Col lg={12}>
                            <Form.Item
                              {...field}
                              name={[field.name, "name"]}
                              label="Enter video name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a video name.",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Enter video name"
                                className="py-2"
                              />
                            </Form.Item>
                          </Col>
                          <Col lg={12}>
                            <Form.Item
                              {...field}
                              name={[field.name, "video"]}
                              label="Enter video link"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a video link.",
                                },
                              ]}
                            >
                              <div className="flex items-center gap-x-2">
                                <Input
                                  placeholder="Enter video link"
                                  className="py-2"
                                />
                                <span
                                  onClick={() => remove(field.name)}
                                  className="cursor-pointer rounded border border-[red] px-4 py-2 border-red-500"
                                >
                                  <MdDelete
                                    style={{ color: "red", fontSize: "18px" }}
                                  />
                                </span>
                              </div>
                            </Form.Item>
                          </Col>
                          {/* ... remove button here ... */}
                        </Row>
                      ))}
                      <span
                        className="bg-customPrimary cursor-pointer text-[#fff] py-2 flex text-center  justify-center rounded text-lg font-bold mb-4"
                        onClick={() => add()}
                      >
                        Add Another Field
                      </span>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <div className="flex justify-between">
              <div>
                <Form.Item>
                  <Button
                    size="large"
                    style={{
                      color: "white",
                      borderRadius: "4px",
                    }}
                    htmlType="submit"
                    className="bg-customPrimary"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Button
                    size="large"
                    htmlType="button"
                    onClick={onReset}
                    style={{
                      color: "white",
                      backgroundColor: "#D7263D",
                      borderRadius: "4px",
                    }}
                  >
                    cancel
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddClass;
