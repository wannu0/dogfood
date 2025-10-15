// types/Brand.ts
export type FeaturedProduct = {
  id: string;
  name_sub: string;
  imgsrc: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  concept: string;
  description: string;
  originCountry: string;
  manufacturer: string;
  distributor: string;
  productLineups: string[];
  featuredProducts: FeaturedProduct[];
  websiteUrl: string;
  notes: string;
  isDomestic: boolean;
};