using angular7_aspcore.Models.DTOs;
using System;

namespace angular7_aspcore.Helpers {
    public interface IJsonAttribute {
        object TryConvert (string modelValue, Type targertType, out bool success);
    }
}