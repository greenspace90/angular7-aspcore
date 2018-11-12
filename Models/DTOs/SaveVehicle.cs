using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models.DTOs
{
    public class SaveVehicle {  
        public string make {  
            get;  
            set;  
        }  
        public string model {  
            get;  
            set;  
        }  
        public string version {  
            get;  
            set;  
        }  
        public string registration {  
            get;  
            set;  
        } 
        public long ? contactId {  
            get;  
            set;  
        }         
        public long ? typeId {  
            get;  
            set;  
        }
    }
}