using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models
{
    public class Vehicle {  
        public long ? VehicleId {  
            get;  
            set;  
        }  
        public string Make {  
            get;  
            set;  
        }  
        public string Model {  
            get;  
            set;  
        }  
        public string Version {  
            get;  
            set;  
        }  
        public string Registration {  
            get;  
            set;  
        } 
        public long ? ContactId {  
            get;  
            set;  
        } 
        [ForeignKey("ContactId")]
        public Contact Contact {
            get;
            set;
        }         
        public long ? TypeId {  
            get;  
            set;  
        }

        [ForeignKey("TypeId")]
        public Bodystyle Bodystyle {
            get;
            set;
        }  
    }
}