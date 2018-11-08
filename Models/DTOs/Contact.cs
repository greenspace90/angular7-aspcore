using System;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models.DTOs
{
    public class Contact {  
        public long ? contactId {  
            get;  
            set;  
        }  
        public string name {  
            get;  
            set;  
        }  
        public string email {  
            get;  
            set;  
        }  
        public byte gender {  
            get;  
            set;  
        }  
        public DateTime ? birth {  
            get;  
            set;  
        }  
        public string techno {  
            get;  
            set;  
        }  
        public string message {  
            get;  
            set;  
        }  
    }
}