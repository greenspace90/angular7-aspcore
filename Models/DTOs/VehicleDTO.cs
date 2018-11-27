using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using angular7_aspcore.Models;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models.DTOs {
    public class VehicleDTO : Vehicle {
        public decimal currentValue {
            get {
                return GetCurrentValue();
            }
        }

        private decimal GetCurrentValue()
        {
            decimal placeholder = 1;
            return placeholder;
        }
    }
}