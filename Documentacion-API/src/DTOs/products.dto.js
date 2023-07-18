class ProductDTO {
  constructor(info, user) {
    this.title = info.title;
    this.description = info.description;
    this.category = info.category;
    this.price = info.price;
    this.code = info.code;
    this.stock = info.stock;
    this.thumbnail = info.thumbnail;
    this.owner = user.email;
  }
}

module.exports = ProductDTO;
