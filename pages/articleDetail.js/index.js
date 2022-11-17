import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, Component } from "react";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import { articleService } from "../../services/ArticleService";
import DOMPurify from "dompurify";
import Paragraph from "antd/lib/typography/Paragraph";
export default function ArticleDetail() {
  const router = useRouter();

  let { articleId } = router.query;

  let props = {
    articleId,
  };

  const [article, setArticleId] = useState({});

  useEffect(() => {
    (async () => {
      const data = await articleService.detailArticle(articleId);
      if (data.statusCode == 200) {
        setArticleId(data.data[0]);
      }
    })();
  }, []);

  var dirty =
    '<h2 style="text-align: center;"><img  src="https://i.pinimg.com/564x/b2/c0/22/b2c022a641c9038e990c09294dd32c8f.jpg"> </h2>';

  return (
    //bài viết cung hoàng đạo
    <div className="row flex flex-row items-center justify-center w-3/5  mx-auto">
      <div className="card ">
        <div className="card-body flex flex-col">
          <h1
            className="card-title
            text-4xl font-bold text-center text-gray-800 mt-4
            "
          >
            {article.title}
          </h1>
          <div className="flex flex-row justify-center items-center">
            <Image
              loader={() => article.urlBanner}
              src={astroRoundedImg}
              alt=""
              width={300}
              height={300}
              class="rounded-md"
            />
          </div>

          <Paragraph>
            <div
                className="w-full leading-8"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article.contentNews),
                    }}
                //căn đêu nội dung

                style={{
                    textAlign: "justify ",
                }}

                
            ></div>
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
