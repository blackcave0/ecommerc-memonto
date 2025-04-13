import { Metadata } from "next";
import { getProductBySlug } from "@/data/products";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | Momento",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Momento`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Momento`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Momento`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
