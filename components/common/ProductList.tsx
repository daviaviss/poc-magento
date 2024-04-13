'use client'

import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { CH2, CH3 } from '../ui/typography';

interface Price {
	value: number;
	currency: string;
}

interface PriceRange {
	minimum_price: {
		regular_price: Price;
	}
}

interface ProductImage {
	url: string;
	label?: string;
}

interface Product {
	id: string;
	name: string;
	price_range: PriceRange;
	image: ProductImage;
}

interface ProductResponse {
	data: {
		products: {
			items: Product[];
		}
	}
}

async function getProducts(): Promise<Product[]> {
	const query = `{
        products(search: "", pageSize: 20) {
            items {
                id
                name
                price_range {
                    minimum_price {
                        regular_price {
                            value
                            currency
                        }
                    }
                }
                image {
                    url
                    label
                }
            }
        }
    }`;

	const req = await fetch('https://infityworks.shop/graphql', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query })
	});

	const response = await req.json() as ProductResponse;
	return response.data.products.items;
}

export default function ProductList() {
	const [products, setProducts] = React.useState<Product[]>([]);

	useEffect(() => {
		getProducts().then(setProducts);
	}, []);

	return (
		<div>
			<div className="container py-16 px-4 sm:py-24 sm:px-6">
				<CH2 className="text-3xl mb-6 text-white" text='Produtos em destaque' />
				<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<a key={product.id} href="#" className="group">
							<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
								<Image
									width={500}
									height={500}
									src={product.image.url}
									alt={product.image.label || 'Product Image'}
									className="h-full w-full object-cover object-center group-hover:opacity-90"
								/>
							</div>
							<CH3 text={product.name} className="mt-4 text-sm text-white" />
							<p className="mt-1 text-lg font-medium text-white">
								{product.price_range.minimum_price.regular_price.currency} {product.price_range.minimum_price.regular_price.value}
							</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}


