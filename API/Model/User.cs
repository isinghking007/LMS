namespace Library_API.Model
{
    public class User :ModelBase
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; }= String.Empty;
        public string Mobile { get; set; } = String.Empty;
        public bool Blocked { get; set;} = false;
        public bool Active { get; set; }    = false;
        public float Fine { get; set; } = 0;
        public UserType UserType { get; set; }
        public string CreatedOn { get; set; } = String.Empty;
    }
}
