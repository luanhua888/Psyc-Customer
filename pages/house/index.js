import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, Component } from "react";
import { zodiacService } from "../../services/ZodiacService";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import Paragraph from "antd/lib/typography/Paragraph";
import { articleService } from "../../services/ArticleService";

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


export default function Houses() {
  const router = useRouter();

  let { houseId, name, description,imageUrl, maincontent } = router.query;

  let props = {
    houseId,
    name,
    imageUrl,
    description,
    maincontent,
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
    <div className="overflow-auto row flex flex-row items-center justify-center w-3/5 mt-2 mx-auto bg-white rounded-sm">
      {houseId == houseId ? (
        <div className="card ">
          <div className="card-body flex flex-col">
            <h1
              className="card-title text-4xl font-bold text-center justify-center text-amber-500 mt-4
            "
            >
              {name}
            </h1>
           
            <div className="flex flex-row justify-center items-center">
              <Image
                loader={() => imageUrl}
                src={astroRoundedImg}
                alt=""
                width={300}
                height={300}
                class="rounded-md"
              />
            </div>
            <h1
              className="card-title text-4xl font-bold text-center justify-center text-amber-500 mt-4
            "
            >
            <Paragraph>
              <div
                className="w-full leading-8 text-amber-500 "
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                style={{
                  textAlign: "justify",
                }}
              ></div>
            </Paragraph>
              
            </h1>
            <div className="max-w-[1000px]">
            <Paragraph>
              <div
                className="w-full leading-8 text-amber-500 "
                dangerouslySetInnerHTML={{
                  __html: maincontent,
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
