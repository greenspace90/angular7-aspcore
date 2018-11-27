using System;
using System.Collections.Generic;
using System.Linq;
using angular7_aspcore.AutoMapper.Helpers;
using AutoMapper;
using Models = angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;

namespace angular7_aspcore.AutoMapper.Helpers {
    public class CustomResolver : IValueResolver<Models.Type, DTO.Bodystyle, bool> {
        private Models.ContactAppContext _context;
        private List<long> BodystylesInUse { get; set; } = new List<long> ();

        public CustomResolver(Models.ContactAppContext contactAppContext)
        {
            _context = contactAppContext;
        }

        public bool Resolve (Models.Type source, DTO.Bodystyle destination, bool destmember, ResolutionContext context) {
            BodystylesInUse = _context.Vehicles.Select (b => b.typeId.Value).Distinct ().ToList ();

            return BodystylesInUse.Contains (source.typeId.Value);
        }
    }
}