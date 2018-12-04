using System;
using System.Collections.Generic;
using System.Linq;
using angular7_aspcore.Helpers;
using angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;

namespace angular7_aspcore.Services {
    public interface IVehicleService {
        List<DTO.Datapoint> GetChartDataById (long id);
    }

    public class VehicleService : IVehicleService {
        private ContactAppContext _context;

        public VehicleService (ContactAppContext context) {
            _context = context;
        }

        public List<DTO.Datapoint> GetChartDataById (long id) {
            var vehicle = _context.Vehicles.Find (id);

            var endDate = vehicle.purchaseDate.Date.AddYears ((int) vehicle.ownershipPeriod);
            var totalDays = (endDate - vehicle.purchaseDate).TotalDays;
            var sumOfDays = ((1 + totalDays) * totalDays) / 2;
            var totalDepreciableCost = vehicle.purchasePrice - vehicle.residualValue;
            decimal bookValue = vehicle.purchasePrice;
            var dataset = new List<DTO.Datapoint> ();

            for (int depreciationRateNumerator = (int) totalDays; depreciationRateNumerator > 0; depreciationRateNumerator--) {

                bookValue = bookValue - decimal.Divide (depreciationRateNumerator, (int) sumOfDays) * totalDepreciableCost;
                var datapoint = new DTO.Datapoint ()
                {
                    day = (int)(totalDays - depreciationRateNumerator),
                    bookValue = bookValue
                };
                dataset.Add(datapoint);
            }
            return dataset;

        }

        // private helper methods

    }
}