import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import NewsApi from "../../../api/news/NewsApi";
import { Breadcrumb, message } from "antd";
import LoadingSpin from "../../loading/LoadingSpin";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [ShortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };
  const handleShortDescription = (value) => {
    setShortDescription(value.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title == "" ||
      content == "" ||
      ShortDescription == "" ||
      imageFile == null
    ) {
      return;
    }
    try {
      // Tạo một FormData object để chứa các trường và hình ảnh
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("shortDescription", ShortDescription);
      formData.append("image", imageFile);
      formData.append(
        "accountId",
        JSON.parse(localStorage.getItem("user")).accountId
      );
      console.log(content);
      try {
        setLoading(true);
        const res = await NewsApi.Create(formData);
        messageApi.open({
          type: "success",
          content: "Thêm thành công bài viết",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Thêm bài viết thất bại",
        });
      }
      // // Gửi request API để thêm tin tức
      // const response = await axios.post("/api/news", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // console.log("Tin tức đã được thêm thành công:", response.data);
      // Xử lý sau khi thêm tin tức thành công (ví dụ: chuyển hướng về trang danh sách tin tức)
    } catch (error) {
      console.error("Lỗi khi thêm tin tức:", error);
    }
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Bài viết</Breadcrumb.Item>
        <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        {contextHolder}
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <div style={{ padding: "10px" }}>
          <button type="submit" sty>
            Thêm tin tức
          </button>
        </div>
        <div>
          <label>Tiêu đề:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Nội dung ngắn:</label>
          <input
            type="text"
            value={ShortDescription}
            onChange={handleShortDescription}
          />
        </div>
        <div>
          <label>Hình ảnh:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Nội dung:</label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            style={{ height: "30vh" }}
          />
        </div>
        {/* <button type="submit">Thêm tin tức</button> */}
      </form>
    </>
  );
};

export default CreateNews;
