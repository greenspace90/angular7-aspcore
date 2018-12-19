using System;
using angular7_aspcore.Models.DTOs;
using Newtonsoft.Json;

namespace angular7_aspcore.Helpers {

    [AttributeUsage (AttributeTargets.Property, AllowMultiple = false)]
    public class FromJsonAttribute : Attribute, IJsonAttribute {
        public object TryConvert (string modelValue, Type targetType, out bool success) {
            var value = JsonConvert.DeserializeObject (modelValue, targetType);
            success = value != null;
            return value;
        }
    }
}