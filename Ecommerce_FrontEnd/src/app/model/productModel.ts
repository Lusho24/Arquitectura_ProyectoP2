export interface ProductModel {
  id: number;
  categoryId: number;
  storeId: number;  
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string; 
}