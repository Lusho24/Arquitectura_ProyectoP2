using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Web.Services;

namespace SOAP_ECOMMERCE_ECOVIDA
{
    /// <summary>
    /// Descripción breve de ProductService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    public class ProductService : WebService
    {
        private string connString = System.Configuration.ConfigurationManager.ConnectionStrings["MySqlConnection"].ConnectionString;

        [WebMethod]
        public string AddProduct(int categoryId, int storeId, string name, string description, string imageUrl, decimal price, int stock)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "INSERT INTO producto (IDCATEGORIA, IDTIENDA, NOMBREPRODUCTO, DESCRIPCIONPRODUCTO, IMAGENPRODUCTO, PRECIOPRODUCTO, STOCKPRODUCTO) VALUES (@categoryId, @storeId, @name, @description, @imageUrl, @price, @stock)";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@categoryId", categoryId);
                cmd.Parameters.AddWithValue("@storeId", storeId);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@description", description);
                cmd.Parameters.AddWithValue("@imageUrl", imageUrl);
                cmd.Parameters.AddWithValue("@price", price);
                cmd.Parameters.AddWithValue("@stock", stock);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Product added successfully" : "Error adding product";
            }
        }

        [WebMethod]
        public string UpdateProduct(int id, int categoryId, string name, string description, string imageUrl, decimal price, int stock)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "UPDATE producto SET IDCATEGORIA = @categoryId, NOMBREPRODUCTO = @name, DESCRIPCIONPRODUCTO = @description, IMAGENPRODUCTO = @imageUrl, PRECIOPRODUCTO = @price, STOCKPRODUCTO = @stock WHERE IDPRODUCTO = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@categoryId", categoryId);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@description", description);
                cmd.Parameters.AddWithValue("@imageUrl", imageUrl);
                cmd.Parameters.AddWithValue("@price", price);
                cmd.Parameters.AddWithValue("@stock", stock);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Product updated successfully" : "Error updating product";
            }
        }

        [WebMethod]
        public string GetProduct(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "SELECT * FROM producto WHERE IDPRODUCTO = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                MySqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    string imageUrl = reader["IMAGENPRODUCTO"].ToString();
                    return $"ID: {reader["IDPRODUCTO"]}, Name: {reader["NOMBREPRODUCTO"]}, Description: {reader["DESCRIPCIONPRODUCTO"]}, Image URL: {imageUrl}, Price: {reader["PRECIOPRODUCTO"]}, Stock: {reader["STOCKPRODUCTO"]}, CategoriaId: {reader["IDCATEGORIA"]}, StoreId: {reader["IDTIENDA"]}";
                }
                else
                {
                    return "Product not found";
                }
            }
        }

        [WebMethod]
        public string DeleteProduct(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "DELETE FROM producto WHERE IDPRODUCTO = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Product deleted successfully" : "Error deleting product";
            }
        }

        [WebMethod]
        public string GetAllProducts()
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "SELECT * FROM producto";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                MySqlDataReader reader = cmd.ExecuteReader();
                string result = "";
                while (reader.Read())
                {
                    string imageUrl = reader["IMAGENPRODUCTO"].ToString();
                    result += $"ID: {reader["IDPRODUCTO"]}, Name: {reader["NOMBREPRODUCTO"]}, Description: {reader["DESCRIPCIONPRODUCTO"]}, Image URL: {imageUrl}, Price: {reader["PRECIOPRODUCTO"]}, Stock: {reader["STOCKPRODUCTO"]}, CategoriaId: {reader["IDCATEGORIA"]}, StoreId: {reader["IDTIENDA"]}\n";
                }
                return result;
            }
        }

        [WebMethod]
        public string UpdateProductStock(int productId, int newStock)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "UPDATE producto SET STOCKPRODUCTO = @newStock WHERE IDPRODUCTO = @productId";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@productId", productId);
                cmd.Parameters.AddWithValue("@newStock", newStock);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Stock updated successfully" : "Error updating stock";
            }
        }
        [WebMethod]
public string FindProductbyIdStore(int storeId)
{
    using (MySqlConnection conn = new MySqlConnection(connString))
    {
        conn.Open();
        string query = "SELECT * FROM producto WHERE IDTIENDA = @storeId";
        MySqlCommand cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@storeId", storeId);
        MySqlDataReader reader = cmd.ExecuteReader();

        string result = "";
        while (reader.Read())
        {
            string imageUrl = reader["IMAGENPRODUCTO"].ToString();
            result += $"ID: {reader["IDPRODUCTO"]}, Name: {reader["NOMBREPRODUCTO"]}, Description: {reader["DESCRIPCIONPRODUCTO"]}, Image URL: {imageUrl}, Price: {reader["PRECIOPRODUCTO"]}, Stock: {reader["STOCKPRODUCTO"]}, CategoriaId: {reader["IDCATEGORIA"]}, StoreId: {reader["IDTIENDA"]}\n";
        }
        return string.IsNullOrEmpty(result) ? "No products found for this store" : result;
    }
}
    }
}

