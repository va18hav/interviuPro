import {PDFParse} from 'pdf-parse'

export const extractTextFromPDF = async (fileBuffer: Buffer): Promise<string> => {
    const parser = new PDFParse({data: fileBuffer})
    try {
        const result = await parser.getText()
        return result.text;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to extract text from the PDF file");
    } finally {
        await parser.destroy()
    }
}
