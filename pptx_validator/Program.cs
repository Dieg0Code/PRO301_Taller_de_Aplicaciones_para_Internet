using System;
using System.Linq;
using DocumentFormat.OpenXml.Validation;
using DocumentFormat.OpenXml.Packaging;

class Program {
    static void Main(string[] args) {
        if (args.Length == 0) {
            Console.WriteLine("Por favor, proporciona la ruta del archivo PPTX.");
            return;
        }

        string filePath = args[0];
        try {
            using (PresentationDocument doc = PresentationDocument.Open(filePath, false)) {
                OpenXmlValidator validator = new OpenXmlValidator();
                var errors = validator.Validate(doc);

                if (!errors.Any()) {
                    Console.WriteLine("✅ No se encontraron errores estructurales en el OpenXML.");
                } else {
                    // Filtrar errores conocidos de PptxGenJS que no rompen el archivo
                    var criticalErrors = errors.Where(e => !e.Description.Contains("notesMasterIdLst")).ToList();
                    
                    if (!criticalErrors.Any()) {
                        Console.WriteLine("✅ El archivo es estructuralmente válido (sin dimensiones negativas ni choques de XML).");
                    } else {
                        Console.WriteLine($"❌ Se encontraron {criticalErrors.Count} errores críticos:");
                        foreach (var error in criticalErrors) {
                            Console.WriteLine($"---");
                            Console.WriteLine($"Error: {error.Description}");
                            Console.WriteLine($"Parte: {error.Part?.Uri}");
                            Console.WriteLine($"Path: {error.Path?.XPath}");
                        }
                    }
                }
            }
        } catch (Exception ex) {
            Console.WriteLine($"💥 Error fatal al abrir el documento: {ex.Message}");
        }
    }
}
