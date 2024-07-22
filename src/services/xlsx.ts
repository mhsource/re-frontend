import * as XLSX from 'xlsx';

export default function ExportarExcel(json: any,headers:any, nome: string) {
    const agora = new Date();
    const data = agora.toLocaleDateString().replace(/\//g, '_');
    const hora = agora.toLocaleTimeString().replace(/:/g, '_');
    const worksheet = XLSX.utils.json_to_sheet(json);
    const tt = XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, tt, nome);
    XLSX.writeFile(workbook, `${nome}_${data}_${hora}.xlsx`);
}
