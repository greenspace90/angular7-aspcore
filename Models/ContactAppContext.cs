using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
   
namespace angular7_aspcore.Models
{
    public class ContactAppContext: DbContext {  
        public ContactAppContext(DbContextOptions <ContactAppContext> options): base(options) {}  
        public DbSet <Contact> Contacts {  
            get;  
            set;  
        }  
        public DbSet <Type> Types {  
            get;  
            set;  
        }  
        public DbSet <Bodystyle> Bodystyles {  
            get;  
            set;  
        }  
        public DbSet <Vehicle> Vehicles {  
            get;  
            set;  
        }  
    }
}  