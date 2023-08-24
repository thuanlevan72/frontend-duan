import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const BlogPosts = ({ data }) => {
  return (
    <Fragment>
      {data &&
        data.map((item, index) => {
          return (
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="blog-wrap-2 mb-30">
                <div className="blog-img-2">
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/blog-details-standard/" +
                      item.newsId
                    }>
                    <img
                      src={item.image}
                      alt="polyfood"
                      width={"auto"}
                      height={440}
                    />
                  </Link>
                </div>
                <div className="blog-content-2">
                  <div className="blog-meta-2">
                    <ul>
                      <li>
                        {format(
                          new Date(item.createdAt),
                          "HH:mm:ss dd/MM/yyyy"
                        )}
                      </li>
                      <li>
                        {item.account.user.userName || item.account.email}
                      </li>
                      <li>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/blog-details-standard" +
                            item.newsId
                          }>
                          4 <i className="fa fa-comments-o" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h4>
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/blog-details-standard/" +
                        item.newsId
                      }>
                      {item.title}
                    </Link>
                  </h4>
                  <div className="blog-share-comment">
                    <div className="blog-btn-2">
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          "/blog-details-standard/" +
                          item.newsId
                        }>
                        Đọc ngay
                      </Link>
                    </div>
                    <div className="blog-share">
                      <span>Chia sẻ :</span>
                      <div className="share-social">
                        <ul>
                          <li>
                            <a className="facebook" href="//facebook.com">
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a className="twitter" href="//twitter.com">
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a className="instagram" href="//instagram.com">
                              <i className="fa fa-instagram" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default BlogPosts;
