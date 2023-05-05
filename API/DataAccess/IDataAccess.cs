using Library_API.Model;
using System.Data.SqlClient;

namespace Library_API.DataAccess
{
    public interface IDataAccess
    {
        int CreateUser(User user);

        bool isEmailAvailable(string email);
        bool AuthenticateUser(string email,string password,out User? user);

        IList<Book> GetAllBooks();
        bool OrderBook(int BooId, int UserId);

        IList<Order> GetOrderOfUser(int UserId);
        IList<Order> GetAllOrders();
        bool ReturnBook(int userId, int bookId);
        IList<User> GetAllUsers();
        void BlockUser(int userId);
        void UnblockUser(int userId);
        void EnableUser(int userId);
        void DisableUser(int userId);
        IList<BookCategory> GetAllCategories();
        void InsertNewBook(Book book);
        bool DeleteBook(int bookId);
        void CreateCategory(BookCategory bookCategory);
    }
}
