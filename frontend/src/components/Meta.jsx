import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Rocken My Vibe',
  description: 'High Quality appreal for e-commerce website',
  keywords: 'Hoodies, T-shirts, Coffee Mugs, Hats, Pillows, Water Bottles, Tumblers, sweatshirts',
};

export default Meta;
