using System;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models.DTOs
{
    public class Datapoint {  
        public int day {
            get;
            set;
            }
        public decimal bookValue {
            get;
            set;
            }
    }
}