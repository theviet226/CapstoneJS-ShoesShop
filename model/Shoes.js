function Products(tenSP, giaSP, alias,size, shortDes,quantity,desc,related,deleted,danhmuc,feature,img) {
    this.name = tenSP;
    this.alias = alias;
    this.price = giaSP;
    this.description = desc;
    this.size = size;
    this.shortDescription = shortDes;
    this.quantity = quantity;
    this.deleted = deleted;
    this.categories = danhmuc;
    this.relatedProducts =related;
    this.feature =feature;
    this.image =img;
    
}