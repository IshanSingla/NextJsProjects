async function fetchAPI(query, { variables } = {},read ) {
  const url = read ? process.env.NEXT_PUBLIC_WEBINY_API_READ_URL : process.env.NEXT_PUBLIC_WEBINY_API_MANAGE_URL;
  const res = await fetch(url, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.WEBINY_API_SECRET}`
   },
   body: JSON.stringify({
    query,
    variables,
   }),
  });  
  const json = await res.json()
  if (json.errors) {
   throw new Error('Failed to fetch API')
  }  
  return json.data
}

export async function getProducts() {
  const products = await fetchAPI(
    ` query GetProducts {
          listProducts(limit: 10) {
          data {
              name,
              slug,
              description,
              image,
              category,
              size,
              color,
              price,
              currency,
              availableQty
          }
        }
      }
    `,
   {},
   true
  );
  return products.listProducts.data
}
export async function getProduct(slug) {
  let product = await fetchAPI(
    ` query GetProduct {
        getProduct(where: {slug: "${slug}"}) {
            data {
              name,
              slug,
              description,
              image,
              category,
              size,
              color,
              price,
              currency,
              availableQty
            }
        }
      }
    `,
   {},
   true
  );
  return product.getProduct.data
}
export async function createOrder(data){
  const response = await fetchAPI(`
    mutation CreateOrder($orderId:String!, $status: String, $currency: String, $amount: Number, $products: String){
      createOrder(data: { orderId: $orderId, status: $status, currency: $currency, amount: $amount, products: $products}){
        data {
          orderId,
          id
        },
        error {
          data
        }
      }
    }
  `,{
   variables:{
    'orderId': data.orderId,
    'status': data.status,
    'currency': data.currency,
    'amount': data.amount,
    'products': data.products
   }
  }, false);
  return response.createOrder.data;
}
export async function updateOrder(data){
  const response = await fetchAPI(`
    mutation UpdateOrder($revision: ID!, $orderId:String!, $status: String, $currency: String, $amount: Number, $products: String){
      updateOrder(revision: $revision, data: {orderId: $orderId, status: $status, currency: $currency, amount: $amount, products: $products}){
        data {
          orderId,
          id
        },
        error {
          data
        }
      }
    }
  `,{
   variables: {
    'revision': data.revision,
    'orderId': data.orderId,
    'status': data.status,
    'currency': data.currency,
    'amount': data.amount,
    'products': data.products
   }
  }, false);
  return response.updateOrder.data;
}