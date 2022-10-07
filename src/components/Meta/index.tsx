import Head from 'next/head';

type MetaProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

const defaultMetaText = 'App Name';

const defaultProps = {
  title: defaultMetaText,
  keywords: defaultMetaText,
  description: defaultMetaText,
};

const Meta: React.FC<MetaProps> = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

Meta.defaultProps = defaultProps;

export default Meta;
