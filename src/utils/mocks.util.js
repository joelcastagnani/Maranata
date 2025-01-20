import { faker } from "@faker-js/faker";

function createMockProduct() {
  const name = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const stock = faker.number.int({ min: 100, max: 2000, multipleOf: 50 });
  const price = faker.commerce.price({
    min: 100,
    max: 2000,
    dec: 2,
  });
  const image = faker.image.urlLoremFlickr({ width: 500, height: 500 });
  const category = "";
  return { name, description, stock, price, image, category };
}
function createMockOrder() {
  const name = faker.person.fullName();
  const address = faker.location.streetAddress();
  const order = faker.food.dish();
  const phone = faker.phone.number();
  return { name, address, order, phone };
}

export { createMockProduct, createMockOrder };
