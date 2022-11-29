import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, Component } from "react";
import { zodiacService } from "../../services/ZodiacService";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import Paragraph from "antd/lib/typography/Paragraph";
import { articleService } from "../../services/ArticleService";

export default function Article() {
  const router = useRouter();

  let { articleId, title, contentNews, urlBanner } = router.query;

  let props = {
    articleId,
    title,
    contentNews,
    urlBanner,
  };

  const [article, setArticle] = useState({});

  // useEffect(() => {
  //   if (articleId == saveArticle) {
  //     (async () => {
  //       const data = await articleService.detailArticle(saveArticle);
  //       if (data.statusCode == 200) {
  //         setArticle(data.data[0]);
  //         console.log("article2", data.data[0]);
  //       }
  //     })();
  //   } else {
  //     (async () => {
  //       const data = await articleService.detailArticle(articleId);
  //       if (data.statusCode == 200) {
  //         setArticle(data.data[0]);
  //         console.log("article1", data.data[0]);
  //       }
  //     })();
  //   }
  // }, []);

  return (
    <div className="row flex flex-row items-center justify-center w-3/5 mt-2 mx-auto">
      {articleId == articleId ? (
        <div className="card ">
          <div className="card-body flex flex-col">
            <h1
              className="card-title text-4xl font-bold text-center justify-center text-amber-500 mt-4
            "
            >
              {title}
            </h1>
            <div className="flex flex-row justify-center items-center">
              <Image
                loader={() => urlBanner}
                src={astroRoundedImg}
                alt=""
                width={300}
                height={300}
                class="rounded-md"
              />
            </div>
            <div className="max-w-[1000px]">
            <Paragraph>
              <div
                className="w-full leading-8"
                dangerouslySetInnerHTML={{
                  __html: contentNews,
                }}
                style={{
                  textAlign: "justify",
                }}
              ></div>
            </Paragraph>
            </div>
          </div>
        </div>
      ) : (
        <div>ko có j</div>
      )}
    </div>
  );
}
