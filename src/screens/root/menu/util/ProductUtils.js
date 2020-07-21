export default {
  mapProductToListViewData: ({ category, products, pathPhoto }) =>
    category.map(cate => ({
      items: [
        {
          header: cate.ten || '',
          items: products
            .filter(product => product.idList === cate.id)
            .map(product => ({
              id: product.id,
              name: product.tenSp,
              price: {
                displayPrice: product.giaban || 0,
                basePrice: product.giaban || 0,
              },
              image: {
                url: `${pathPhoto}/${product.thumb}`,
                headers: {},
              },
            })),
        },
      ],
    })),
};
