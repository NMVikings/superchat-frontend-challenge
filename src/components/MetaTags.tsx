type MetaTagsProps = { title: string };

const MetaTags = ({ title }: MetaTagsProps) => {
  const description = "Best promo page for your repository";
  const imageUrl = "https://gcdnb.pbrd.co/images/0Yj0VsSgOBRS.jpg";

  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={process.env.BASE_URL} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:alt" content="A cool image of code" />
      <meta name="description" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default MetaTags;
