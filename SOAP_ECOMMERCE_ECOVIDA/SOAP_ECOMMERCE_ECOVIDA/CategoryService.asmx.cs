using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace SOAP_ECOMMERCE_ECOVIDA
{
    /// <summary>
    /// Descripción breve de CategoryService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    // [System.Web.Script.Services.ScriptService]
    public class CategoryService : WebService
    {
        private string connString = System.Configuration.ConfigurationManager.ConnectionStrings["MySqlConnection"].ConnectionString;

        [WebMethod]
        public string AddCategory(string name)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "INSERT INTO categoria_producto (NOMBRECATEGORIA) VALUES (@name)";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@name", name);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Category added successfully" : "Error adding category";
            }
        }

        [WebMethod]
        public string GetCategory(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "SELECT * FROM categoria_producto WHERE IDCATEGORIA = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                MySqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    return $"ID: {reader["IDCATEGORIA"]}, Name: {reader["NOMBRECATEGORIA"]}";
                }
                else
                {
                    return "Category not found";
                }
            }
        }

        [WebMethod]
        public string UpdateCategory(int id, string name)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "UPDATE categoria_producto SET NOMBRECATEGORIA = @name WHERE IDCATEGORIA = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@name", name);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Category updated successfully" : "Error updating category";
            }
        }

        [WebMethod]
        public string DeleteCategory(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "DELETE FROM categoria_producto WHERE IDCATEGORIA = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                int result = cmd.ExecuteNonQuery();
                return result > 0 ? "Category deleted successfully" : "Error deleting category";
            }
        }

        [WebMethod]
        public string GetAllCategories()
        {
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                conn.Open();
                string query = "SELECT * FROM categoria_producto";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                MySqlDataReader reader = cmd.ExecuteReader();
                string result = "";
                while (reader.Read())
                {
                    result += $"ID: {reader["IDCATEGORIA"]}, Name: {reader["NOMBRECATEGORIA"]}\n";
                }
                return result;
            }
        }
    }
}