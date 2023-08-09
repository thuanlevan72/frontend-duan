import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import NewsApi from "../../api/news/NewsApi";
import LoadingSpin from "../../components/loading/LoadingSpin";
const BlogDetailsStandard = ({ location, match }) => {
  const { pathname } = location;
  const newsId = match.params.id;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await NewsApi.GetNewsDetail(newsId);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Blog Post</title>
        <meta name="description" content="Blog post page of FolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog Post
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="blog-details-wrapper ml-20">
                {/* blog post content */}
                <div className="container">
                  <div className="welcome-content text-center">
                    <h5>Tin tức</h5>
                    <h1>{data && data.title}</h1>
                    <h5 style={{ textAlign: "center" }}>
                      {data &&
                        (data.account.user.userName || data.account.email)}
                    </h5>
                    <div className="text-center" style={{ margin: "10px 0" }}>
                      <img src={data && data.image} alt="" height={500} />
                    </div>
                  </div>
                  {data && (
                    <div
                      className="text-center text-justify"
                      // style={{ tẽ: "left !impt" }}
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                  )}
                  {/* <div className="text-center">
                    <img
                      src={"/assets/img/blog/blog1.jpg"}
                      alt=""
                      height={500}
                    />
                  </div>
                  <div className="welcome-content text-justify">
                    <p>
                      Không thể phủ nhận lợi ích của việc ăn chay đối với sức
                      khỏe con người. Nếu như bạn ăn chay trường đúng cách thì
                      sẽ tăng sức khỏe cho bản thân. Tuy nhiên nếu không ăn uống
                      khoa học có thể bị thiếu hụt chất dinh dưỡng và ảnh hưởng
                      đến sức khỏe. Vậy làm thế nào để ăn chay trường đúng cách?
                      Dưới đây là một vài chế độ ăn chay trường phổ biến. Cách
                      lên thực đơn và những lưu ý khi ăn chay trường để tốt cho
                      sức khỏe. Hãy cùng theo dõi nhé.{" "}
                    </p>
                  </div>
                  <div className="text-center">
                    <img
                      src={"/assets/img/blog/blog2.jpg"}
                      alt=""
                      height={500}
                    />
                  </div>
                  <div className="welcome-content text-justify">
                    <p>
                      Hiện nay chế độ ăn chay lacto-ovo phổ biến và được nhiều
                      người lựa chọn. Chế độ ăn chay trường này cung cấp cho cơ
                      thể nhiều dưỡng chất nhất. Khi thực hiện chế độ ăn chay
                      này bạn hãy ăn các loại rau, trái cây, các loại hạt, đậu,
                      ngũ cốc, dầu thực vật. Và các loại trứng, sữa, các thực
                      phẩm chế biến từ sữa. Chế độ ăn chay lacto-ovo thường phổ
                      biến vì được nhiều người lựa chọn. Đây cũng là chế độ ăn
                      chay cung cấp cho cơ thể bạn nhiều chất dinh dưỡng nhất.
                      Khi thực hiện chế độ ăn này, bạn hãy tuân thủ ăn những
                      thực phẩm như các loại rau, trái cây, các loại hạt, các
                      loại đậu, các loại ngũ cốc, dầu thực vật, các loại trứng
                      và sữa.{" "}
                    </p>
                  </div>
                  <div className="text-center">
                    <img
                      src={"/assets/img/blog/blog6.jpg"}
                      alt=""
                      height={500}
                    />
                  </div>
                  <div className="welcome-content text-justify">
                    <p>
                      Nên tập thay đổi từ từ thói quen ăn chay bởi vì khi cắt bỏ
                      đột ngột cơ thể sẽ khó thích nghi được với thay đổi này.
                      Nếu như bạn mới bắt đầu hãy thử với chế độ ăn chay bán
                      phần. Vì cơ thể chưa quen nên bạn thi thoảng có thể ăn
                      thịt để bổ sung dưỡng chất cho cơ thể.{" "}
                    </p>
                  </div> */}
                </div>
                {/* blog post comment */}
                <BlogComment />
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object,
};

export default BlogDetailsStandard;
