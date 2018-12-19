using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models = angular7_aspcore.Models;
using Microsoft.AspNetCore.Mvc;

namespace angular7_aspcore.Models.DTOs {
    public class VehicleDTO : Models.Vehicle {

        public decimal currentValue {
            get {
                return GetCurrentValue();
            }
        }

        private decimal GetCurrentValue()
        {
            var endDate = purchaseDate.Date.AddYears((int)ownershipPeriod);
            var daysOwned = (DateTime.Today - purchaseDate.Date).TotalDays;
            var totalDays = (endDate - purchaseDate.Date).TotalDays;

            // Ownership has extended beyond defined ownership period, so default current value to residual value
            if(daysOwned >= totalDays) return residualValue;

            var sumOfDays =((1 + totalDays)* totalDays)/2;
            var totalDepreciableCost = purchasePrice - residualValue;
            decimal bookValue = purchasePrice;
            var numeratorStopValue = totalDays - daysOwned;

            for (int depreciationRateNumerator = (int)totalDays; depreciationRateNumerator > (int)numeratorStopValue; depreciationRateNumerator--)
            {
              bookValue  = bookValue - decimal.Divide(depreciationRateNumerator, (int)sumOfDays) * totalDepreciableCost;
            }
            return bookValue;
        }

        public string fullImagePath {get;set;}
    }
}