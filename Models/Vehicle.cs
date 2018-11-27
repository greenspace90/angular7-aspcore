using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models {
    public class Vehicle {
        public long ? vehicleId {
            get;
            set;
        }
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

        [ForeignKey ("contactId")]
        public Contact contact {
            get;
            set;
        }
        public long ? typeId {
            get;
            set;
        }
        [ForeignKey ("typeId")]
        public Bodystyle bodystyle {
            get;
            set;
        }
        public DateTime purchaseDate {
            get;
            set;
        }
        public decimal purchasePrice {
            get;
            set;
        }
        public long ownershipPeriod {
            get;
            set;
        }
        public decimal residualValue {
            get;
            set;
        }
    }
}