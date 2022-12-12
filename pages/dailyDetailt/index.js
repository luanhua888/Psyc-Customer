import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import { articleService } from "../../services/ArticleService";
import DOMPurify from "dompurify";
import Paragraph from "antd/lib/typography/Paragraph";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { token } = req.cookies;
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}


export default function DailyDetailt() {
  const router = useRouter();

  let { articleId  } = router.query;

  let props = {
    articleId ,
  };

  console.log("articleId", articleId);
  const [article, setArticleId] = useState({});

  useEffect(() => {
    (async () => {
        const data = await articleService.detailArticle(props.articleId);
        if (data.statusCode == 200) {
          setArticleId(data.data[0]);
        }
    })();
  }, []);


  return (
    //bài viết cung hoàng đạo
    <div className="row flex flex-row items-center justify-center w-3/5  mx-auto">
      <div className="card ">
        <div className="card-body flex flex-col">
          <h1
            className="card-title
            text-4xl font-bold text-center text-gray-800 mt-4
            flex flex-row items-center justify-center
            text-[#ff7010]
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
                __html: article.contentNews,
              }}
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
