using Models = angular7_aspcore.Models;

namespace angular7_aspcore.Models.DTOs {
    public class Bodystyle {
        public long ? typeId {
            get;
            set;
        }
        public string name {
            get;
            set;
        }
        public bool disableDelete { get; set; }
    }
}