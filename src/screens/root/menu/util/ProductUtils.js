import { dynamicSort } from '../../../../utils/AppUtils';

export default {
  mapProductToListViewData: ({ category, products, pathPhoto }) => {
    return (
      category
        .map(cate => ({
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
            }))
            .sort(dynamicSort('name', 'asc')),
        }))
        .filter(data => data.items.length > 0)
        .map(data => ({
          items: [data],
        })) || []
    );
  },
};
