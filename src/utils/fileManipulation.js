import formatDate from "date-fns/format";

export const downloadFile = async myData => {
  const currentDateAndTime = formatDate(Date.now(), "MMM_dd_yyyy_hh_mm_a");
  const fileName = `${currentDateAndTime}_boring_dashboard_backup`;
  const json = JSON.stringify(myData);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function onFileSelected(event) {
  return new Promise(resolve => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = resolve;
  });
}
