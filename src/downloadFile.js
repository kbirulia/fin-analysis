export const downloadFile = (csv, fileName) => {
    const blob = new Blob(["\uFEFF"+csv], { type: 'text/csv;charset=windows-1251;' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
};